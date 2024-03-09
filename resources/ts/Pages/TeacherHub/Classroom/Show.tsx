import AddClassroomStudentsForm from "@/Components/Forms/AddClassroomStudentsForm"
import CheckboxInput from "@/Components/Forms/CheckboxInput"
import PopupModal from "@/Components/Modals/PopupModal"
import AdvancedTable from "@/Components/Tables/AdvancedTable"
import Heading1Nospace from "@/Components/Typography/Heading1Nospace"
import Heading2Nospace from "@/Components/Typography/Heading2Nospace"
import BasicButton from "@/Elements/Buttons/BasicButton"
import ButtonLink from "@/Elements/Buttons/ButtonLink"
import ChevronLeft from "@/Elements/Icons/ChevronLeft"
import SidebarLayout from "@/Layouts/SidebarLayout"
import TwoColumnLayout from "@/Layouts/TwoColumnLayout"
import WrapperLayout from "@/Layouts/WrapperLayout"
import { modalHelper } from "@/helper"
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
    const { dialogRef, showModal, closeModal } = modalHelper();


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
        if (Object.keys(rowSelection).length !== 0) {
            router.post(route('classroom.students.destroy'), {
                selectedStudentsId: idSelection
            });
        }
    }



    const tableDataMemo = useMemo(() => students, [students]);

    const columnHelper = createColumnHelper<StudentProps>();

    const defaultColumns = [
        columnHelper.display({
            id: 'select-col',
            header: ({ table }) => (
                <div>
                    <CheckboxInput
                        id="checkbox-all"
                        isChecked={table.getIsAllRowsSelected()}
                        handleChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
                    />
                    <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center">
                    <CheckboxInput
                        id={"checkbox" + row.original.id}
                        isChecked={row.getIsSelected()}
                        handleChange={row.getToggleSelectedHandler()}
                    />
                    <label htmlFor={"checkbox" + row.original.id} className="sr-only">checkbox</label>
                </div>
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
            return student.classroom_id === null
        })
    }

    return (
        <WrapperLayout>
            <PopupModal size="large" innerRef={dialogRef}>
                <AddClassroomStudentsForm onClose={closeModal} classroomId={classroom.id} students={getRemainingStudents()} />
            </PopupModal>
            <ButtonLink hierarchy="transparent" href={route('dashboard')}><span className="flex items-center gap-2">
                <ChevronLeft />{"Back to Hub"}
            </span></ButtonLink>
            <SidebarLayout>
                <div></div>
                <TwoColumnLayout>
                    <div>
                        <Heading1Nospace>{classroom.name}</Heading1Nospace>
                        <form className="my-10" onSubmit={removeStudentsFromClass}>
                            <Heading2Nospace>My classroom</Heading2Nospace>
                            <div className="my-5">
                                {students.length === 0 ?
                                    <p className="text-sm">No students added</p>
                                    :
                                    <AdvancedTable
                                        data={tableDataMemo}
                                        columns={defaultColumns}
                                        enableGlobalFilter={false}
                                        enableRowSelection={true}
                                        rowSelection={rowSelection}
                                        setRowSelection={setRowSelection} />
                                }
                            </div>
                            <div className="flex gap-2 w-full justify-end">
                                <BasicButton onClick={() => showModal()}>Add Students</BasicButton>
                                <BasicButton processing={rowSelection && Object.keys(rowSelection).length === 0} hierarchy="secondary" type="submit">Remove Students</BasicButton>
                            </div>
                        </form>
                    </div>
                </TwoColumnLayout>
            </SidebarLayout>
        </WrapperLayout>
    )
}