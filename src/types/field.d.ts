type DataClassification =
	| "ordinal" // ordered categories
	| "nominal" // unordered categories
	| "quantitative" // numeric values
	| "temporal"; // dates/times

type Transformations = {
	ordinal: "COUNT" | "MODE";
	nominal: "COUNT" | "MODE";
	quantitative: "SUM" | "AVG" | "MEDIAN" | "MIN" | "MAX" | "COUNT" | "COUNT_DISTINCT";
	temporal: "MIN" | "MAX" | "COUNT";
};

type DuckDBFieldType =
	| "bigint"
	| "boolean"
	| "date"
	| "decimal"
	| "double"
	| "float"
	| "hugeint"
	| "integer"
	| "interval"
	| "smallint"
	| "time"
	| "timestamp"
	| "timestamp with time zone"
	| "tinyint"
	| "ubigint"
	| "uinteger"
	| "usmallint"
	| "utinyint"
	| "uuid"
	| "varchar";

export interface Field {
	name: string;
	type: DuckDBFieldType;
	classification?: DataClassification;
	transformation?: Transformations[DataClassification];
	// Consider temporal granularity
}

interface Filter {
	field: Field;
	operator: string;
	value: any;
}

export interface Query {
	rows: Field[];
	columns: Field[];
	filters?: Filter[];
}
