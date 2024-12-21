import { DataPanel } from "@/components/DataPanel";
import { Query } from "@/components/Query";
import { DndProvider } from "@/components/DndProvider";
import { ChartProvider } from "@/hooks/useChartState";
import { ChartDisplay } from "@/components/ChartDisplay";

export default function Home() {
	return (
		<DndProvider>
			<ChartProvider>
				<div className="flex flex-col w-full h-[100svh] max-h-[100svh]">
					<div className="flex w-full h-full">
						<div className="h-full border-r border-neutral-lightest">
							<DataPanel />
						</div>
						<div className="flex flex-col w-full h-full">
							<Query />
							<div className="flex-grow flex items-center justify-center p-4">
								<ChartDisplay />
							</div>
						</div>
					</div>
				</div>
			</ChartProvider>
		</DndProvider>
	);
}
