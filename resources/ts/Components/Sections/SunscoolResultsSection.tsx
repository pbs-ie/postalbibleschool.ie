import DetailsSummary from "@/Elements/Sections/DetailsSummary";
import ClassroomSelectSection from "@/Components/Sunscool/ClassroomSelectSection";
import StudentMarksSection from "@/Components/Sunscool/StudentMarksSection";
import { SunscoolClassProps, SunscoolSchoolProps } from "@/Pages/Settings/Sunscool/Index";
import { useMemo, useState } from "react";

export default function SunscoolResultsSection({ schoolId, classes }: { schoolId: SunscoolSchoolProps["id"], classes: SunscoolClassProps[] }) {
    const [currentClass, setCurrentClass] = useState(classes[0]);
    const [showProcessed, setShowProcessed] = useState(0);

    const unprocessedStudents = useMemo(() => currentClass.students.filter(({ processed }) => !processed), [currentClass.students]);

    return (
        <DetailsSummary defaultOpen summaryElement={
            <p className="text-xl font-bold">Sunscool Results</p>
        }>
            <>
                <ClassroomSelectSection
                    classrooms={classes}
                    currentClass={currentClass}
                    setCurrentClass={setCurrentClass}
                    showProcessed={showProcessed}
                    setShowProcessed={setShowProcessed}
                />
                <StudentMarksSection schoolId={schoolId} students={showProcessed ? currentClass.students : unprocessedStudents} />
            </>
        </DetailsSummary>
    )
}