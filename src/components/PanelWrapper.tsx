export function PanelWrapper({ children }: { children: React.ReactNode }) {
	return <section className="p-2 w-64 flex gap-4 flex-col border-neutral-lightest">{children}</section>;
}
