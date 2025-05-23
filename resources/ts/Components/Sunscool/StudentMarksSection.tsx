import { useEffect, useMemo, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { ColumnDef, createColumnHelper, RowSelectionState } from "@tanstack/react-table";
import route from "ziggy-js";
import _ from "lodash";

import { SunscoolStudentProps } from "@/Pages/Settings/Sunscool/Index";

import AdvancedTable from "@/Components/Tables/AdvancedTable";
import CheckboxInput from "@/Elements/Forms/CheckboxInput";
import ErrorBanner from "@/Components/Forms/ErrorBanner";

import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import SecondaryButton from "@/Elements/Buttons/SecondaryButton";
import Download from "@/Elements/Icons/Download";
import ListBulletIcon from "@/Elements/Icons/ListBulletIcon";
import AnchorLink from "@/Components/Navigation/AnchorLink";

export default function StudentMarksSection({ schoolId, classroomId, students, setShowProcessed }: { schoolId: number, classroomId: number, students: SunscoolStudentProps[], setShowProcessed: React.Dispatch<React.SetStateAction<number>> }) {
    const { errors } = usePage().props;
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    useEffect(() => {
        setRowSelection({});
    }, [students]);


    const processStudents = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        let idSelection = [] as typeof tableData[0][];
        students.map((student, idx) => {
            if (rowSelection[idx])
                idSelection.push(student)
        });
        if (Object.keys(rowSelection).length > 0) {
            const formData = new FormData();

            idSelection.forEach((student, index) => {
                formData.append(`selectedStudents[${index}][bibletime]`, student.bibletime);
                formData.append(`selectedStudents[${index}][name]`, student.name);
                formData.append(`selectedStudents[${index}][level]`, student.level + "");
                formData.append(`selectedStudents[${index}][pbsId]`, student.pbsId + "");
                formData.append(`selectedStudents[${index}][sunscoolId]`, student.sunscoolId + "");
                formData.append(`selectedStudents[${index}][progress]`, student.progress + "");
            })
            router.post(route('settings.sunscool.process', { schoolId: schoolId, classroomId: classroomId }), formData);
        }
    }

    const markStudentsUnprocessed = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        let idSelection = [] as typeof tableData[0][];
        students.map((student, idx) => {
            if (rowSelection[idx])
                idSelection.push(student)
        });
        if (Object.keys(rowSelection).length > 0) {
            const formData = new FormData();

            idSelection.forEach((student, index) => {
                formData.append(`selectedStudents[${index}][bibletime]`, student.bibletime);
                formData.append(`selectedStudents[${index}][name]`, student.name);
                formData.append(`selectedStudents[${index}][level]`, student.level + "");
                formData.append(`selectedStudents[${index}][pbsId]`, student.pbsId + "");
                formData.append(`selectedStudents[${index}][sunscoolId]`, student.sunscoolId + "");
            })
            router.post(route('settings.sunscool.unprocessed.mark'), formData, {
                onSuccess: () => {
                    setRowSelection({})
                    setShowProcessed(0)
                }
            });
        }
    }

    const tableData = useMemo(() => students, [students]);

    const columnHelper = createColumnHelper<typeof students[0]>();

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
        // columnHelper.display({
        //     id: "Sr",
        //     header: "Sunscool ID",
        //     cell: ({ row }) => (
        //         <span>{(row.original.sunscoolId)}</span>
        //     )
        // }),
        columnHelper.display({
            id: "pbsid",
            header: "PBS ID",
            cell: ({ row }) => (
                <span>{(row.original.pbsId ?? "-")}</span>
            )
        }),
        columnHelper.accessor(row => row.name + "", {
            id: "student",
            header: "Student"
        }),
        columnHelper.accessor(row => row.bibletime + "", {
            header: "Bibletime"
        }),
        columnHelper.accessor(row => row.level + "", {
            header: "Level"
        }),
        columnHelper.accessor(row => row.progress, {
            header: "Grade"
        }),
        columnHelper.accessor(row => row.isProcessed, {
            header: "Is Processed",
            enableColumnFilter: false
        })
    ]



    return (
        <>
            <div className="space-y-2">
                {errors &&
                    Object.keys(errors).map((key) =>
                        <ErrorBanner key={key} message={errors[key]} />
                    )
                }
            </div>
            <AdvancedTable
                data={tableData}
                columns={defaultColumns as ColumnDef<SunscoolStudentProps>[]}
                enableColumnFilters={true}
                enableGlobalFilter={false}
                enableRowSelection={true}
                enableSorting={false}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
                getRowClassNames={(row) => {
                    if (row.original.isProcessed === true)
                        return "bg-emerald-100 hover:bg-emerald-200"
                    return ""
                }}
            />
            {students.length > 0 &&
                <div>
                    <AnchorLink Icon={ListBulletIcon} href={route('settings.sunscool.classroom.exportNames', { schoolId: schoolId, classroomId: classroomId })}>Download names list (.xlsx)</AnchorLink>
                    <AnchorLink Icon={Download} href={route('settings.sunscool.classroom.export', { schoolId: schoolId, classroomId: classroomId })}>Download classroom details (.xlsx)</AnchorLink>
                </div>
            }
            <div className="flex justify-end gap-2 my-2">

                <SecondaryButton processing={rowSelection && Object.keys(rowSelection).length === 0} onClick={markStudentsUnprocessed}>Mark Unprocessed</SecondaryButton>
                <PrimaryButton processing={rowSelection && Object.keys(rowSelection).length === 0} onClick={processStudents}>Process Students</PrimaryButton>
            </div>
        </>
    )
}