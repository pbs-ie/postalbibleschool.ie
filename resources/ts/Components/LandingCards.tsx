import { Link } from "@inertiajs/inertia-react";
import PrimaryButton from "./PrimaryButton";

interface LandingCards {
    heading: React.ReactNode;
    content: React.ReactNode;
    image?: string;
    className?: string;
    buttonText: string;
    buttonLink: string;
}

export default function LandingCards({ heading, content, image, buttonText, buttonLink, className = "" }: LandingCards) {
    return (
        <>
            {image ?
                <div className={"gap-4 h-full p-6 md:p-10 md:flex drop-shadow-lg bg-slate-50 " + className}>
                    <div className="md:w-1/2">
                        <div className="w-px mb-6 text-5xl font-bold uppercase md:text-6xl font-subtitle">{heading}</div>
                        <div className="mb-4 text-2xl md:text-3xl md:pr-5">{content}</div>
                        <Link href={buttonLink} type="button"><PrimaryButton>{buttonText}</PrimaryButton></Link>

                    </div>
                    <img className="hidden object-cover w-1/2 md:block" src={image} alt="Banner image" />
                </div>
                :
                <div className={"gap-4 h-full drop-shadow-lg p-6 bg-slate-50 " + className}>
                    <div className="mb-1 text-2xl font-bold uppercase font-subtitle">{heading}</div>
                    <div className="mb-2 text-xl">{content}</div>
                    <Link href={buttonLink} type="button"><PrimaryButton processing={buttonLink === ""}>{buttonLink === "" ? "Coming soon" : buttonText}</PrimaryButton></Link>
                </div>
            }
        </>
    )
}