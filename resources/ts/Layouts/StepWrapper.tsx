import { Head } from "@inertiajs/react";
import WrapperLayout from "@/Layouts/WrapperLayout";

import LogoWhite from "@images/step/step_logo.png";
import Heading1Nospace from "@/Components/Typography/Heading1Nospace";

export default function StepWrapper({ children, title, heading }: { children: React.ReactNode, title: string, heading: string }) {
    return (
        <WrapperLayout showStepNav>
            {/* @ts-ignore  */}
            <Head>
                <title>{`Events - STEP${title !== "" ? " - " + title : ""}`}</title>
                <link head-key="favicon" rel="shortcut icon" href={LogoWhite} />
            </Head>
            <section className="px-3 py-6 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
                {heading && heading !== "" &&
                    <Heading1Nospace>{heading}</Heading1Nospace>
                }
                {children}
            </section>
        </WrapperLayout>
    )
}