import {
	IconChartBar,
	IconChartLine,
	IconChartPie,
	IconChartDots,
	IconChartHistogram,
	IconChartScatter,
} from "@tabler/icons-react";

export function FilterPanel() {
	const CHART_ICONS = [
		{ icon: IconChartBar, name: "Bar" },
		{ icon: IconChartLine, name: "Line" },
		{ icon: IconChartPie, name: "Pie" },
		{ icon: IconChartDots, name: "Dot" },
		{ icon: IconChartHistogram, name: "Histogram" },
		{ icon: IconChartScatter, name: "Scatter" },
	];

	return (
		<section className="w-48 h-full px-4 py-2 flex gap-4 flex-col border-r border-neutral-200 bg-neutral-100">
			<div className="bg-neutral-50 min-h-24 border-neutral-200 border p-1 flex flex-col">
				<label className="text-sm text-neutral-900 font-medium leading-none" htmlFor="">
					Visual
				</label>
				<div className="grid grid-cols-3 gap-1 mt-2">
					{CHART_ICONS.map((chart) => (
						<button
							key={chart.name}
							className="p-1 hover:bg-neutral-200 rounded transition-colors flex items-center justify-center"
							title={chart.name}
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
