import { IconAbc, IconPercentage } from "@tabler/icons-react";

interface PlaceholderProps {
	type: "dimension" | "measure";
	message?: string;
}

export function Placeholder({ type, message = "Drag here..." }: PlaceholderProps) {
	return (
		<div
			className={`border-neutral-light max-w-32 truncate py-1 w-full grid grid-cols-[24px_1fr] text-xs rounded-full 
        ${type === "measure" ? "bg-teal-50 border border-teal-100" : "bg-yellow-50 border border-yellow-100"}
        items-center px-2 opacity-50`}
		>
			<span className={type === "measure" ? "text-teal-300" : "text-yellow-300"}>
				{type === "measure" ? <IconPercentage size={16} /> : <IconAbc size={16} />}
			</span>
			<p className={`truncate font-medium ${type === "measure" ? "text-teal-300" : "text-yellow-300"}`}>{message}</p>
		</div>
	);
}
