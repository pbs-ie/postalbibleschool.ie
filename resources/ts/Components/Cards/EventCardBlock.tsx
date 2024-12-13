import EventCardHeading from "@/Components/Typography/EventCardHeading";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import ExternalLink from "@/Elements/Icons/ExternalLink";
import AnchorLink from "../Navigation/AnchorLink";

declare global {
    interface CardBlock {
        Icon?: Icon["props"];
        title: string;
        description: string | JSX.Element;
        buttonText?: string | undefined
        buttonLink?: string;
        isExternal?: boolean;
        isHighlighted?: "0" | "1";
    }
}

export default function EventCardBlock({ Icon, title, description, buttonText, buttonLink = "", isExternal = false }: CardBlock) {
    return (
        <>
            {Icon &&
                <p className="flex justify-center w-auto mb-4"><Icon className="h-[90px] w-[90px] p-2 text-slate-800" /></p>
            }
            <EventCardHeading>{title}</EventCardHeading>
            <div className="mb-4 text-base text-gray-700 whitespace-normal">{description}</div>
            {buttonText && buttonLink !== "" &&
                (isExternal ?
                    <div className="flex justify-center">
                        <AnchorLink href={buttonLink}>{buttonText}</AnchorLink>
                    </div>
                    :
                    <ButtonLink href={buttonLink}>{buttonText}</ButtonLink>
                )}
        </>
    )
}