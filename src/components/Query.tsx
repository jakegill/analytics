"use client";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import type { Field } from "@/types/field";
import { useDataManager } from "@/hooks/useDataManager";
import { useState, useEffect } from "react";
import { ChartType } from "./ChartType";
import { ChartDisplay } from "./ChartDisplay";
import { DND_IDS } from "@/hooks/useDnd";
import { useDndContext } from "./DndProvider";
import { TransformationMenu } from "./TransformationMenu";
import type { Transformations, DataClassification } from "@/types/field";
import { useChartState } from "@/hooks/useChartState";

export function Query() {
	const { query } = useDataManager();
	const { setChartType, setResults } = useChartState();
	const { rows, columns, removeField, updateField } = useDndContext();
	const [contextMenu, setContextMenu] = useState<{
		field: Field;
		position: { x: number; y: number };
	} | null>(null);

	useEffect(() => {
		if (!rows.length || !columns.length) {
			setResults([]);
			return;
		}

		const runQuery = async () => {
			const columnsWithAgg = columns.map((col) => ({
				...col,
				transformation: col.transformation || "COUNT",
			}));

			const data = await query({
				rows,
				columns: columnsWithAgg,
			});

			const processedData = data.map((row) => {
				const processed = { ...row };
				Object.keys(processed).forEach((key) => {
					if (typeof processed[key] === "bigint") {
						processed[key] = Number(processed[key]);
					}
				});
				return processed;
			});

			setResults(processedData);
		};

		runQuery();
	}, [rows, columns, query, setResults]);

	const handleContextMenu = (e: React.MouseEvent, field: Field) => {
		e.preventDefault();
		setContextMenu({
			field,
			position: { x: e.clientX, y: e.clientY },
		});
	};

	const handleTransformation = (field: Field, transformation: Transformations[DataClassification]) => {
		updateField(field.name, "columns", { transformation });
		setContextMenu(null);
	};

	const DropZone = ({
		id,
		title,
		items,
	}: {
		id: (typeof DND_IDS)[keyof typeof DND_IDS];
		title: string;
		items: Field[];
	}) => (
		<Droppable droppableId={id}>
			{(provided) => (
				<div ref={provided.innerRef} {...provided.droppableProps} className="p-4 min-h-8 flex-1">
					<h3>{title}</h3>
					{items.map((item, index) => (
						<Draggable key={item.name} draggableId={JSON.stringify(item)} index={index}>
							{(provided) => (
								<div
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
									className="p-2 bg-gray-100 rounded mt-2 flex justify-between items-center"
									onContextMenu={(e) => id === DND_IDS.COLUMNS && handleContextMenu(e, item)}
								>
									<div className="flex flex-col">
										<span>{item.name}</span>
										{item.transformation && <span className="text-xs text-neutral-500">{item.transformation}</span>}
									</div>
									<button
										onClick={() => removeField(item.name, id === DND_IDS.ROWS ? "rows" : "columns")}
										className="text-neutral-500 hover:text-neutral-700"
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
	);

	return (
		<div className="flex flex-col">
			<ChartType value={setChartType} onChange={setChartType} />
			<div className="flex border-y border-neutral-lightest">
				<DropZone id={DND_IDS.ROWS} title="Rows" items={rows} />
				<DropZone id={DND_IDS.COLUMNS} title="Columns" items={columns} />
			</div>

			{contextMenu && (
				<TransformationMenu
					field={contextMenu.field}
					position={contextMenu.position}
					onClose={() => setContextMenu(null)}
					onTransform={(transformation) => handleTransformation(contextMenu.field, transformation)}
				/>
			)}
		</div>
	);
}
