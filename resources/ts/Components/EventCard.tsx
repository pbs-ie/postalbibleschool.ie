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
            <div className={`w-fit h-full rounded-lg bg-slate-50 mx-auto md:mx-0 drop-shadow-lg ${className}`}>
                <p className="py-3 text-3xl font-extrabold text-blue-900 capitalize">{title}</p>
                <img className="object-cover rounded-lg w-80 h-72" src={image} alt={imageAlt} />
            </div>
        </Link>

    )
}