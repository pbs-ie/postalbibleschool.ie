export default function SidebarLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[10rem_1fr]">
            {children}
        </div>
    )
}