import DetailsSummary from "@/Elements/Sections/DetailsSummary";
import ClassroomSelectSection from "@/Components/Sunscool/ClassroomSelectSection";
import StudentMarksSection from "@/Components/Sunscool/StudentMarksSection";
import { SunscoolSchoolProps } from "@/Pages/Settings/Sunscool/Index";
import { useState } from "react";

export default function SunscoolResultsSection({ school }: { school: SunscoolSchoolProps }) {
    const [currentClass, setCurrentClass] = useState(school.classes[0]);
    return (
        <DetailsSummary defaultOpen summaryElement={
            <p className="text-xl font-bold">Sunscool Results</p>
        }>
            <>
                <ClassroomSelectSection
                    classrooms={school.classes}
                    currentClass={currentClass}
                    setCurrentClass={setCurrentClass} />
                <StudentMarksSection schoolId={school.id} students={currentClass.students} />
            </>
        </DetailsSummary>
    )
}