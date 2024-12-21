import { IconLayoutRows } from "@tabler/icons-react";

export function RowDropzone() {
	return (
		<div className="w-full border-neutral-200 bg-neutral-100 p-1">
			<div className="flex items-center w-full border border-neutral-200 bg-neutral-50 ">
				<div className="h-8 w-24 border-r border-neutral-200 text-xs text-neutral-500 py-1 px-2 flex items-center gap-1">
					<IconLayoutRows size={14} />
					Row
				</div>
				<div>{/* DROPZONE ROWS */}</div>
			</div>
		</div>
	);
}
