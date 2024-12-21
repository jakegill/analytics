import { useState } from "react";
import type { Field } from "@/types/field";
import type { DropResult } from "@hello-pangea/dnd";

interface DndState {
	rows: Field[];
	columns: Field[];
}

export const DND_IDS = {
	ROWS: "rows-dropzone",
	COLUMNS: "columns-dropzone",
	DIMENSIONS: "dimensions-list",
	MEASURES: "measures-list",
} as const;

export function useDnd() {
	const [state, setState] = useState<DndState>({
		rows: [],
		columns: [],
	});

	const handleDragEnd = (result: DropResult) => {
		const { destination, source, draggableId } = result;

		if (!destination) return;

		try {
			const draggedField = JSON.parse(draggableId) as Field;

			// If coming from fields list, add to destination
			if (source.droppableId === DND_IDS.FIELDS_LIST) {
				if (destination.droppableId === DND_IDS.ROWS) {
					setState((prev) => ({
						...prev,
						rows: [...prev.rows, draggedField],
					}));
				} else if (destination.droppableId === DND_IDS.COLUMNS) {
					setState((prev) => ({
						...prev,
						columns: [...prev.columns, draggedField],
					}));
				}
				return;
			}

			// Handle reordering within the same dropzone
			if (source.droppableId === destination.droppableId) {
				const zone = source.droppableId === DND_IDS.ROWS ? "rows" : "columns";
				const items = Array.from(state[zone]);
				const [reorderedItem] = items.splice(source.index, 1);
				items.splice(destination.index, 0, reorderedItem);

				setState((prev) => ({
					...prev,
					[zone]: items,
				}));
				return;
			}

			// Handle moving between rows and columns
			const sourceZone = source.droppableId === DND_IDS.ROWS ? "rows" : "columns";
			const destZone = destination.droppableId === DND_IDS.ROWS ? "rows" : "columns";

			setState((prev) => {
				const sourceItems = Array.from(prev[sourceZone]);
				const destItems = Array.from(prev[destZone]);

				// Remove from source
				sourceItems.splice(source.index, 1);

				// Add to destination
				destItems.splice(destination.index, 0, draggedField);

				return {
					...prev,
					[sourceZone]: sourceItems,
					[destZone]: destItems,
				};
			});
		} catch (err) {
			console.error("Failed to parse dragged item:", err);
		}
	};

	const removeField = (fieldName: string, zone: "rows" | "columns") => {
		setState((prev) => ({
			...prev,
			[zone]: prev[zone].filter((f) => f.name !== fieldName),
		}));
	};

	const updateField = (fieldName: string, zone: "rows" | "columns", updates: Partial<Field>) => {
		setState((prev) => ({
			...prev,
			[zone]: prev[zone].map((field) => (field.name === fieldName ? { ...field, ...updates } : field)),
		}));
	};

	return {
		rows: state.rows,
		columns: state.columns,
		handleDragEnd,
		removeField,
		updateField,
	};
}
