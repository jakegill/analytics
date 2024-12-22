import type { IField, IDimensionField, IMeasureField } from "./field";

export const ChartType = {
	LINE: "line",
	BAR: "bar",
	PIE: "pie",
	TABLE: "table",
	HISTOGRAM: "histogram",
	SCATTER: "scatter",
} as const;

export type ChartType = (typeof ChartType)[keyof typeof ChartType];

interface IChartData {
	rows: IField[];
	columns: IField[];
}

export interface ILineChartData extends IChartData {
	rows: [IDimensionField];
	columns: IMeasureField[];
}

export interface IBarChartData extends IChartData {
	rows: [IDimensionField] | [IDimensionField, IDimensionField];
	columns: IMeasureField[];
}

export interface IPieChartData extends IChartData {
	rows: [IDimensionField];
	columns: [IMeasureField];
}

export interface ITableData extends IChartData {
	rows: IField[];
	columns: IField[];
}

export interface IHistogramData extends IChartData {
	rows: [];
	columns: [IMeasureField];
}

export interface IScatterPlotData extends IChartData {
	rows: [];
	columns: [IMeasureField, IMeasureField];
}

export type ChartDataTypes = {
	line: Array<Record<string, any>>;
	bar: Array<Record<string, any>>;
	pie: Array<Record<string, any>>;
	table: Array<Record<string, any>>;
	histogram: Array<Record<string, any>>;
	scatter: Array<Record<string, any>>;
};

export type ChartData<T extends ChartType> = ChartDataTypes[T];
