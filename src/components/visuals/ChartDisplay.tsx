"use client";
import { useVisualization } from "@/hooks/useVisualization";
import { useState, useRef, useEffect } from "react";
import {
	LineChart,
	Line,
	BarChart,
	Bar,
	PieChart,
	Pie,
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
const ROWS_PER_PAGE = 20;
const VISIBLE_BARS = 40; // Number of bars/points visible at once

export function ChartDisplay() {
	const { visualType, data, isLoading, rows, columns } = useVisualization();
	const [currentPage, setCurrentPage] = useState(0);
	const [scrollPosition, setScrollPosition] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleScroll = () => {
		if (containerRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
			setScrollPosition(scrollLeft / (scrollWidth - clientWidth));
		}
	};

	const getVisibleData = () => {
		if (!data) return [];
		if (visualType === "table") {
			const startIndex = currentPage * ROWS_PER_PAGE;
			return data.slice(startIndex, startIndex + ROWS_PER_PAGE);
		}

		if (visualType === "line" || visualType === "bar") {
			const totalItems = data.length;
			const startIndex = Math.floor(scrollPosition * Math.max(0, totalItems - VISIBLE_BARS));
			return data.slice(startIndex, startIndex + VISIBLE_BARS);
		}

		return data;
	};

	const renderScrollableChart = (ChartComponent: typeof LineChart | typeof BarChart, children: React.ReactNode) => {
		const visibleData = getVisibleData();
		const totalWidth = Math.max(800, (data?.length ?? 0) * 40);

		return (
			<div className="w-full h-full flex flex-col">
				<div ref={containerRef} className="flex-1 overflow-x-auto overflow-y-hidden" onScroll={handleScroll}>
					<div style={{ width: `${totalWidth}px`, height: "100%" }}>
						<ResponsiveContainer width="100%" height="100%">
							<ChartComponent data={visibleData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey={rows[0].name} />
								<YAxis />
								<Tooltip />
								{children}
							</ChartComponent>
						</ResponsiveContainer>
					</div>
				</div>
			</div>
		);
	};

	const renderChart = () => {
		switch (visualType) {
			case "line":
				return renderScrollableChart(
					LineChart,
					columns.map((col, index) => (
						<Line key={col.name} type="monotone" dataKey={col.name} stroke={COLORS[index % COLORS.length]} />
					))
				);

			case "bar":
				return renderScrollableChart(
					BarChart,
					columns.map((col, index) => <Bar key={col.name} dataKey={col.name} fill={COLORS[index % COLORS.length]} />)
				);

			case "pie":
				if (!data) return null;
				return (
					<ResponsiveContainer>
						<PieChart>
							<Pie
								data={data}
								dataKey={columns[0].name}
								nameKey={rows[0].name}
								cx="50%"
								cy="50%"
								outerRadius={80}
								label
							>
								{data.map((_, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
				);

			case "scatter":
				if (!data || !columns || columns.length < 2) return null;
				return (
					<ResponsiveContainer>
						<ScatterChart>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey={columns[0].name} type="number" />
							<YAxis dataKey={columns[1].name} type="number" />
							<Tooltip />
							<Scatter data={data} fill={COLORS[0]} />
						</ScatterChart>
					</ResponsiveContainer>
				);

			case "histogram":
				if (!data) return null;
				return (
					<ResponsiveContainer>
						<BarChart data={data}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="bin" />
							<YAxis dataKey="count" />
							<Tooltip />
							<Bar dataKey="count" fill={COLORS[0]} />
						</BarChart>
					</ResponsiveContainer>
				);

			default:
				return <pre>{JSON.stringify(data, null, 2)}</pre>;
		}
	};

	return <div className="w-full h-full border-l border-t border-neutral-200 flex p-4">{renderChart()}</div>;
}
