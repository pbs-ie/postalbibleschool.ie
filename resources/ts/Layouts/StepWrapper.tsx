import { Head } from "@inertiajs/react";
import WrapperLayout from "./WrapperLayout";

import LogoWhite from "@images/step/step_logo.png";

export default function StepWrapper({ children, title }: { children: React.ReactNode, title: string }) {
    return (
        <WrapperLayout showStepNav>
            {/* @ts-ignore  */}
            <Head>
                <title>{`Events - STEP - ${title}`}</title>
                <link head-key="favicon" rel="shortcut icon" href={LogoWhite} />
            </Head>
            {children}
        </WrapperLayout>
    )
}