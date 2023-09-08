import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import { Link } from "@inertiajs/react";
import EventCardHeading from "../Typography/EventCardHeading";

declare global {
    interface CardBlock {
        Icon?: (({ className }: { className?: string | undefined; }) => JSX.Element) | null;
        title: string;
        description: string | JSX.Element;
        buttonText?: string | undefined
        buttonLink?: string;
        isExternal?: boolean;
    }
}

export default function EventCardBlock({ Icon = null, title, description, buttonText, buttonLink = "", isExternal = false }: CardBlock) {
    return (
        <>
            {Icon !== null &&
                <p className="flex justify-center w-auto mb-4"><Icon className="h-[90px] w-[90px] p-2 text-slate-800"></Icon></p>
            }
            <EventCardHeading>{title}</EventCardHeading>
            <div className="mb-4 text-base text-gray-700 whitespace-normal">{description}</div>
            {buttonText && buttonLink !== "" && (isExternal ?
                <a href={buttonLink} target="_blank">
                    <PrimaryButton type="button">{buttonText}</PrimaryButton>
                </a>
                :
                <Link href={buttonLink}>
                    <PrimaryButton type="button">{buttonText}</PrimaryButton>
                </Link>
            )}
        </>
    )
}