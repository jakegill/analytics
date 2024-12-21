"use client";
import { useDataManager } from "@/hooks/useDataManager";
import { IconLoader2, IconUpload } from "@tabler/icons-react";
import type { Field } from "@/types/field";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { DND_IDS } from "@/hooks/useDnd";
import { useRef } from "react";

export function DataPanel() {
	const { columns, isLoading, ingest } = useDataManager();
	const fileInputRef = useRef<HTMLInputElement>(null);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-full">
				<IconLoader2 className="animate-spin w-6 h-6 text-neutral-500" />
			</div>
		);
	}

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;
		await ingest(file);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	// Classify columns
	const dimensions = columns.filter(
		(col) => col.type.toLowerCase().includes("varchar") || col.type.toLowerCase().includes("date")
	);

	const measures = columns.filter(
		(col) =>
			col.type.toLowerCase().includes("int") ||
			col.type.toLowerCase().includes("decimal") ||
			col.type.toLowerCase().includes("float") ||
			col.type.toLowerCase().includes("double")
	);

	const FieldList = ({ items, title }: { items: Field[]; title: string }) => (
		<div className="flex flex-col gap-1">
			<h2 className="text-sm font-medium text-neutral-dark">{title}</h2>
			<div className="shadow-inner-sm flex flex-col">
				{items.map((field, index) => (
					<Draggable key={field.name} draggableId={JSON.stringify(field)} index={index}>
						{(provided) => (
							<div
								ref={provided.innerRef}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								className="border-neutral-light py-1 w-64 grid grid-cols-[.20fr_.75fr] text-xs hover:bg-neutral-50"
							>
								<div className="text-neutral-medium">{field.type}</div>
								<p className="truncate text-neutral-dark font-medium">{field.name}</p>
							</div>
						)}
					</Draggable>
				))}
			</div>
		</div>
	);

	return (
		<div>
			<div className="flex flex-col h-full">
				{/* Upload Section */}
				<div className="p-4 border-b">
					<input
						ref={fileInputRef}
						id="csv-upload"
						type="file"
						accept=".csv"
						onChange={handleFileChange}
						className="sr-only"
						aria-label="Upload CSV file"
					/>
					<label
						htmlFor="csv-upload"
						className="flex items-center justify-center gap-2 p-2 border-2 border-dashed rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors"
					>
						<IconUpload className="w-5 h-5 text-neutral-500" />
						<span className="text-sm text-neutral-600">Upload CSV</span>
					</label>
				</div>

				{/* Fields Section */}
				<div className="flex-1 overflow-auto">
					<Droppable droppableId={DND_IDS.FIELDS_LIST}>
						{(provided) => (
							<div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col gap-4 p-4">
								<FieldList items={dimensions} title="Dimensions" />
								<FieldList items={measures} title="Measures" />
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</div>
			</div>
		</div>
	);
}
