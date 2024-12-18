import AddClassroomStudentsForm from "@/Components/Forms/AddClassroomStudentsForm"
import CheckboxInput from "@/Elements/Forms/CheckboxInput"
import PopupModal from "@/Components/Modals/PopupModal"
import AdvancedTable from "@/Components/Tables/AdvancedTable"
import Heading2Nospace from "@/Components/Typography/Heading2Nospace"
import BasicButton from "@/Elements/Buttons/BasicButton"
import ButtonLink from "@/Elements/Buttons/ButtonLink"
import ChevronLeft from "@/Elements/Icons/ChevronLeft"
import SidebarLayout from "@/Layouts/SidebarLayout"
import TwoColumnLayout from "@/Layouts/TwoColumnLayout"
import WrapperLayout from "@/Layouts/WrapperLayout"
import { modalHelper } from "@/helper"
import { router } from "@inertiajs/react"
import { ColumnDef, RowSelectionState, createColumnHelper } from "@tanstack/react-table"
import { useEffect, useMemo, useState } from "react"
import AddClassroomCurriculumForm from "@/Components/Forms/AddClassroomCurriculumForm"
import ClassroomCurriculumCard from "@/Components/Cards/ClassroomCurriculumCard"
import { StudentProps } from "@/Pages/TeacherHub/Student/Index";
import Heading1 from "@/Components/Typography/Heading1"
import route from "ziggy-js";


interface ClassroomShowProps {
    classroom: ClassroomProps,
    students: StudentProps[],
    allStudents: StudentProps[],
    curricula?: CurriculumProps[]
    classCurriculum?: CurriculumProps
}

export default function Show({
    classroom,
    students = [],
    allStudents = [],
    curricula = [],
    classCurriculum
}: ClassroomShowProps) {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const { dialogRef: addStudentsDialogRef, showModal: showStudentModal, closeModal: closeStudentModal } = modalHelper();
    const { dialogRef: addCurriculumDialogRef, showModal: showCurriculumModal, closeModal: closeCurriculumModal } = modalHelper();


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
    ];


    const getRemainingStudents = () => {
        return allStudents.filter((student) => {
            return student.classroom_id === null
        })
    }

    return (
        <WrapperLayout>
            <PopupModal onClose={closeStudentModal} size="large" innerRef={addStudentsDialogRef}>
                <AddClassroomStudentsForm onClose={closeStudentModal} classroomId={classroom.id} students={getRemainingStudents()} />
            </PopupModal>

            <PopupModal onClose={closeCurriculumModal} size="large" innerRef={addCurriculumDialogRef}>
                <AddClassroomCurriculumForm onClose={closeCurriculumModal} classroomId={classroom.id} curricula={curricula} />
            </PopupModal>

            <ButtonLink hierarchy="transparent" href={route('dashboard')}><span className="flex items-center gap-2">
                <ChevronLeft />{"Back to Hub"}
            </span></ButtonLink>
            <SidebarLayout>
                <div></div>
                <TwoColumnLayout>
                    <div className="mx-2">
                        <Heading1>My classroom</Heading1>
                        <p className="my-4">Add student names here that should follow the curriculum set for this classroom. These students will be added to our digital app.</p>
                        <form id="classroom_student_list" className="my-10" onSubmit={removeStudentsFromClass}>
                            <Heading2Nospace>{classroom.name}</Heading2Nospace>
                            <div className="my-5">
                                {students.length === 0 ?
                                    <p className="italic text-gray-500">No students added. Add students by clicking the button below.</p>
                                    :
                                    <AdvancedTable
                                        data={tableDataMemo}
                                        columns={defaultColumns as ColumnDef<StudentProps>[]}
                                        enableGlobalFilter={true}
                                        enableRowSelection={true}
                                        rowSelection={rowSelection}
                                        setRowSelection={setRowSelection} />
                                }
                            </div>
                            <div className="flex justify-end w-full gap-2">
                                <BasicButton dataTest="classroom_add_students_button" onClick={() => showStudentModal()}>Add Students</BasicButton>
                                <BasicButton dataTest="classroom_remove_students_button" processing={rowSelection && Object.keys(rowSelection).length === 0} hierarchy="secondary" type="submit">Remove Students</BasicButton>
                            </div>
                        </form>
                    </div>
                    <ClassroomCurriculumCard classCurriculum={classCurriculum} showCurriculumModal={showCurriculumModal} />
                </TwoColumnLayout>
            </SidebarLayout>
        </WrapperLayout>
    )
}