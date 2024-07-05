import { SunscoolStudentProps } from "@/Pages/Settings/Sunscool/Index";
import AdvancedTable from "../Tables/AdvancedTable";
import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";

export default function StudentMarksSection({ students }: { students: SunscoolStudentProps[] }) {

    const flattenedStudentMarks = students.flatMap((student) => {
        return student.lessons.filter((lesson) => !!lesson.bibletime).sort((a, b) => (a.bibletime < b.bibletime ? -1 : 1)).map((lesson) => {
            return {
                name: student.name,
                ...lesson
            }
        })
    });

    const result = flattenedStudentMarks.reduce((acc, curr) => {
        if (!acc[curr.name]) {
            let lessonCodeRegex = /([a-zA-z]\d+)-/.exec(curr.bibletime);
            let currentBibletime = lessonCodeRegex !== null ? lessonCodeRegex[1] : "";
            acc[curr.name] = { name: curr.name, totalProgress: 0, count: 0, bibletime: currentBibletime };
        }
        acc[curr.name].totalProgress += curr.progress;
        acc[curr.name].count += 1;
        return acc;
    }, {} as Record<string, { name: string, totalProgress: number, count: number, bibletime: string }>);

    const averagedProgress = Object.values(result).map(item => ({
        name: item.name,
        averageProgress: item.totalProgress / item.count,
        bibletime: item.bibletime
    }));

    const tableData = useMemo(() => averagedProgress, [averagedProgress]);

    const columnHelper = createColumnHelper<typeof averagedProgress[0]>();

    const defaultColumns = [
        columnHelper.accessor(row => row.name + "", {
            header: "Student",
        }), columnHelper.accessor(row => row.bibletime ?? "" + "", {
            header: "BibleTime"
        }), columnHelper.accessor(row => Math.round(row.averageProgress * 100) / 100 + "", {
            header: "Progress (%)",
            enableColumnFilter: false
        }),
    ]
    return (
        <>
            <AdvancedTable data={tableData} columns={defaultColumns} enableColumnFilters={true} enableGlobalFilter={false} />
        </>
    )
}