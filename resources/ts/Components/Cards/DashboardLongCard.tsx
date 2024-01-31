import { Link } from "@inertiajs/react"

interface CardProps {
    Icon: ({ className }: { className?: string }) => JSX.Element
    title: string
    href: string
}
export default function DashboardLongCard({ Icon, title, href }: CardProps) {
    return (
        <Link className="w-full" href={href} >
            <article className="flex items-center justify-between w-80 md:w-full p-4 transition-colors duration-200 border border-gray-200 rounded-md shadow-md group/card hover:border-pbsblue hover:shadow-lg hover:bg-gray-50 gap-1">
                <h1 className="font-bold text-left uppercase">{title}</h1>
                <span role="icon" className="p-2 border rounded-full group-hover/card:bg-white"><Icon className="w-8 transition-colors duration-200 group-hover/card:text-pbsblue" /></span>
            </article>
        </Link>
    )
}