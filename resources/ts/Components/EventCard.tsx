interface EventCard {
    title: string;
    image: string;
    imageAlt: string;
    className?: string
}

export default function EventCard({ title, image, imageAlt, className = "" }: EventCard) {
    return (
        <div className={`w-fit h-full rounded-md bg-slate-100 mx-auto md:mx-0 drop-shadow-lg ${className}`}>
            <p className="py-3 text-2xl font-bold text-blue-900 uppercase">{title}</p>
            <img className="object-cover w-64 h-64 rounded-md" src={image} alt={imageAlt} />
        </div>

    )
}