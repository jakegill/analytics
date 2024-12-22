import type { IField, IMeasureField, MeasureFieldType } from "@/types/field.d";

const MEASURE_TYPES: MeasureFieldType[] = [
	"bigint",
	"decimal",
	"double",
	"float",
	"hugeint",
	"integer",
	"smallint",
	"tinyint",
	"ubigint",
	"uinteger",
	"usmallint",
	"utinyint",
];

export function isMeasureField(field: IField): field is IMeasureField {
	return MEASURE_TYPES.includes(field.type as MeasureFieldType);
}
