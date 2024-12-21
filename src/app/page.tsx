"use client";
import { DataPanel } from "@/components/panels/DataPanel";
import { DndProvider } from "@/components/context/DndProvider";
import { ChartDisplay } from "@/components/visuals/ChartDisplay";
import { FilterPanel } from "@/components/panels/FilterPanel";
import { RowDropzone } from "@/components/dropzone/RowDropzone";
import { ColumnDropzone } from "@/components/dropzone/ColumnDropzone";

export default function Home() {
	return (
		<DndProvider>
			<div className="flex flex-col w-full h-[100svh] max-h-[100svh]">
				<header className="h-16 bg-primary-darkest border-b border-neutral-light px-4 py-2 flex"></header>
				<div className="flex w-full h-full">
					<DataPanel />
					<FilterPanel />
					<div className="flex flex-col w-full h-full">
						<RowDropzone />
						<ColumnDropzone />
						<ChartDisplay />
					</div>
				</div>
			</div>
		</DndProvider>
	);
}
