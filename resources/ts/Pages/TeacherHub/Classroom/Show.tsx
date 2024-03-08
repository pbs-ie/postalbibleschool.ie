import AddClassroomStudentsForm from "@/Components/Forms/AddClassroomStudentsForm"
import CheckboxInput from "@/Components/Forms/CheckboxInput"
import PopupModal from "@/Components/Modals/PopupModal"
import AdvancedTable from "@/Components/Tables/AdvancedTable"
import Heading1Nospace from "@/Components/Typography/Heading1Nospace"
import BasicButton from "@/Elements/Buttons/BasicButton"
import ButtonLink from "@/Elements/Buttons/ButtonLink"
import ChevronLeft from "@/Elements/Icons/ChevronLeft"
import SidebarLayout from "@/Layouts/SidebarLayout"
import TwoColumnLayout from "@/Layouts/TwoColumnLayout"
import WrapperLayout from "@/Layouts/WrapperLayout"
import { router, useForm } from "@inertiajs/react"
import { RowSelectionState, createColumnHelper } from "@tanstack/react-table"
import { useEffect, useMemo, useRef, useState } from "react"

export interface StudentProps {
    classroom_id: number,
    fm_student_id: string,
    first_name: string,
    last_name: string,
    area_code: string,
    grade: string,
    id: number
}

export default function Show({ classroom, students = [], allStudents = [] }: { classroom: ClassroomProps, students: StudentProps[], allStudents: StudentProps[] }) {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const dialogRef = useRef<HTMLDialogElement>(null);

    const showStudentListModal = () => {
        dialogRef.current?.showModal();
    }

    const closeStudentListModal = () => {
        dialogRef.current?.close();
    }

    useEffect(() => {
        setRowSelection({});
    }, [students]);

    const removeStudentsFromClass = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        let idSelection = [] as number[];
        students.map((student, idx) => {
            if (rowSelection[idx])
                idSelection.push(student.id)
        });
        router.post(route('classroom.students.destroy'), {
            selectedStudentsId: idSelection
        });
    }



    const tableDataMemo = useMemo(() => students, [students]);

    const columnHelper = createColumnHelper<StudentProps>();

    const defaultColumns = [
        columnHelper.display({
            id: 'select-col',
            header: ({ table }) => (
                <CheckboxInput
                    id="select-all"
                    isChecked={table.getIsAllRowsSelected()}
                    handleChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
                />
            ),
            cell: ({ row }) => (
                <CheckboxInput
                    id={"select" + row.original.id}
                    isChecked={row.getIsSelected()}
                    handleChange={row.getToggleSelectedHandler()}
                />
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


    const getRemainingStudents = () => {
        return allStudents.filter((student) => {
            return student.classroom_id !== classroom.id
        })
    }

    return (
        <WrapperLayout>
            <PopupModal innerRef={dialogRef}>
                <AddClassroomStudentsForm onClose={closeStudentListModal} classroomId={classroom.id} students={getRemainingStudents()} />
            </PopupModal>
            <ButtonLink hierarchy="transparent" href={route('dashboard')}><span className="flex items-center gap-2">
                <ChevronLeft />{"Back to Hub"}
            </span></ButtonLink>
            <SidebarLayout>
                <div></div>
                <TwoColumnLayout>
                    <form className="" onSubmit={removeStudentsFromClass}>
                        <Heading1Nospace>{classroom.name}</Heading1Nospace>
                        <div className="my-10">
                            {students.length === 0 ?
                                <p className="text-sm">No students added</p>
                                :
                                <AdvancedTable data={tableDataMemo} columns={defaultColumns} enableRowSelection={true} rowSelection={rowSelection} setRowSelection={setRowSelection} />
                            }
                        </div>
                        <BasicButton onClick={() => showStudentListModal()}>Add Students</BasicButton>
                        <BasicButton hierarchy="secondary" type="submit">Remove Students</BasicButton>
                    </form>
                </TwoColumnLayout>
            </SidebarLayout>
        </WrapperLayout>
    )
}