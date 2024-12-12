import ButtonLink from "@/Elements/Buttons/ButtonLink";
import ChevronLeft from "@/Elements/Icons/ChevronLeft";

export default function BackToButton({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <ButtonLink hierarchy="transparent" href={href}><span className="flex items-center gap-2">
            <ChevronLeft /> {children}
        </span></ButtonLink>
    )
}