"use client";
import { createContext, useContext, ReactNode, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

interface DndContextType {
	draggedItem: any | null;
	setDraggedItem: (item: any | null) => void;
}

const DndContext = createContext<DndContextType | undefined>(undefined);

interface DndProviderProps {
	children: ReactNode;
}

export function DndProvider({ children }: DndProviderProps) {
	const [draggedItem, setDraggedItem] = useState<any | null>(null);

	const onDragEnd = (result: DropResult) => {
		// We'll implement drag and drop logic here later
		console.log(result);
	};

	const value = {
		draggedItem,
		setDraggedItem,
	};

	return (
		<DndContext.Provider value={value}>
			<DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
		</DndContext.Provider>
	);
}

export function useDndContext() {
	const context = useContext(DndContext);
	if (context === undefined) {
		throw new Error("useDndContext must be used within a DndProvider");
	}
	return context;
}
