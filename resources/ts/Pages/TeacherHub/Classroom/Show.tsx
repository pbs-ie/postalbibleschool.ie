import AddClassroomStudentsForm from "@/Components/Forms/AddClassroomStudentsForm"
import CheckboxInput from "@/Components/Forms/CheckboxInput"
import PopupModal from "@/Components/Modals/PopupModal"
import AdvancedTable from "@/Components/Tables/AdvancedTable"
import Heading1Nospace from "@/Components/Typography/Heading1Nospace"
import Heading2Nospace from "@/Components/Typography/Heading2Nospace"
import BasicButton from "@/Elements/Buttons/BasicButton"
import ButtonLink from "@/Elements/Buttons/ButtonLink"
import PrimaryButton from "@/Elements/Buttons/PrimaryButton"
import ChevronLeft from "@/Elements/Icons/ChevronLeft"
import SidebarLayout from "@/Layouts/SidebarLayout"
import TwoColumnLayout from "@/Layouts/TwoColumnLayout"
import WrapperLayout from "@/Layouts/WrapperLayout"
import { modalHelper } from "@/helper"
import { router, useForm } from "@inertiajs/react"
import { RowSelectionState, createColumnHelper } from "@tanstack/react-table"
import { useEffect, useMemo, useRef, useState } from "react"
import AddClassroomCurriculumForm from "@/Components/Forms/AddClassroomCurriculumForm"
import { monthMap, monthNames } from "@/constants"

export interface StudentProps {
    classroom_id: number,
    fm_student_id: string,
    first_name: string,
    last_name: string,
    area_code: string,
    grade: string,
    id: number
}
interface ClassroomShowProps {
    classroom: ClassroomProps,
    students: StudentProps[],
    allStudents: StudentProps[],
    curricula?: CurriculumProps[]
    classCurriculum?: CurriculumProps
}
type CreateCurriculumProps = Omit<CurriculumProps, "id" | "digital_count">;
type MonthKeys = keyof Omit<CreateCurriculumProps, "name" | "email" | "curriculum_type">;



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


    const getRemainingStudents = () => {
        return allStudents.filter((student) => {
            return student.classroom_id === null
        })
    }

    return (
        <WrapperLayout>
            <PopupModal size="large" innerRef={addStudentsDialogRef}>
                <AddClassroomStudentsForm onClose={closeStudentModal} classroomId={classroom.id} students={getRemainingStudents()} />
            </PopupModal>
            <PopupModal innerRef={addCurriculumDialogRef}>
                <AddClassroomCurriculumForm onClose={closeCurriculumModal} classroomId={classroom.id} curricula={curricula} />
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
                                <BasicButton onClick={() => showStudentModal()}>Add Students</BasicButton>
                                <BasicButton processing={rowSelection && Object.keys(rowSelection).length === 0} hierarchy="secondary" type="submit">Remove Students</BasicButton>
                            </div>
                        </form>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Heading2Nospace>Curriculum</Heading2Nospace>
                        <p>Curriculum name : {classCurriculum?.name}</p>
                        <div>
                            {classCurriculum && [...monthMap.keys()].map((month) => (
                                <div key={month} className="grid grid-cols-[1fr_2fr] items-center gap-2">
                                    <div className="inline-block capitalize p-2 text-base rounded bg-sky-100 font-medium md:text-base mb-px text-slate-700">
                                        {monthNames[monthMap.get(month) ?? 0]}
                                    </div>
                                    <div className="border-gray-400 bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm transition ease-in-out text-gray-700 focus-within:text-inherit">
                                        {classCurriculum[month]}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <PrimaryButton dataTest="add_curriculum_btn" onClick={() => showCurriculumModal()}>Select Curriculum for classroom</PrimaryButton>
                    </div>
                </TwoColumnLayout>
            </SidebarLayout>
        </WrapperLayout>
    )
}