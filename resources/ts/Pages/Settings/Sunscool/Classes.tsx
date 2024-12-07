import route from "ziggy-js";

import SettingsLayout from "@/Layouts/SettingsLayout";

import { SunscoolSchoolProps } from "@/Pages/Settings/Sunscool/Index";

import Heading2Alt from "@/Components/Typography/Heading2Alt";
import StudentListSection from "@/Components/Sections/StudentListSection";
import SunscoolResultsSection from "@/Components/Sections/SunscoolResultsSection";

import ButtonLink from "@/Elements/Buttons/ButtonLink";
import SettingsSection from "@/Elements/Sections/SettingsSection";
import ChevronLeft from "@/Elements/Icons/ChevronLeft";

export default function Classes({ school }: { school: SunscoolSchoolProps }) {
    return (
        <SettingsLayout title={"Sunscool Settings"}>
            <SettingsSection>
                <div className="relative w-full lg:mt-4">
                    <div className="flex items-center justify-between">
                        <Heading2Alt>{school.name}</Heading2Alt>
                        <ButtonLink hierarchy="transparent" href={route('settings.sunscool.index')}><span className="flex items-center gap-2">
                            <ChevronLeft /> Back to Schools
                        </span></ButtonLink>
                    </div>
                    <hr />
                    <SunscoolResultsSection school={school} />

                </div>
            </SettingsSection>
        </SettingsLayout>
    )
}