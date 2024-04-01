import { Link } from "@inertiajs/react";

interface ResourceCardProps {
    Icon: ({ className }: { className?: string }) => JSX.Element;
    title: string;
    href: string;
    size?: "small" | "medium";
}

export default function ResourceCard({ Icon, title, href, size = "medium" }: ResourceCardProps) {
    const getClassName = () => {
        let classList: string[] = "transition-colors duration-200 bg-white border border-gray-200 rounded-lg shadow-md group/card hover:border-pbsblue hover:shadow-lg hover:bg-gray-50".split(' ');
        switch (size) {
            case "medium":
                classList.push(...("w-40 pt-10 p-4".split(' ')));
                break;
            case "small":
                classList.push(...("w-28 p-3".split(' ')));
                break;
        }

        return [...new Set(classList.filter((item) => item.trim() !== ''))].join(' ')
    }
    return (
        <Link className={getClassName()} href={href} >
            <article className={"flex flex-col gap-1 " + (size === "small" ? "justify-center items-center" : "items-start justify-start")}>
                <span role="icon" className="p-2 border rounded-full group-hover/card:bg-white"><Icon className="w-8 transition-colors duration-200 group-hover/card:text-pbsblue" /></span>
                <h1 className={"font-bold text-left uppercase " + (size === "small" ? "text-sm text-center" : "text-base")}>{title}</h1>
            </article>
        </Link>
    )
}