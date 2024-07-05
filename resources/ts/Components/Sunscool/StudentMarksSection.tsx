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
        let lessonCodeRegex = /([a-zA-z]\d+)-/.exec(curr.bibletime);
        let currentBibletime = lessonCodeRegex !== null ? lessonCodeRegex[1] : "";
        if (!acc[curr.name + currentBibletime]) {
            acc[curr.name + currentBibletime] = { name: curr.name, totalProgress: 0, count: 0, bibletime: currentBibletime };
        }
        acc[curr.name + currentBibletime].totalProgress += curr.progress;
        acc[curr.name + currentBibletime].count += 1;
        return acc;
    }, {} as Record<string, { name: string, totalProgress: number, count: number, bibletime: string }>);

    const averagedProgress = Object.values(result).map(item => ({
        name: item.name,
        totalAverage: item.totalProgress / 4,
        attemptedAverage: item.totalProgress / item.count,
        itemCount: item.count,
        bibletime: item.bibletime
    }));

    const tableData = useMemo(() => averagedProgress, [averagedProgress]);

    const columnHelper = createColumnHelper<typeof averagedProgress[0]>();

    const defaultColumns = [
        columnHelper.display({
            id: "Sr",
            header: "No.",
            cell: ({ row }) => (
                <span>{(+row.id + 1)}</span>
            )
        }),
        columnHelper.accessor(row => row.name + "", {
            header: "Student",
        }), columnHelper.accessor(row => row.bibletime ?? "" + "", {
            header: "BibleTime"
        }), columnHelper.accessor(row => row.itemCount + "", {
            header: "Stories Attempted",
            enableColumnFilter: false
        }), columnHelper.accessor(row => Math.round(row.attemptedAverage * 100) / 100 + "", {
            header: "Attempted Avg (%)",
            enableColumnFilter: false
        }), columnHelper.accessor(row => Math.round(row.totalAverage * 100) / 100 + "", {
            header: "Total Avg (%)",
            enableColumnFilter: false
        }),
    ]
    return (
        <>
            <AdvancedTable data={tableData} columns={defaultColumns} enableColumnFilters={true} enableGlobalFilter={false} />
        </>
    )
}