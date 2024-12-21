import { IconLayoutColumns } from "@tabler/icons-react";

export function ColumnDropzone() {
	return (
		<div className="w-full border-b border-neutral-200 bg-neutral-100 p-1">
			<div className="flex items-center  w-full border border-neutral-200 bg-neutral-50 ">
				<div className="h-8 w-24 border-r border-neutral-200 text-xs text-neutral-500 py-1 px-2 flex items-center gap-1">
					<IconLayoutColumns size={14} />
					Columns
				</div>
				<div>{/* DROPZONE COLUMNS */}</div>
			</div>
		</div>
	);
}
