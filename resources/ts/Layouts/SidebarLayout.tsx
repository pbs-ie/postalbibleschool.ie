export default function SidebarLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(5rem,auto)_1fr]">
            {children}
        </div>
    )
}