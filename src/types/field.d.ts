// Field type classifications
export type DimensionFieldType =
	| "varchar"
	| "date"
	| "time"
	| "timestamp"
	| "timestamp with time zone"
	| "interval"
	| "boolean"
	| "uuid";

export type MeasureFieldType =
	| "bigint"
	| "decimal"
	| "double"
	| "float"
	| "hugeint"
	| "integer"
	| "smallint"
	| "tinyint"
	| "ubigint"
	| "uinteger"
	| "usmallint"
	| "utinyint";

export type DuckDBFieldType = DimensionFieldType | MeasureFieldType;

export type DataClassification =
	| "ordinal" // ordered categories
	| "nominal" // unordered categories
	| "quantitative" // numeric values
	| "temporal"; // dates/times

export type MeasureTransformation = "SUM" | "AVG" | "MIN" | "MAX" | "COUNT" | "COUNT_DISTINCT";
export type DimensionTransformation = "COUNT" | "MODE";

export type Transformations = {
	ordinal: DimensionTransformation;
	nominal: DimensionTransformation;
	quantitative: MeasureTransformation;
	temporal: "MIN" | "MAX" | "COUNT";
};

export interface IDimensionField {
	name: string;
	type: DimensionFieldType;
	classification?: Extract<DataClassification, "ordinal" | "nominal" | "temporal">;
	transformation?: DimensionTransformation | "MIN" | "MAX";
	id?: string;
}

export interface IMeasureField {
	name: string;
	type: MeasureFieldType;
	classification?: Extract<DataClassification, "quantitative">;
	transformation?: MeasureTransformation;
	id?: string;
}

export type IField = IDimensionField | IMeasureField;

export interface IFilter {
	field: IField;
	operator: string;
	value: any;
}

export interface IQuery {
	rows: IField[];
	columns: IField[];
	filters?: IFilter[];
}
