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

    const tableData = useMemo(() => flattenedStudentMarks, [flattenedStudentMarks]);

    const columnHelper = createColumnHelper<typeof flattenedStudentMarks[0]>();

    const defaultColumns = [
        columnHelper.accessor(row => row.name + "", {
            header: "Student",
        }), columnHelper.accessor(row => row.bibletime ?? "" + "", {
            header: "BibleTime"
        }), columnHelper.accessor(row => row.title + "", {
            header: "Title"
        }), columnHelper.accessor(row => row.progress + "", {
            header: "Progress",
            enableColumnFilter: false
        }), columnHelper.accessor(row => row.done + "", {
            header: "Done",
            enableColumnFilter: false
        }),
    ]
    return (
        <>
            <AdvancedTable data={tableData} columns={defaultColumns} enableColumnFilters={true} enableGlobalFilter={false} />
        </>
    )
}