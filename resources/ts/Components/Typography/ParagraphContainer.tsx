export default function ParagraphContainer({ className, children }: { className?: string, children: React.ReactNode }) {
    return (
        <div className={"mx-auto text-center px-5 md:px-0 md:max-w-4xl " + className} >
            {children}
        </div>
    )
}