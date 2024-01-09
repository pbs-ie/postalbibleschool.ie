import IconSection from "@/Components/DesignSystem/IconSection";
import { Header1, Header2 } from "@/Components/Typography/DesignSystemTypography";
import BasicButton from "@/Elements/Buttons/BasicButton";
import ButtonAnchor from "@/Elements/Buttons/ButtonAnchor";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import ChevronRight from "@/Elements/Icons/ChevronRight";
import ExternalLink from "@/Elements/Icons/ExternalLink";
import DocumentationLayout from "@/Layouts/DocumentationLayout";

export default function DesignSystem() {

    return (
        <DocumentationLayout title={"Design System"} subtitle="Documentation of the design system for postalbibleschool.ie">
            <div className="flex flex-col gap-4 md:gap-12">
                <section className="text-blue-900">
                    <Header1>Basic Buttons</Header1>
                    <Header2>Differing Hierarchy and Sizes</Header2>
                    <div className="flex gap-2">
                        <BasicButton size="large" hierarchy="primary">Primary button</BasicButton>
                        <BasicButton size="large" hierarchy="secondary">Secondary button</BasicButton>
                        <BasicButton size="large" hierarchy="tertiary">Tertiary button</BasicButton>
                        <BasicButton size="large" hierarchy="transparent">Transparent button</BasicButton>
                    </div>
                    <div className="flex gap-2">
                        <BasicButton size="medium" hierarchy="primary">Primary button</BasicButton>
                        <BasicButton size="medium" hierarchy="secondary">Secondary button</BasicButton>
                        <BasicButton size="medium" hierarchy="tertiary">Tertiary button</BasicButton>
                        <BasicButton size="medium" hierarchy="transparent">Transparent button</BasicButton>
                    </div>
                    <div className="flex gap-2">
                        <BasicButton size="small" hierarchy="primary">Primary button</BasicButton>
                        <BasicButton size="small" hierarchy="secondary">Secondary button</BasicButton>
                        <BasicButton size="small" hierarchy="tertiary">Tertiary button</BasicButton>
                        <BasicButton size="small" hierarchy="transparent">Transparent button</BasicButton>
                    </div>
                    <div className="flex gap-2">
                        <BasicButton size="xsmall" hierarchy="primary">Primary button</BasicButton>
                        <BasicButton size="xsmall" hierarchy="secondary">Secondary button</BasicButton>
                        <BasicButton size="xsmall" hierarchy="tertiary">Tertiary button</BasicButton>
                        <BasicButton size="xsmall" hierarchy="transparent">Transparent button</BasicButton>
                    </div>

                    <Header1>Links as buttons</Header1>
                    <Header2>Basic</Header2>
                    <div className="flex gap-2">
                        <ButtonAnchor href={"#"}>Anchor button</ButtonAnchor>
                        <ButtonLink href={"#"}>Link button</ButtonLink>
                    </div>
                    <Header2>With Icons</Header2>
                    <div className="flex gap-2">
                        <ButtonAnchor Icon={ExternalLink} href={"#"}>Anchor button</ButtonAnchor>
                        <ButtonLink Icon={ChevronRight} href={"#"}>Link button</ButtonLink>
                    </div>
                </section>
                <IconSection />
            </div>
        </DocumentationLayout>
    )
}