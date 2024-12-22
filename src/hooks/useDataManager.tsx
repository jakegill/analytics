"use client";
import type { DuckDBFieldType, IField, IQuery, MeasureTransformation, DimensionTransformation } from "@/types/field";
import type { AsyncDuckDB } from "@duckdb/duckdb-wasm";
import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import * as duckdb from "@duckdb/duckdb-wasm";
import { DUCKDB_BUNDLES } from "@/config/duckdb.config";

interface DuckDBManagerContext {
	db: AsyncDuckDB | null;
	columns: IField[];
	fileName: string;
	isLoading: boolean;
	query: (config: IQuery) => Promise<any>;
	ingest: (file: File) => Promise<void>;
}

export const DuckDBManagerContext = createContext<DuckDBManagerContext>({
	db: null,
	fileName: "",
	columns: [],
	isLoading: false,
	query: async () => {},
	ingest: async () => {},
});

export const useDataManager = () => useContext(DuckDBManagerContext);

export const DuckDBManagerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [db, setDB] = useState<AsyncDuckDB | null>(null);
	const [columns, setColumns] = useState<IField[]>([]);
	const [fileName, setFileName] = useState<string>("");

	useEffect(() => {
		init();
	}, []);

	async function init() {
		try {
			const bundle = await duckdb.selectBundle(DUCKDB_BUNDLES);
			const worker = new Worker(bundle.mainWorker ?? "");
			const logger = new duckdb.ConsoleLogger();
			const db: AsyncDuckDB = new duckdb.AsyncDuckDB(logger, worker);
			await db.instantiate(bundle.mainModule);
			setDB(db);
		} catch (err) {
			console.error("Full error:", err);
		}
	}

	// Create table from CSV
	async function ingest(file: File) {
		if (!db) return;
		try {
			setIsLoading(true);
			setFileName(file.name);

			const conn = await db.connect();

			const fileBuffer = await file.arrayBuffer();
			await db.registerFileBuffer(file.name, new Uint8Array(fileBuffer));

			await conn.query(`
				CREATE TABLE IF NOT EXISTS dataset AS 
				SELECT * FROM read_csv_auto('${file.name}')
				`);

			await conn.close();
			await analyze();
		} catch (err) {
			console.error("Ingest error:", err);
		} finally {
			setIsLoading(false);
		}
	}

	// Determines schema of table
	async function analyze() {
		if (!db) return;
		try {
			const conn = await db.connect();

			const columnQuery = `
				SELECT 
					column_name as name,
					data_type as type
				FROM duckdb_columns 
				WHERE table_name = 'dataset'
			`;

			const info = await conn.query(columnQuery);

			const columns: IField[] = info.toArray().map((col) => {
				return {
					name: col.name as string,
					type: col.type.toLowerCase() as DuckDBFieldType,
				};
			});

			setColumns(columns);
			await conn.close();
		} catch (err) {
			console.error("Column analysis error:", err);
		}
	}

	//
	async function query(config: IQuery): Promise<any[]> {
		if (!db) return [];
		try {
			const conn = await db.connect();
			const select: string[] = [];
			const groupBy: string[] = [];

			[...config.rows, ...config.columns].forEach((field) => {
				if (field.transformation) {
					select.push(`${field.transformation}("${field.name}") as "${field.name}"`);
				} else {
					select.push(`"${field.name}"`);
					groupBy.push(`"${field.name}"`);
				}
			});

			const query = `
			SELECT ${select.join(", ")}
			FROM dataset
			${groupBy.length ? `GROUP BY ${groupBy.join(", ")}` : ""}
		  `;

			console.log("QUERY: ", query);
			const result = await conn.query(query);
			const data = result.toArray().map((row) => {
				const newRow: Record<string, any> = {};
				Object.entries(row).forEach(([key, value]) => {
					newRow[key] = typeof value === "bigint" ? Number(value) : value;
				});
				return newRow;
			});

			await conn.close();
			return data;
		} catch (err) {
			console.error("Query error:", err);
			return [];
		}
	}

	return (
		<DuckDBManagerContext.Provider
			value={{
				db,
				fileName,
				isLoading,
				ingest,
				columns,
				query,
			}}
		>
			{children}
		</DuckDBManagerContext.Provider>
	);
};
