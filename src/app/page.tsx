import { UploadCsv } from "@/components/UploadCsv";
import { DataPanel } from "@/components/DataPanel";
import { Query } from "@/components/Query";

export default function Home() {
	return (
		<div className="flex flex-col w-full h-full max-h-[100svh]">
			<UploadCsv />
			<div className="flex flex-col w-full">
				<div className="flex w-full">
					<DataPanel />
					<Query />
				</div>
			</div>
		</div>
	);
}
