"use client";
import { useDataManager } from "@/hooks/useDataManager";
import { IconLoader2, IconSearch } from "@tabler/icons-react";
import type { IField, DuckDBFieldType } from "@/types/field.d";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useRef, useState } from "react";
import { UploadDataset } from "../input/UploadDataset";
import { Field } from "./Field";

export function DataPanel() {
	const { columns, isLoading, fileName } = useDataManager();
	const [search, setSearch] = useState("");

	if (isLoading) {
		return (
			<section className="min-w-40 max-w-40 h-full flex flex-col border-r border-neutral-200 bg-neutral-50">
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
							className="w-full text-xs px-6 py-1 pr-7 border rounded focus:outline-none focus:ring-1 focus:ring-primary-200"
						/>
						<IconSearch size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-neutral-400" />
					</div>
					<div className="flex items-center justify=center h-full w-full text-neutral-400">
						<IconLoader2 className="animate-spin" size={16} />
					</div>
				</div>
			</section>
		);
	}

	const filterColumns = (cols: IField[]) => cols.filter((col) => col.name.toLowerCase().includes(search.toLowerCase()));

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

	const FieldList = ({ items, title, type }: { items: IField[]; title: string; type: "dimensions" | "measures" }) => {
		return (
			<div className="flex flex-col gap-1">
				<h2 className="text-sm font-medium text-neutral-dark">{title}</h2>
				<Droppable droppableId={type === "dimensions" ? "DIMENSIONS" : "MEASURES"}>
					{(provided) => (
						<div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col gap-1">
							{items.map((field, index) => (
								<Draggable key={field.name} draggableId={JSON.stringify(field)} index={index}>
									{(provided) => <Field field={field} provided={provided} />}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>
		);
	};

	return (
		<section className="min-w-40 max-w-40 h-full flex flex-col border-r border-neutral-200 bg-neutral-50">
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
						className="w-full text-xs px-6 py-1 pr-7 border rounded focus:outline-none focus:ring-1 focus:ring-primary-200"
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
