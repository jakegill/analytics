type ChartOptions = "pie" | "bar";

interface ChartProps {
	value: ChartOptions;
	onChange: (value: ChartOptions) => void;
}

export function ChartType({ value, onChange }: ChartProps) {
	return (
		<select value={value} onChange={(e) => onChange(e.target.value as ChartOptions)} className="p-2">
			<option value="">Select chart type...</option>
			<option value="pie">Pie Chart</option>
			<option value="bar">Bar Chart</option>
			<option value="line">Line Chart</option>
		</select>
	);
}
