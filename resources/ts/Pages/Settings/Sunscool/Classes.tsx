import StudentMarksSection from "@/Components/Sunscool/StudentMarksSection";
import ClassroomSelectSection from "@/Components/Sunscool/ClassroomSelectSection";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import SettingsSection from "@/Elements/Sections/SettingsSection";
import SettingsLayout from "@/Layouts/SettingsLayout";
import TwoColumnLayout from "@/Layouts/TwoColumnLayout";
import { SunscoolSchoolProps } from "@/Pages/Settings/Sunscool/Index";
import { useState } from "react";
import route from "ziggy-js";

export default function Classes({ school }: { school: SunscoolSchoolProps }) {
    const [currentClass, setCurrentClass] = useState(school.classes[0]);
    return (
        <SettingsLayout title={"Sunscool Settings"}>
            <SettingsSection>
                <div>
                    <div className="flex justify-between">
                        <Heading2Alt>All Classrooms</Heading2Alt>
                    </div>
                    <hr />

                    <TwoColumnLayout>
                        <div className="order-2 lg:order-1">
                            <StudentMarksSection students={currentClass.students} />
                        </div>
                        <div className="order-1 lg:order-2">
                            <ClassroomSelectSection
                                classrooms={school.classes}
                                currentClass={currentClass}
                                setCurrentClass={setCurrentClass} />
                        </div>
                    </TwoColumnLayout>
                </div>
            </SettingsSection>
        </SettingsLayout>
    )
}