import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import { router } from "@inertiajs/react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import BasicButton from "@/Elements/Buttons/BasicButton";
import { StudentProps } from "@/Pages/TeacherHub/Classroom/Show";
import CheckboxInput from "./CheckboxInput";
import { RowSelectionState, createColumnHelper } from "@tanstack/react-table";
import AdvancedTable from "@/Components/Tables/AdvancedTable";
import Heading2Nospace from "@/Components/Typography/Heading2Nospace";
import RefreshIcon from "@/Elements/Icons/RefreshIcon";

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
        router.get(route('classroom.students.all'));
    }

    const tableDataMemo = useMemo(() => students, [students]);

    const columnHelper = createColumnHelper<StudentProps>();

    const defaultColumns = [
        columnHelper.display({
            id: 'select-col',
            header: ({ table }) => (
                <label htmlFor="checkbox-all" className="hover:bg-black/10 rounded">
                    <CheckboxInput
                        id="checkbox-all"
                        isChecked={table.getIsAllRowsSelected()}
                        handleChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
                    />
                    <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                </label>
            ),
            cell: ({ row }) => (
                <label htmlFor={"checkbox" + row.original.id} className="flex items-center hover:bg-black/10 rounded">
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
    ];

    return (
        <article>
            <Heading2Nospace>Add Students</Heading2Nospace>
            <div className="inline-flex justify-end w-full"><BasicButton size="small" onClick={() => getStudentList()}><span className="flex gap-3 items-center">Refresh List <RefreshIcon /></span></BasicButton></div>
            <hr className="mb-4 mt-2" />
            <form name="addStudentForm" aria-label="Add Student to Classroom form" onSubmit={handleSubmit} method="post">
                <div>
                    {students.length === 0 ?
                        <p className="text-sm">No students found</p>
                        :
                        <AdvancedTable data={tableDataMemo} columns={defaultColumns} searchPlaceholder="Search by Name or Grade" enableRowSelection={true} rowSelection={rowSelection} setRowSelection={setRowSelection} />
                    }
                </div>
                <div className="inline-flex justify-end w-full mt-4"><PrimaryButton processing={Object.keys(rowSelection).length === 0} type="submit">Submit</PrimaryButton></div>
            </form>
        </article>
    )
}