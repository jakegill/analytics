"use client";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import type { Field } from "@/types/field";
import { DND_IDS } from "@/hooks/useDnd";

interface RowDropzoneProps {
	items: Field[];
	removeField: (fieldName: string, zone: "rows" | "columns") => void;
}

export function RowDropzone({ items, removeField }: RowDropzoneProps) {
	return (
		<div className="w-full border-b">
			<div className="px-4 py-2 font-medium bg-neutral-50">Rows</div>
			<Droppable droppableId={DND_IDS.ROWS}>
				{(provided) => (
					<div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[100px] p-2">
						{items.map((item, index) => (
							<Draggable key={item.name} draggableId={JSON.stringify(item)} index={index}>
								{(provided) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										className="p-2 bg-white border rounded mt-1 flex justify-between items-center shadow-sm"
									>
										<span>{item.name}</span>
										<button
											onClick={() => removeField(item.name, "rows")}
											className="text-neutral-400 hover:text-neutral-600"
										>
											×
										</button>
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
}
