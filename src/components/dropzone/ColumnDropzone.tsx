import { IconLayoutColumns } from "@tabler/icons-react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useDnd } from "@/hooks/useDnd";
import { useVisualization } from "@/hooks/useVisualization";
import { Field } from "../panels/Field";
import { Placeholder } from "./Placeholder";

export function ColumnDropzone() {
	const { columns } = useDnd();
	const { visualType } = useVisualization();

	const getPlaceholders = () => {
		if (!columns.length) {
			switch (visualType) {
				case "histogram":
					return [<Placeholder key="m1" type="measure" message="Drag measure here..." />];
				case "scatter":
					return [
						<Placeholder key="m1" type="measure" message="Drag X measure..." />,
						<Placeholder key="m2" type="measure" message="Drag Y measure..." />,
					];
				case "pie":
					return [<Placeholder key="m1" type="measure" message="Drag one measure..." />];
				default:
					return [<Placeholder key="m1" type="measure" message="Drag measures here..." />];
			}
		}
		if (visualType === "scatter" && columns.length === 1) {
			return [<Placeholder key="m2" type="measure" message="Drag Y measure..." />];
		}
		return null;
	};

	return (
		<div className="w-full bg-neutral-100 pr-2 pb-2">
			<div className="flex items-center w-full border border-neutral-200 bg-neutral-50">
				<div className="h-8 w-24 border-r border-neutral-200 text-xs text-neutral-500 py-1 px-2 flex items-center gap-1">
					<IconLayoutColumns size={14} />
					Columns
				</div>
				<Droppable droppableId="COLUMN_DROPZONE" direction="horizontal">
					{(provided) => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							className="flex-1 flex gap-1 p-1 min-h-[2rem] items-center"
						>
							{columns.map((field, index) => (
								<Draggable key={field.id || field.name} draggableId={JSON.stringify(field)} index={index}>
									{(provided) => <Field field={field} provided={provided} />}
								</Draggable>
							))}
							{getPlaceholders()}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>
		</div>
	);
}
