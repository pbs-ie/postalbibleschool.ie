import PlaceholderImage from "@images/assembly-sample.jpg";

import route from "ziggy-js";
import AnchorLink from "@/Components/Navigation/AnchorLink";
export default function VideoHeroCard({ title, series, buttonLink, idx, imageLink }: { title: string, series: string, buttonLink: string, idx: number, imageLink?: string }) {
    return (
        <AnchorLink href={buttonLink} className="flex-none">
            <div className="inline-flex flex-col w-full gap-2 p-2 py-4 overflow-hidden text-gray-700 rounded-lg min-h-fit md:p-4">
                <img src={imageLink ? route('images.show', imageLink) : PlaceholderImage} alt={"Assembly thumbnail " + idx} className="object-cover rounded-lg aspect-video" />
                <p className="text-base font-bold text-blue-700 md:text-lg hover:underline">{series + " - " + title}</p>
            </div>
        </AnchorLink>
    )
} 