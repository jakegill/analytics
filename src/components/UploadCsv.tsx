"use client";
import { useDataManager } from "@/hooks/useDataManager";

export function UploadCsv() {
	const { ingest } = useDataManager();

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;
		await ingest(file);
	};

	return (
		<div>
			<input id="csv-upload" type="file" accept=".csv" onChange={handleFileChange} />
		</div>
	);
}
