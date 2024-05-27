export default function SidebarLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col max-w-30 p-2 m-2">
            {children}
        </div>
    )
}