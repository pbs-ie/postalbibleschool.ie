import route from "ziggy-js";

import SettingsLayout from "@/Layouts/SettingsLayout";

import { SunscoolClassProps, SunscoolSchoolProps } from "@/Pages/Settings/Sunscool/Index";

import Heading2Alt from "@/Components/Typography/Heading2Alt";

import ButtonLink from "@/Elements/Buttons/ButtonLink";
import SettingsSection from "@/Elements/Sections/SettingsSection";
import ChevronLeft from "@/Elements/Icons/ChevronLeft";
import StudentMarksSection from "@/Components/Sunscool/StudentMarksSection";
import { useState, useMemo } from "react";
import ClassroomSelectSection from "@/Components/Sunscool/ClassroomSelectSection";

interface ClassroomProps {
    schoolId: SunscoolSchoolProps["id"],
    classroomId: number,
    schoolName: string,
    classrooms: SunscoolClassProps[],
    classroomDetails: SunscoolClassProps
}
export default function Classroom({ schoolId, classroomId, schoolName, classrooms, classroomDetails }: ClassroomProps) {
    const [showProcessed, setShowProcessed] = useState(0);
    const unprocessedStudents = useMemo(() => classroomDetails.students.filter(({ isProcessed }) => !isProcessed), [classroomDetails]);
    return (
        <SettingsLayout title={"Sunscool Settings"}>
            <SettingsSection>
                <div className="relative w-full lg:mt-4">
                    <div className="flex items-center justify-between">
                        <Heading2Alt>{schoolName}</Heading2Alt>
                        <ButtonLink hierarchy="transparent" href={route('settings.sunscool.index')}><span className="flex items-center gap-2">
                            <ChevronLeft /> Back to Schools
                        </span></ButtonLink>
                    </div>
                    <ClassroomSelectSection
                        schoolId={schoolId}
                        activeClassroomId={classroomId}
                        classrooms={classrooms}
                        showProcessed={showProcessed}
                        setShowProcessed={setShowProcessed}
                    />
                    <StudentMarksSection schoolId={schoolId} classroomId={classroomId} students={showProcessed ? classroomDetails.students : unprocessedStudents} setShowProcessed={setShowProcessed} />

                </div>
            </SettingsSection>
        </SettingsLayout>
    )
}