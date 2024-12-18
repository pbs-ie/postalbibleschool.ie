import { useForm, usePage } from "@inertiajs/react"
import { FormEvent } from "react";
import route from "ziggy-js";

import InputLabel2 from "@/Elements/Forms/InputLabel2";
import TextInput from "@/Elements/Forms/TextInput";
import BasicButton from "@/Elements/Buttons/BasicButton";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";

import Heading2Alt from "@/Components/Typography/Heading2Alt";

interface ClassroomProps {
    name: string,
    email: string
}
export default function CreateClassroomForm({ onCancel, schoolEmail = "" }: { onCancel: () => void, schoolEmail?: string }) {
    const { errors } = usePage<PassedProps>().props;
    const { data, setData, post, reset } = useForm<ClassroomProps>({
        name: "",
        email: schoolEmail
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        reset();
        onCancel();
        post(route('classroom.store'), {
            preserveScroll: true
        });
    }

    return (
        <>
            <Heading2Alt isTitlecase>Create A New Classroom</Heading2Alt>
            <form className="mt-10 mb-5" onSubmit={handleSubmit} name="classroomCreate" aria-label="Create Classroom">
                <div>
                    <InputLabel2 forInput="classroomName" value="Classroom Name" />
                    <TextInput
                        placeholder="Name your classroom"
                        id="classroomName"
                        name="classroomName"
                        value={data.name}
                        className="block w-full mt-1"
                        handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('name', e.target.value)}
                    />
                    {errors && errors.name &&
                        <p className="text-red-500">{errors.name}</p>
                    }
                </div>
                <div className="inline-flex justify-center w-full gap-2 mt-5 md:justify-end">
                    <BasicButton dataTest="classroom_cancel_button" type="button" hierarchy="secondary" formMethod="dialog" onClick={onCancel}>Cancel</BasicButton>
                    <PrimaryButton type="submit">Create</PrimaryButton>
                </div>
            </form>
        </>
    )
}