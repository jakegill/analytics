"use client";
import { useEffect, useRef } from "react";
import type { Field, DataClassification, Transformations } from "@/types/field";

interface TransformationMenuProps {
	field: Field;
	position: { x: number; y: number };
	onClose: () => void;
	onTransform: (transformation: Transformations[DataClassification]) => void;
}

export function TransformationMenu({ field, position, onClose, onTransform }: TransformationMenuProps) {
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				onClose();
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [onClose]);

	const getTransformations = () => {
		const classification = field.classification || "quantitative";
		switch (classification) {
			case "quantitative":
				return ["SUM", "AVG", "MEDIAN", "MIN", "MAX", "COUNT", "COUNT_DISTINCT"];
			case "ordinal":
			case "nominal":
				return ["COUNT", "MODE"];
			case "temporal":
				return ["MIN", "MAX", "COUNT"];
			default:
				return [];
		}
	};

	return (
		<div
			ref={menuRef}
			className="absolute bg-white shadow-lg rounded-md py-1 z-50"
			style={{ top: position.y, left: position.x }}
		>
			{getTransformations().map((transform) => (
				<button
					key={transform}
					className="w-full px-4 py-2 text-left hover:bg-neutral-50 text-sm"
					onClick={() => onTransform(transform as Transformations[DataClassification])}
				>
					{transform}
				</button>
			))}
		</div>
	);
}
