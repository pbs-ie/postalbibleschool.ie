export default function ParagraphContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto text-center md:max-w-4xl">
            {children}
        </div>
    )
}