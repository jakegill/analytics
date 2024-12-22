"use client";
import type { DimensionTransformation, IField, IMeasureField, MeasureTransformation } from "@/types/field.d";
import { ReactNode, useContext, useState, useCallback } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { createContext } from "react";
import { isMeasureField } from "@/utils/typeGuards";

interface DndContext {
	rows: IField[];
	columns: IField[];
	onDragEnd: (result: DropResult) => void;
	updateFieldTransformation: (field: IField, transformation: MeasureTransformation | DimensionTransformation) => void;
}

const DndContext = createContext<DndContext | null>(null);

export const useDnd = () => {
	const context = useContext(DndContext);
	if (!context) throw new Error("useDnd must be used within DndContextProvider");
	return context;
};

export const DndContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [rows, setRows] = useState<IField[]>([]);
	const [columns, setColumns] = useState<IField[]>([]);

	const updateFieldTransformation = useCallback(
		(field: IField, transformation: MeasureTransformation | DimensionTransformation) => {
			const updateFields = (fields: IField[]): IField[] =>
				fields.map((f) => {
					if (f.name !== field.name) return f;
					return isMeasureField(f)
						? { ...f, transformation: transformation as MeasureTransformation }
						: { ...f, transformation: transformation as DimensionTransformation };
				});

			setRows(updateFields);
			setColumns(updateFields);
		},
		[]
	);

	const DROPZONES = {
		ROW_DROPZONE: "ROW_DROPZONE",
		COLUMN_DROPZONE: "COLUMN_DROPZONE",
		DIMENSIONS: "DIMENSIONS",
		MEASURES: "MEASURES",
	};

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result;

		if (!destination) {
			if (source.droppableId === DROPZONES.ROW_DROPZONE) {
				setRows((prev) => prev.filter((_, index) => index !== source.index));
			}
			if (source.droppableId === DROPZONES.COLUMN_DROPZONE) {
				setColumns((prev) => prev.filter((_, index) => index !== source.index));
			}
			return;
		}

		const field = JSON.parse(result.draggableId) as IField;
		const fieldWithId = {
			...field,
			id: field.id || `${field.name}-${Math.random().toString(36).substr(2, 9)}`,
		};

		if (source.droppableId !== destination.droppableId) {
			if (source.droppableId === DROPZONES.ROW_DROPZONE) {
				setRows((prev) => prev.filter((_, index) => index !== source.index));
			}
			if (source.droppableId === DROPZONES.COLUMN_DROPZONE) {
				setColumns((prev) => prev.filter((_, index) => index !== source.index));
			}

			if (destination.droppableId === DROPZONES.ROW_DROPZONE) {
				setRows((prev) => [...prev, fieldWithId]);
			}
			if (destination.droppableId === DROPZONES.COLUMN_DROPZONE) {
				setColumns((prev) => [...prev, fieldWithId]);
			}
			return;
		}

		if (
			destination.droppableId === DROPZONES.ROW_DROPZONE &&
			(source.droppableId === DROPZONES.DIMENSIONS || source.droppableId === DROPZONES.MEASURES)
		) {
			setRows((prev) => [...prev, fieldWithId]);
		}

		if (
			destination.droppableId === DROPZONES.COLUMN_DROPZONE &&
			(source.droppableId === DROPZONES.DIMENSIONS || source.droppableId === DROPZONES.MEASURES)
		) {
			setColumns((prev) => [...prev, fieldWithId]);
		}
	};

	return (
		<DndContext.Provider value={{ rows, columns, onDragEnd, updateFieldTransformation }}>
			<DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
		</DndContext.Provider>
	);
};
