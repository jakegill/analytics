"use client";
import { DndContextProvider } from "@/hooks/useDnd";
import { VisualizationContextProvider } from "@/hooks/useVisualization";
import { DataPanel } from "@/components/panels/DataPanel";
import { ChartDisplay } from "@/components/visuals/ChartDisplay";
import { FilterPanel } from "@/components/panels/FilterPanel";
import { RowDropzone } from "@/components/dropzone/RowDropzone";
import { ColumnDropzone } from "@/components/dropzone/ColumnDropzone";
import { DuckDBManagerProvider } from "@/hooks/useDataManager";

export default function Home() {
	return (
		<DuckDBManagerProvider>
			<DndContextProvider>
				<VisualizationContextProvider>
					<div className="flex flex-col w-full h-[100svh] max-h-[100svh]">
						<header className="h-16 bg-primary-900 border-b border-neutral-light px-4 py-2 flex"></header>
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
				</VisualizationContextProvider>
			</DndContextProvider>
		</DuckDBManagerProvider>
	);
}
