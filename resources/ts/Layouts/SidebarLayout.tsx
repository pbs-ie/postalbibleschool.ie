export default function SidebarLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[10rem_2fr]">
            {children}
        </div>
    )
}