interface Entry {
    image?: string;
    imageAlt?: string;
    heading?: string;
    description: string;
    year: string;
    className?: string;
    type?: "left" | "right";

}

export default function TimelineEntry({ image, imageAlt, heading, description, year, type = "left", className }: Entry) {
    return (
        <div className={`relative mb-8 flex ${type === "left" ? "flex-row-reverse" : ""} justify-between w-full ${className}`}>
            <div className="w-2/12 md:w-5/12"></div>
            <div className="z-20 items-center hidden w-4 h-4 bg-blue-400 rounded-full shadow-xl md:relative md:flex">
                {year &&
                    <div className={`absolute text-2xl font-bold text-gray-300 italic justify-center h-fit ${type === "left" ? "-left-8 sm:-left-10" : "left-1"} top-7 sm:top-10 -rotate-90`}>{year}</div>
                }
            </div>
            <div className={`bg-stone-200 rounded-lg shadow-xl w-full md:w-5/12 px-6 sm:px-10 py-4 sm:py-6`}>
                {image &&
                    <img src={image} alt={imageAlt} className="object-cover object-top w-full aspect-[4/3] rounded-lg mb-3" />
                }
                {heading &&
                    <h3 className="mb-3 text-base font-bold text-gray-700 sm:text-xl">{heading}</h3>
                }
                <p className="text-sm leading-snug tracking-wide text-left text-gray-700 text-opacity-100">{description}</p>
            </div>
        </div>
    )
}