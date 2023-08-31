import PlaceholderImage from "@images/assembly-sample.jpg";
import { Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";


export default function VideoHeroCard({ title, series, buttonLink, idx, imageLink }: { title: string, series: string, buttonLink: string, idx: number, imageLink?: string }) {
    return (
        <div className="flex-none">
            <div className="inline-flex flex-col items-center gap-2 p-2 py-4 overflow-hidden text-gray-700 rounded-lg md:p-4 drop-shadow-lg min-h-content w-fit bg-stone-100">
                <img src={imageLink ? "/assembly/image/" + imageLink : PlaceholderImage} alt={"Assembly thumbnail " + idx} className="object-cover object-left h-64 md:h-96 w-full rounded aspect-[4/3]" />
                <p className="text-base font-bold text-blue-700 md:text-lg">{series + " - " + title}</p>
                <div className="flex justify-between text-sm">
                    <Link href={buttonLink}><PrimaryButton>View in Browser</PrimaryButton></Link>
                </div>
            </div>
        </div>
    );
} 