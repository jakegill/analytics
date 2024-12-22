import { useState, useRef, useEffect } from "react";
import type { DuckDBFieldType, IField, MeasureTransformation, Transformations } from "@/types/field.d";
import type { DraggableProvided } from "@hello-pangea/dnd";
import {
	IconAbc,
	IconCalendar,
	IconNumbers,
	IconClock,
	IconId,
	IconHash,
	IconPercentage,
	IconInfinity,
} from "@tabler/icons-react";
import { useDnd } from "@/hooks/useDnd";

const isDimension = (type: DuckDBFieldType): boolean => {
	const dimensions: DuckDBFieldType[] = [
		"varchar",
		"date",
		"time",
		"timestamp",
		"timestamp with time zone",
		"interval",
		"uuid",
		"boolean",
	];
	return dimensions.includes(type);
};

const isMeasure = (type: DuckDBFieldType): boolean => {
	const measures: DuckDBFieldType[] = [
		"tinyint",
		"smallint",
		"integer",
		"bigint",
		"hugeint",
		"utinyint",
		"usmallint",
		"uinteger",
		"ubigint",
		"decimal",
		"double",
		"float",
	];
	return measures.includes(type);
};

const icon = (type: DuckDBFieldType): React.ReactNode => {
	switch (type) {
		// Text types
		case "varchar":
			return <IconAbc size={16} />;

		// Date/Time types
		case "date":
		case "timestamp":
		case "timestamp with time zone":
			return <IconCalendar size={16} />;
		case "time":
		case "interval":
			return <IconClock size={16} />;

		// Integer types
		case "tinyint":
		case "smallint":
		case "integer":
		case "bigint":
		case "hugeint":
		case "utinyint":
		case "usmallint":
		case "uinteger":
		case "ubigint":
			return <IconHash size={16} />;

		// Decimal/Float types
		case "decimal":
		case "double":
		case "float":
			return <IconPercentage size={16} />;

		// Special types
		case "boolean":
			return <IconInfinity size={16} />;
		case "uuid":
			return <IconId size={16} />;

		// Default numeric
		default:
			return null;
	}
};

const MEASURE_TRANSFORMATIONS = [
	"SUM",
	"AVG",
	"MIN",
	"MAX",
	"COUNT",
	"COUNT_DISTINCT",
] as const satisfies readonly MeasureTransformation[];

export function Field({ field, provided }: { field: IField; provided?: DraggableProvided }) {
	const [showMenu, setShowMenu] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const { updateFieldTransformation } = useDnd();

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setShowMenu(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleContextMenu = (e: React.MouseEvent) => {
		if (isMeasure(field.type)) {
			e.preventDefault();
			setShowMenu(true);
		}
	};

	if (!provided) return null;

	return (
		<div className="relative">
			<div
				ref={provided.innerRef}
				{...provided.draggableProps}
				{...provided.dragHandleProps}
				onContextMenu={handleContextMenu}
				className={`border-neutral-light max-w-32 truncate py-1 w-full grid grid-cols-[20px_1fr] text-xs rounded-full ${
					isMeasure(field.type) ? "bg-teal-100" : "bg-yellow-100"
				} items-center px-2`}
			>
				<span className={`${isMeasure(field.type) ? "text-teal-500" : "text-yellow-700"}`}>{icon(field.type)}</span>
				<p className={`truncate flex gap-1 font-medium ${isMeasure(field.type) ? "text-teal-700" : "text-yellow-800"}`}>
					{field.transformation && <span className="opacity-75">({field.transformation})</span>}
					{field.name}
				</p>
			</div>

			{showMenu && isMeasure(field.type) && (
				<div
					ref={menuRef}
					className="absolute z-50 mt-1 py-1 bg-white rounded-lg shadow-lg border border-neutral-200 min-w-[120px]"
				>
					{MEASURE_TRANSFORMATIONS.map((transform) => (
						<button
							key={transform}
							onClick={() => {
								updateFieldTransformation(field, transform);
								setShowMenu(false);
							}}
							className={`w-full px-3 py-1 text-left text-sm hover:bg-neutral-50 ${
								field.transformation === transform ? "text-primary-500" : "text-neutral-700"
							}`}
						>
							{transform}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
