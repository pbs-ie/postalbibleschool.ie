import { Link } from "@inertiajs/react";

interface ResourceCardProps {
    Icon: ({ className }: { className?: string }) => JSX.Element;
    title: string;
    href: string;
}

export default function ResourceCard({ Icon, title, href }: ResourceCardProps) {
    return (
        <Link className="w-40 p-4 transition-colors duration-200 border border-gray-200 rounded-md shadow-md group/card hover:border-pbsblue hover:shadow-lg" href={href} >
            <article className="flex flex-col items-start justify-start gap-1">
                <span role="icon" className="p-2 mt-8 transition-colors duration-200 border rounded-full group-hover/card:bg-gray-50"><Icon className="w-8 transition-colors duration-200 group-hover/card:text-pbsblue" /></span>
                <h1 className="font-bold text-left uppercase">{title}</h1>
            </article>
        </Link>
    )
}