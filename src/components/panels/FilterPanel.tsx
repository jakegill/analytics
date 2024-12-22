import {
	IconChartBar,
	IconChartLine,
	IconChartPie,
	IconChartDots,
	IconChartHistogram,
	IconChartScatter,
	IconTable,
} from "@tabler/icons-react";
import { useVisualization } from "@/hooks/useVisualization";
import { ChartType } from "@/types/visual.d";

export function FilterPanel() {
	const { visualType, setVisualType } = useVisualization();

	const CHART_ICONS = [
		{ icon: IconChartBar, type: "bar" },
		{ icon: IconChartLine, type: "line" },
		{ icon: IconChartPie, type: "pie" },
		{ icon: IconChartHistogram, type: "histogram" },
		{ icon: IconChartScatter, type: "scatter" },
		{ icon: IconTable, type: "table" },
	] as const;

	return (
		<section className="min-w-40 max-w-40 h-full px-4 py-2 flex gap-4 flex-col  bg-neutral-100">
			<div className="bg-neutral-50 min-h-24 border-neutral-200 border p-1 flex flex-col">
				<label className="text-sm text-neutral-900 font-medium leading-none" htmlFor="">
					Visual
				</label>
				<div className="grid grid-cols-3 gap-1 mt-2">
					{CHART_ICONS.map((chart) => (
						<button
							key={chart.type}
							onClick={() => setVisualType(chart.type)}
							className={`p-1 hover:bg-neutral-200 rounded transition-colors flex items-center justify-center
								${visualType === chart.type ? "bg-neutral-100" : ""}`}
							title={chart.type}
						>
							<chart.icon size={16} stroke={1.5} />
						</button>
					))}
				</div>
			</div>

			<div className="bg-neutral-50 min-h-24 border-neutral-200 border p-1 flex flex-col">
				<label className="text-sm text-neutral-900 font-medium" htmlFor="">
					Customize
				</label>
				<div>{/* IGNORE FOR NOW */}</div>
			</div>
			<div className="bg-neutral-50 min-h-24 border-neutral-200 border p-1 flex flex-col">
				<label className="text-sm text-neutral-900 font-medium" htmlFor="">
					Filters
				</label>
				<div>{/* DROPZONE FILTERS ON DIMENSIONS OR MEASURES */}</div>
			</div>
		</section>
	);
}
