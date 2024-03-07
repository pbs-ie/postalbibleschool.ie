import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import { router, useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import Heading1Nospace from "../Typography/Heading1Nospace";
import BasicButton from "@/Elements/Buttons/BasicButton";
import { StudentProps } from "@/Pages/TeacherHub/Classroom/Show";
import ListingTable, { TableData } from "@/Components/Tables/ListingTable";

export default function AddClassroomStudentsForm({ students }: { students: StudentProps[] }) {
    const { data, setData, get, post, processing, errors, reset } = useForm({
        classroom_id: "",
        student_id: "",
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    const getStudentList = () => {
        router.get(route('classroom.students.all'));
    }

    const tableData: TableData = {
        headings:
            <>
                <td>ID</td>
                <td>First name</td>
                <td>Last name</td>
                <td>Grade</td>
            </>,
        content: students.map(student => (
            <>
                <td> {student.id}</td>
                <td >{student.first_name} </td>
                <td> {student.last_name} </td>
                <td> {student.grade} </td>
            </>
        ))


    }

    return (
        <div>
            <Heading1Nospace>Add Students</Heading1Nospace>
            <div className="inline-flex justify-end w-full"><BasicButton size="small" onClick={() => getStudentList()}>Update student list</BasicButton></div>
            <hr className="mb-4" />
            <form name="contactUsForm" aria-label="Contact us form" onSubmit={handleSubmit} method="post">
                {students.length === 0 ?
                    <p className="text-sm">No students found</p>
                    :
                    <ListingTable tableData={tableData} />
                }
                <div className="inline-flex justify-end w-full mt-4"><PrimaryButton type="submit" className="w-1/3 md:w-1/4" processing={processing}>Submit</PrimaryButton></div>
            </form>
        </div>
    )
}