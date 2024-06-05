import ButtonLink from "@/Elements/Buttons/ButtonLink";
import ChevronLeft from "@/Elements/Icons/ChevronLeft";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";

export default function BonusAssemblyWrapper({ title, navBackText, navBackRoute, children }: { title: string, navBackText: string, navBackRoute: string, children: React.ReactNode }) {
    return (
        <WrapperLayout>
            <ButtonLink hierarchy="transparent" href={navBackRoute}><span className="flex items-center gap-2">
                <ChevronLeft />{navBackText}
            </span></ButtonLink>
            <ContentWrapper title={title}>
                {children}
            </ContentWrapper>
        </WrapperLayout>
    )
}