export default function IconHoverSpan({ children }: { children: React.ReactNode }) {
    return (
        <span className="rounded-full hover:bg-gray-200">{children}</span>
    )
}