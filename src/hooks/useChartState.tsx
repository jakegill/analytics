"use client";
import { createContext, useContext, useState } from "react";

interface ChartState {
	chartType?: "pie" | "bar";
	results: any[];
	setChartType: (type: "pie" | "bar") => void;
	setResults: (results: any[]) => void;
}

const ChartContext = createContext<ChartState | null>(null);

export function useChartState() {
	const context = useContext(ChartContext);
	if (!context) throw new Error("useChartState must be used within ChartProvider");
	return context;
}

export function ChartProvider({ children }: { children: React.ReactNode }) {
	const [chartType, setChartType] = useState<"pie" | "bar">();
	const [results, setResults] = useState<any[]>([]);

	return (
		<ChartContext.Provider
			value={{
				chartType,
				results,
				setChartType,
				setResults,
			}}
		>
			{children}
		</ChartContext.Provider>
	);
}
