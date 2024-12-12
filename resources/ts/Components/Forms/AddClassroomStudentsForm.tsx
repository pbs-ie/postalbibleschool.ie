import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import { router } from "@inertiajs/react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import BasicButton from "@/Elements/Buttons/BasicButton";
import CheckboxInput from "@/Elements/Forms/CheckboxInput";
import { ColumnDef, RowSelectionState, createColumnHelper } from "@tanstack/react-table";
import AdvancedTable from "@/Components/Tables/AdvancedTable";
import Heading2Nospace from "@/Components/Typography/Heading2Nospace";
import RefreshIcon from "@/Elements/Icons/RefreshIcon";
import { StudentProps } from "@/Pages/TeacherHub/Student/Index";
import route from "ziggy-js";

export default function AddClassroomStudentsForm({ onClose, classroomId, students }: { onClose: () => void, classroomId: number, students: StudentProps[] }) {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onClose();
        let idSelection = [] as number[];
        students.map((student, idx) => {
            if (rowSelection[idx])
                idSelection.push(student.id)
        });
        router.post(route('classroom.students.store'), {
            classroomId: classroomId,
            selectedStudentsId: idSelection
        });
    }

    useEffect(() => {
        setRowSelection({})
    }, [students]);

    const getStudentList = () => {
        onClose();
        router.get(route('students.all'));
    }

    const tableDataMemo = useMemo(() => students, [students]);

    const columnHelper = createColumnHelper<StudentProps>();

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
                <label htmlFor={"checkbox" + row.original.id} className="flex items-center rounded hover:bg-black/10">
                    <CheckboxInput
                        id={"checkbox" + row.original.id}
                        isChecked={row.getIsSelected()}
                        handleChange={row.getToggleSelectedHandler()}
                    />
                    <label htmlFor={"checkbox" + row.original.id} className="sr-only">checkbox</label>
                </label>
            ),
        }),
        columnHelper.accessor(row => row.first_name, {
            header: "First Name"
        }),
        columnHelper.accessor(row => row.last_name, {
            header: "Last Name"
        }),
        columnHelper.accessor(row => row.grade, {
            header: "Grade"
        })
    ] as ColumnDef<StudentProps>[];

    return (
        <article>
            <Heading2Nospace>Add Students</Heading2Nospace>
            <div className="inline-flex justify-end w-full"><BasicButton size="small" onClick={() => getStudentList()}><span className="flex items-center gap-3">Refresh List <RefreshIcon /></span></BasicButton></div>
            <hr className="mt-2 mb-4" />
            <form id="add_classroom_students_form" name="addStudentForm" aria-label="Add Student to Classroom form" onSubmit={handleSubmit} method="post">
                <div>
                    {students.length === 0 ?
                        <p className="text-sm">No students found</p>
                        :
                        <AdvancedTable data={tableDataMemo} columns={defaultColumns} enableGlobalFilter={false} enableRowSelection={true} rowSelection={rowSelection} setRowSelection={setRowSelection} />
                    }
                </div>
                <div className="inline-flex justify-end w-full mt-4"><PrimaryButton processing={Object.keys(rowSelection).length === 0} type="submit">Add</PrimaryButton></div>
            </form>
        </article>
    )
}