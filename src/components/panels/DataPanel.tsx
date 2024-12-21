"use client";
import { useDataManager } from "@/hooks/useDataManager";
import {
	IconLoader2,
	IconAbc,
	IconCalendar,
	IconNumbers,
	IconClock,
	IconId,
	IconHash,
	IconPercentage,
	IconInfinity,
	IconSearch,
} from "@tabler/icons-react";
import type { Field, DuckDBFieldType } from "@/types/field";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { DND_IDS } from "@/hooks/useDnd";
import { useRef, useState } from "react";
import { UploadDataset } from "../input/UploadDataset";

export function DataPanel() {
	const { columns, isLoading, fileName } = useDataManager();
	const [search, setSearch] = useState("");

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-full">
				<IconLoader2 className="animate-spin w-6 h-6 text-neutral-500" />
			</div>
		);
	}

	// Filter and classify columns
	const filterColumns = (cols: Field[]) => cols.filter((col) => col.name.toLowerCase().includes(search.toLowerCase()));

	const dimensions = filterColumns(
		columns.filter((col) => col.type.toLowerCase().includes("varchar") || col.type.toLowerCase().includes("date"))
	);

	const measures = filterColumns(
		columns.filter(
			(col) =>
				col.type.toLowerCase().includes("int") ||
				col.type.toLowerCase().includes("decimal") ||
				col.type.toLowerCase().includes("float") ||
				col.type.toLowerCase().includes("double")
		)
	);

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

	const FieldList = ({ items, title, type }: { items: Field[]; title: string; type: "dimensions" | "measures" }) => (
		<div className="flex flex-col gap-1">
			<h2 className="text-sm font-medium text-neutral-dark">{title}</h2>
			<Droppable droppableId={type === "dimensions" ? DND_IDS.DIMENSIONS : DND_IDS.MEASURES} isDropDisabled>
				{(provided) => (
					<div ref={provided.innerRef} {...provided.droppableProps} className="shadow-inner-sm flex flex-col">
						{items.map((field, index) => (
							<Draggable key={field.name} draggableId={JSON.stringify(field)} index={index}>
								{(provided) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										className="border-neutral-light py-1 w-full grid grid-cols-[24px_1fr] text-xs rounded-full hover:bg-neutral-100 items-center px-2"
									>
										<span className="text-neutral-500">{icon(field.type)}</span>
										<p className="truncate text-neutral-700 font-medium ">{field.name}</p>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);

	return (
		<section className="w-48 h-full flex flex-col border-r border-neutral-200 bg-neutral-50">
			<div className="px-4 py-2 flex flex-col gap-2 border-b border-neutral-200">
				<h1 className="text-neutral-darkest text-sm font-medium">Data</h1>
				{columns.length ? <p className="text-neutral-dark text-xs w-full truncate">{fileName}</p> : <UploadDataset />}
			</div>
			<div className="flex flex-col gap-2 px-4 py-2 h-full overflow-auto">
				<div className="relative">
					<input
						type="text"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search fields..."
						className="w-full text-xs px-6 py-1 pr-7 border rounded focus:outline-none focus:ring-1 focus:ring-primary-light"
					/>
					<IconSearch size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-neutral-400" />
				</div>
				<div className="space-y-4">
					<FieldList items={dimensions} title="Dimensions" type="dimensions" />
					<FieldList items={measures} title="Measures" type="measures" />
				</div>
			</div>
		</section>
	);
}
