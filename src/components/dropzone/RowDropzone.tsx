import { IconLayoutRows } from "@tabler/icons-react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useDnd } from "@/hooks/useDnd";
import { useVisualization } from "@/hooks/useVisualization";
import { Field } from "../panels/Field";
import { Placeholder } from "./Placeholder";

export function RowDropzone() {
	const { rows } = useDnd();
	const { visualType } = useVisualization();

	const getPlaceholder = () => {
		if (!rows.length) {
			switch (visualType) {
				case "line":
				case "bar":
				case "pie":
					return <Placeholder type="dimension" message="Drag dimension here..." />;
				default:
					return <Placeholder type="dimension" message="Drag fields here..." />;
			}
		}
		return null;
	};

	return (
		<div className="w-full border-neutral-200 bg-neutral-100 pr-2 py-2">
			<div className="flex items-center w-full border border-neutral-200 bg-neutral-50">
				<div className="h-8 w-24 border-r border-neutral-200 text-xs text-neutral-500 py-1 px-2 flex items-center gap-1">
					<IconLayoutRows size={14} />
					Rows
				</div>
				<Droppable droppableId="ROW_DROPZONE" direction="horizontal">
					{(provided) => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							className="flex-1 flex gap-1 p-1 min-h-[2rem] items-center"
						>
							{rows.map((field, index) => (
								<Draggable key={field.id || field.name} draggableId={JSON.stringify(field)} index={index}>
									{(provided) => <Field field={field} provided={provided} />}
								</Draggable>
							))}
							{!rows.length && getPlaceholder()}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>
		</div>
	);
}
