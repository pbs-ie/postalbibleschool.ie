import PlaceholderImage from "@images/assembly-sample.jpg";
import ButtonLink from "@/Elements/Buttons/ButtonLink";


export default function VideoHeroCard({ title, series, buttonLink, idx, imageLink }: { title: string, series: string, buttonLink: string, idx: number, imageLink?: string }) {
    return (
        <div className="flex-none">
            <div className="inline-flex flex-col items-center gap-2 p-2 py-4 overflow-hidden text-gray-700 rounded-lg md:p-4 drop-shadow-lg min-h-content w-fit bg-stone-100">
                <img src={imageLink ? "/assembly/image/" + imageLink : PlaceholderImage} alt={"Assembly thumbnail " + idx} className="object-cover object-center h-64 md:h-96 w-full rounded aspect-[4/3]" />
                <p className="text-base font-bold text-blue-700 md:text-lg">{series + " - " + title}</p>
                <div className="flex justify-between text-sm">
                    <ButtonLink href={buttonLink}>View in Browser</ButtonLink>
                </div>
            </div>
        </div>
    );
} 