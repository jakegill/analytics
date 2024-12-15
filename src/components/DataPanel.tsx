"use client";
import { useDataManager } from "@/hooks/useDataManager";
import { IconAbc, IconClock, IconHash, IconLoader2 } from "@tabler/icons-react";
import { PanelWrapper } from "./PanelWrapper";

export function DataPanel() {
	const { columns, isLoading } = useDataManager();

	if (isLoading) {
		return (
			<div>
				<IconLoader2 />
			</div>
		);
	}

	return (
		<PanelWrapper>
			<div className="flex flex-col gap-1">
				<h2 className="text-sm font-medium text-neutral-dark">Columns</h2>
				<div className="shadow-inner-sm flex flex-col">
					{columns.map((col) => (
						<div key={col.name} className="border-neutral-light py-1 w-64 grid grid-cols-[.20fr_.75fr] text-xs">
							<div className="text-neutral-medium">{col.type}</div>
							<p className="truncate text-neutral-dark font-medium">{col.name}</p>
						</div>
					))}
				</div>
			</div>
		</PanelWrapper>
	);
}
