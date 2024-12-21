"use client";
import { useDataManager } from "@/hooks/useDataManager";
import { IconFileUpload, IconUpload } from "@tabler/icons-react";
import { useRef } from "react";

export function UploadDataset() {
	const { ingest } = useDataManager();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;
		await ingest(file);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	return (
		<>
			<input
				ref={fileInputRef}
				id="csv-upload"
				type="file"
				accept=".csv"
				onChange={handleFileChange}
				className="sr-only"
				aria-label="Upload CSV file"
			/>
			<label
				htmlFor="csv-upload"
				className="inline-flex items-center text-neutral-700 hover:text-neutral-900 gap-1 transition-colors cursor-pointer"
			>
				<IconFileUpload size={12} />
				<span className="text-sm">CSV</span>
			</label>
		</>
	);
}
