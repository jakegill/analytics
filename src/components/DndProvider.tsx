"use client";
import { DragDropContext } from "@hello-pangea/dnd";
import { useDnd } from "@/hooks/useDnd";
import { ReactNode, createContext, useContext } from "react";
import type { Field } from "@/types/field";

interface DndContextType {
	rows: Field[];
	columns: Field[];
	removeField: (fieldName: string, zone: "rows" | "columns") => void;
	updateField: (fieldName: string, zone: "rows" | "columns", updates: Partial<Field>) => void;
}

const DndContext = createContext<DndContextType | null>(null);

export function useDndContext() {
	const context = useContext(DndContext);
	if (!context) throw new Error("useDndContext must be used within DndProvider");
	return context;
}

export function DndProvider({ children }: { children: ReactNode }) {
	const { handleDragEnd, rows, columns, removeField, updateField } = useDnd();

	return (
		<DndContext.Provider value={{ rows, columns, removeField, updateField }}>
			<DragDropContext onDragEnd={handleDragEnd}>{children}</DragDropContext>
		</DndContext.Provider>
	);
}
