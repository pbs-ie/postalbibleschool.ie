import { Head } from "@inertiajs/react";
import WrapperLayout from "./WrapperLayout";

import LogoWhite from "@images/step/step_logo.png";
import Heading1 from "@/Components/Typography/Heading1";

export default function StepWrapper({ children, title, heading }: { children: React.ReactNode, title: string, heading: string }) {
    return (
        <WrapperLayout showStepNav>
            {/* @ts-ignore  */}
            <Head>
                <title>{`Events - STEP${title !== "" ? " - " + title : ""}`}</title>
                <link head-key="favicon" rel="shortcut icon" href={LogoWhite} />
            </Head>
            <section className="py-12 mx-auto text-center shadow-sm max-w-7xl sm:px-6 lg:px-8">
                <Heading1>{heading}</Heading1>
                {children}
            </section>
        </WrapperLayout>
    )
}