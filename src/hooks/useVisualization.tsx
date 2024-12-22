"use client";
import type { ChartDataTypes, ChartType } from "@/types/visual.d";
import type { IField } from "@/types/field.d";
import { ReactNode, useContext, useState, useEffect } from "react";
import { createContext } from "react";
import { CHART_TYPES } from "@/constants/chart";
import { useDataManager } from "./useDataManager";
import { useDnd } from "./useDnd";

interface VisualizationContext {
	visualType: ChartType;
	setVisualType: (type: ChartType) => void;
	rows: IField[];
	columns: IField[];
	data: ChartDataTypes[ChartType] | null;
	isLoading: boolean;
	error?: string;
}

const VisualizationContext = createContext<VisualizationContext | null>(null);

export const useVisualization = () => {
	const context = useContext(VisualizationContext);
	if (!context) throw new Error("useVisualization must be used within VisualizationContextProvider");
	return context;
};

export const VisualizationContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const { query } = useDataManager();
	const { rows, columns } = useDnd();

	const [isLoading, setIsLoading] = useState(false);

	const [visualType, setVisualType] = useState<ChartType>("table");

	const [data, setData] = useState<ChartDataTypes[ChartType] | null>(null);

	const validateChartData = (
		type: ChartType,
		rows: IField[],
		columns: IField[]
	): { isValid: boolean; error?: string } => {
		switch (type) {
			case "line":
				if (rows.length !== 1 || !rows[0].type.includes("varchar")) {
					return { isValid: false, error: "Line chart requires exactly one dimension on rows" };
				}
				if (!columns.length || !columns.every((col) => col.type.includes("int") || col.type.includes("decimal"))) {
					return { isValid: false, error: "Line chart requires at least one measure on columns" };
				}
				return { isValid: true };

			case "bar":
				if (!rows.length || rows.length > 2 || !rows.every((row) => row.type.includes("varchar"))) {
					return { isValid: false, error: "Bar chart requires one or two dimensions on rows" };
				}
				if (!columns.length || !columns.every((col) => col.type.includes("int") || col.type.includes("decimal"))) {
					return { isValid: false, error: "Bar chart requires at least one measure on columns" };
				}
				return { isValid: true };

			case "pie":
				if (rows.length !== 1 || !rows[0].type.includes("varchar")) {
					return { isValid: false, error: "Pie chart requires exactly one dimension on rows" };
				}
				if (columns.length !== 1 || !(columns[0].type.includes("int") || columns[0].type.includes("decimal"))) {
					return { isValid: false, error: "Pie chart requires exactly one measure on columns" };
				}
				return { isValid: true };

			default:
				return { isValid: true };
		}
	};

	useEffect(() => {
		async function fetchData() {
			if (!rows.length || !columns.length) {
				setData(null);
				return;
			}

			// const validation = validateChartData(visualType, rows, columns);

			// if (!validation.isValid) {
			// 	setData(null);
			// 	return;
			// }

			setIsLoading(true);
			try {
				const result = await query({
					rows,
					columns,
				});
				setData(result);
			} catch (error) {
				console.error("Error fetching chart data:", error);
				setData(null);
			} finally {
				setIsLoading(false);
			}
		}

		fetchData();
	}, [rows, columns, visualType]);

	return (
		<VisualizationContext.Provider value={{ visualType, setVisualType, rows, columns, data, isLoading }}>
			{children}
		</VisualizationContext.Provider>
	);
};
