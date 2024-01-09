import EventCardHeading from "@/Components/Typography/EventCardHeading";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import ButtonAnchor from "@/Elements/Buttons/ButtonAnchor";
import ExternalLink from "@/Elements/Icons/ExternalLink";

declare global {
    interface CardBlock {
        Icon?: Icon["props"];
        title: string;
        description: string | JSX.Element;
        buttonText?: string | undefined
        buttonLink?: string;
        isExternal?: boolean;
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
                    <ButtonAnchor Icon={ExternalLink} href={buttonLink} isExternalLink>{buttonText}</ButtonAnchor>
                    :
                    <ButtonLink href={buttonLink}>{buttonText}</ButtonLink>
                )}
        </>
    )
}