import { useEffect, useMemo, useState } from "react";
import { router } from "@inertiajs/react";
import { ColumnDef, createColumnHelper, RowSelectionState } from "@tanstack/react-table";
import route from "ziggy-js";

import { SunscoolStudentProps } from "@/Pages/Settings/Sunscool/Index";

import AdvancedTable from "@/Components/Tables/AdvancedTable";
import CheckboxInput from "@/Components/Forms/CheckboxInput";

import BasicButton from "@/Elements/Buttons/BasicButton";

export default function StudentMarksSection({ schoolId, students }: { schoolId: number, students: SunscoolStudentProps[] }) {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    useEffect(() => {
        setRowSelection({});
    }, [students]);

    const addStudentsToDatabase = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        let idSelection = [] as typeof tableData;
        getFlattenedStudents.map((student, idx) => {
            if (rowSelection[idx])
                idSelection.push(student)
        });
        if (Object.keys(rowSelection).length > 0) {
            console.log("SELECTED IDs", idSelection);
            router.post(route('settings.sunscool.index'), {
                schoolId: schoolId,
                selectedStudents: idSelection
            });
        }
    }

    const getFlattenedStudents = useMemo(() => {
        const flattenedStudentMarks = students.flatMap((student) => {
            return student.lessons.filter((lesson) => !!lesson.bibletime).sort((a, b) => (a.bibletime < b.bibletime ? -1 : 1)).map((lesson) => {
                return {
                    name: student.name,
                    ...lesson,
                    studentId: student.id
                }
            })
        });

        const result = flattenedStudentMarks.reduce((acc, curr) => {
            let lessonCodeRegex = /([a-zA-z]\d+)-/.exec(curr.bibletime);
            let currentBibletime = lessonCodeRegex !== null ? lessonCodeRegex[1] : "";
            if (currentBibletime.startsWith("G")) {
                return acc;
            }
            const accumulatorParam = curr.name + currentBibletime + curr.level;
            if (!acc[accumulatorParam]) {
                acc[accumulatorParam] = { studentId: curr.studentId, name: curr.name, totalProgress: 0, count: 0, bibletime: currentBibletime, level: curr.level };
            }
            acc[accumulatorParam].totalProgress += curr.progress;
            acc[accumulatorParam].count += 1;
            return acc;
        }, {} as Record<string, { studentId: number, name: string, totalProgress: number, count: number, bibletime: string, level: string }>);

        const averagedProgress = Object.values(result).map((item) => ({
            studentId: item.studentId,
            name: item.name,
            totalAverage: item.totalProgress / 4,
            attemptedAverage: item.totalProgress / item.count,
            itemCount: item.count + "/4",
            bibletime: item.bibletime,
            level: item.level
        }));

        return averagedProgress;
    }, [students]);



    const tableData = useMemo(() => getFlattenedStudents, [getFlattenedStudents]);

    const columnHelper = createColumnHelper<typeof getFlattenedStudents[0]>();

    const defaultColumns = [
        columnHelper.display({
            id: 'select-col',
            header: ({ table }) => (
                <label htmlFor="checkbox-all" className="rounded hover:bg-black/10">
                    <CheckboxInput
                        id="checkbox-all"
                        isChecked={table.getIsAllRowsSelected()}
                        handleChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
                    />
                    <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                </label>
            ),
            cell: ({ row }) => (
                <label htmlFor={"checkbox-" + row.id} className="flex items-center rounded hover:bg-black/10">
                    <CheckboxInput
                        id={"checkbox-" + row.id}
                        isChecked={row.getIsSelected()}
                        handleChange={row.getToggleSelectedHandler()}
                    />
                    <label htmlFor={"checkbox-" + row.id} className="sr-only">checkbox</label>
                </label>
            ),
        }),
        columnHelper.display({
            id: "Sr",
            header: "ID.",
            cell: ({ row }) => (
                <span>{(+row.original.studentId)}</span>
            )
        }),
        columnHelper.accessor(row => row.name + "", {
            header: "Student",
        }),
        columnHelper.accessor(row => row.level + "", {
            header: "Level",
        }),
        columnHelper.accessor(row => row.bibletime ?? "", {
            header: "BibleTime"
        }),
        columnHelper.accessor(row => row.itemCount + "", {
            header: "Stories Attempted (of 4)",
            enableColumnFilter: false,
            enableSorting: false
        }),
        // columnHelper.accessor(row => Math.round(row.attemptedAverage * 100) / 100 + "", {
        //     header: "Attempted Avg (%)",
        //     enableColumnFilter: false
        // }),
        columnHelper.accessor(row => Math.round(row.totalAverage * 100) / 100 + "", {
            header: "Avg Score (%)",
            enableColumnFilter: false,
            enableSorting: false
        }),
    ]
    return (
        <>
            <div className="flex justify-end gap-2 my-2">
                <BasicButton dataTest="add_results_fm_button" processing={rowSelection && Object.keys(rowSelection).length === 0} hierarchy="primary" onClick={addStudentsToDatabase}>Add Students</BasicButton>
            </div>
            <AdvancedTable
                data={tableData}
                columns={defaultColumns as ColumnDef<typeof getFlattenedStudents[0]>[]}
                enableColumnFilters={true}
                enableGlobalFilter={false}
                enableRowSelection={true}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
            />
        </>
    )
}