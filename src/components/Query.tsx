"use client";
import type { Field } from "@/types/field";
import { useDataManager } from "@/hooks/useDataManager";
import { useState } from "react";

export function Query() {
	const { query, columns } = useDataManager();
	const [rows, setRows] = useState<Field[]>([]);
	const [cols, setCols] = useState<Field[]>([]);
	const [results, setResults] = useState<any[]>([]);

	const handleQuery = async () => {
		const data = await query({
			rows,
			columns: cols,
		});
		setResults(data);
	};

	return (
		<div className="flex flex-col gap-4">
			<div>
				<h3>Rows</h3>
				<select
					multiple
					onChange={(e) => {
						const selected = Array.from(e.target.selectedOptions).map(
							(opt) => columns.find((col) => col.name === opt.value)!
						);
						setRows(selected);
					}}
				>
					{columns.map((col) => (
						<option key={col.name} value={col.name}>
							{col.name}
						</option>
					))}
				</select>
			</div>

			<div>
				<h3>Columns</h3>
				<select
					multiple
					onChange={(e) => {
						const selected = Array.from(e.target.selectedOptions).map(
							(opt) => columns.find((col) => col.name === opt.value)!
						);
						setCols(selected);
					}}
				>
					{columns.map((col) => (
						<option key={col.name} value={col.name}>
							{col.name}
						</option>
					))}
				</select>
			</div>

			<button onClick={handleQuery}>Run Query</button>

			{results.length > 0 && <pre>{JSON.stringify(results, null, 2)}</pre>}
		</div>
	);
}
