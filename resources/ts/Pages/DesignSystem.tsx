import BasicButton from "@/Elements/Buttons/BasicButton";
import ButtonAnchor from "@/Elements/Buttons/ButtonAnchor";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import DocumentationLayout from "@/Layouts/DocumentationLayout";
import React from "react";

export default function DesignSystem() {
    const Header1 = ({ children }: { children: React.ReactNode }) => {
        return <h1 className="mt-6 text-2xl font-bold first:mt-0">{children}</h1>
    }
    const Header2 = ({ children }: { children: React.ReactNode }) => {
        return <h2 className="my-2 text-lg font-bold ">{children}</h2>
    }
    return (
        <DocumentationLayout title={"Design System"} subtitle="Documentation of the design system for postalbibleschool.ie">
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
                <div className="flex gap-2">
                    <ButtonAnchor href={"#"}>Anchor button</ButtonAnchor>
                    <ButtonLink href={"#"}>Link button</ButtonLink>
                </div>
            </section>
        </DocumentationLayout>
    )
}