import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import { router, useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import Heading1Nospace from "../Typography/Heading1Nospace";
import BasicButton from "@/Elements/Buttons/BasicButton";
import { StudentProps } from "@/Pages/TeacherHub/Classroom/Show";

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

    return (
        <div>
            <Heading1Nospace>Add Students</Heading1Nospace>
            <div className="inline-flex justify-end w-full"><BasicButton size="small" onClick={() => getStudentList()}>Update student list</BasicButton></div>
            <hr className="mb-4" />
            <form name="contactUsForm" aria-label="Contact us form" onSubmit={handleSubmit} method="post">
                {students.length === 0 ?
                    <p className="text-sm">No students found</p>
                    :
                    students.map(student => (
                        <div key={student.first_name} className="flex items-center gap-2">
                            {student.first_name}
                        </div>
                    ))
                }
                <div className="inline-flex justify-end w-full mt-4"><PrimaryButton type="submit" className="w-1/3 md:w-1/4" processing={processing}>Submit</PrimaryButton></div>
            </form>
        </div>
    )
}