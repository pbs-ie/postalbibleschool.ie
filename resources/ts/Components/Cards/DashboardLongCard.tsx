import BasicButton from "@/Elements/Buttons/BasicButton"
import Trash from "@/Elements/Icons/Trash"
import { Link } from "@inertiajs/react"
import React from "react"

interface CardProps {
    Icon: ({ className }: { className?: string }) => JSX.Element
    title: string
    href: string
    onDelete?: (event: React.MouseEvent) => void
}
export default function DashboardLongCard({ Icon, title, href, onDelete }: CardProps) {
    return (
        <Link className="w-full max-w-2xl" href={href} >
            <article className="flex items-center justify-between w-80 md:w-full p-4 transition-colors duration-200 border border-gray-200 rounded-md shadow-md group/card hover:border-pbsblue hover:shadow-lg hover:bg-gray-50 gap-1">
                <h1 className="font-bold text-left uppercase">{title}</h1>
                <div className="flex gap-2">
                    <span role="icon" className="p-2 border rounded-full group-hover/card:bg-white "><Icon className="w-8 transition-colors duration-200 group-hover/card:text-pbsblue" /></span>
                    {onDelete &&
                        <BasicButton dataTest="classroom-delete" onClick={onDelete} hierarchy="delete" size="xsmall"><Trash /></BasicButton>
                    }
                </div>
            </article>
        </Link>
    )
}