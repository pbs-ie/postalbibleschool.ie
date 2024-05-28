import InputLabel2 from "@/Elements/Forms/InputLabel2";
import TextInput from "@/Elements/Forms/TextInput";
import BasicButton from "@/Elements/Buttons/BasicButton";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import { useForm, usePage } from "@inertiajs/react"
import { FormEvent } from "react";
import Heading2Nospace from "@/Components/Typography/Heading2Nospace";

interface ClassroomProps {
    name: string
}
export default function CreateClassroomForm({ onCancel }: { onCancel: () => void }) {
    const { errors } = usePage<PassedProps>().props;
    const { data, setData, post, reset } = useForm<ClassroomProps>({
        name: ""
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
            <Heading2Nospace>Create A New Classroom</Heading2Nospace>
            <form onSubmit={handleSubmit} name="classroomCreate" aria-label="Create Classroom">
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