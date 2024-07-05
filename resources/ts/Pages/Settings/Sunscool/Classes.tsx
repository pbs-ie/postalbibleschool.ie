import StudentMarksSection from "@/Components/Sunscool/StudentMarksSection";
import ClassroomSelectSection from "@/Components/Sunscool/ClassroomSelectSection";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import SettingsSection from "@/Elements/Sections/SettingsSection";
import SettingsLayout from "@/Layouts/SettingsLayout";
import { SunscoolSchoolProps } from "@/Pages/Settings/Sunscool/Index";
import { useState } from "react";
import route from "ziggy-js";
import ChevronLeft from "@/Elements/Icons/ChevronLeft";

export default function Classes({ school }: { school: SunscoolSchoolProps }) {
    const [currentClass, setCurrentClass] = useState(school.classes[0]);
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

                    <div>
                        <ClassroomSelectSection
                            classrooms={school.classes}
                            currentClass={currentClass}
                            setCurrentClass={setCurrentClass} />
                        <StudentMarksSection students={currentClass.students} />
                    </div>
                </div>
            </SettingsSection>
        </SettingsLayout>
    )
}