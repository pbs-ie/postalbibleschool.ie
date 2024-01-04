export default function TitleBlock({ title, subtitle = '' }: { title: string, subtitle?: string }) {
    return (
        <header className="w-full p-6 text-left bg-gray-100 md:p-12">
            <h1 className="mt-2 mb-4 text-3xl font-bold leading-snug text-blue-800 uppercase md:text-4xl font-title">{title}</h1>
            {subtitle && <p className="text-xl md:text-2xl">{subtitle}</p>}
        </header>
    )
}