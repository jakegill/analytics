"use client";
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";
import { useChartState } from "@/hooks/useChartState";
import { useDndContext } from "./DndProvider";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function ChartDisplay() {
	const { chartType, results } = useChartState();
	const { rows, columns } = useDndContext();

	if (!results.length || !chartType) return null;

	const dimension = rows[0]?.name || "";
	const measures = columns.map((m) => m.name);

	if (chartType === "pie") {
		return (
			<ResponsiveContainer width="100%" height={400}>
				<PieChart>
					<Pie data={results} dataKey={measures[0]} nameKey={dimension} cx="50%" cy="50%" outerRadius="70%" label>
						{results.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
						))}
					</Pie>
					<Tooltip />
					<Legend layout="vertical" align="right" verticalAlign="middle" />
				</PieChart>
			</ResponsiveContainer>
		);
	}

	return (
		<ResponsiveContainer width="100%" height={400}>
			<BarChart data={results}>
				<XAxis dataKey={dimension} />
				<YAxis />
				<Tooltip />
				<Legend layout="vertical" align="right" verticalAlign="middle" />
				{measures.map((measure, index) => (
					<Bar key={measure} dataKey={measure} fill={COLORS[index % COLORS.length]} />
				))}
			</BarChart>
		</ResponsiveContainer>
	);
}
