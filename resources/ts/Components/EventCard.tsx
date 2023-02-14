import { Link } from "@inertiajs/inertia-react";

interface EventCard {
    title: string;
    image: string;
    imageAlt: string;
    className?: string;
    routeName: string;
}

export default function EventCard({ title, image, imageAlt, className = "", routeName }: EventCard) {
    return (
        <Link href={route(routeName)} >
            <div className={`w-fit h-full rounded-lg bg-slate-50 mx-auto overflow-clip md:mx-0 drop-shadow-lg hover:bg-slate-200 ${className}`}>
                <p className="py-3 text-3xl font-extrabold text-blue-900 capitalize">{title}</p>
                <img className="object-cover transition rounded-lg w-80 h-72 hover:scale-105" src={image} alt={imageAlt} />
            </div>
        </Link>

    )
}