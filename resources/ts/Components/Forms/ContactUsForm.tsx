import { useForm } from "@inertiajs/inertia-react";
import { FormEvent, useEffect } from "react";

import InputError from "@/Components/Forms/InputError";
import InputLabel from "@/Components/Forms/InputLabel";
import TextAreaInput from "@/Components/Forms/TextAreaInput";
import TextInput from "@/Components/Forms/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";

declare function route(name?: string, params?: any): any;

export default function ContactUsForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        contactName: "",
        contactEmail: "",
        contactDescription: ""
    });

    useEffect(() => {
        reset();
    }, [])


    const handleChange = (event: any) => {
        setData(event.target.name, event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('contactus'));
    }
    return (
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
            <form onSubmit={handleSubmit} method="post">
                <TextInput id="name" type="hidden" name="name" value={data.name} className="" autoComplete="off" handleChange={handleChange}></TextInput>
                <div className="mb-6">
                    <InputLabel forInput="contactName" value="Name" />
                    <TextInput
                        id="contactName"
                        type="text"
                        name="contactName"
                        value={data.contactName}
                        className="mt-1 block w-full"
                        autoComplete="off"
                        handleChange={handleChange}
                        required
                    />
                    <InputError message={errors.contactName} className="mt-2" />

                </div>
                <div className="mb-6 mb-6">
                    <InputLabel forInput="contactEmail" value="Email" />
                    <TextInput
                        id="contactEmail"
                        type="email"
                        name="contactEmail"
                        value={data.contactEmail}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        handleChange={handleChange}
                        required
                    />
                    <InputError message={errors.contactEmail} className="mt-2" />
                </div>
                <div className="mb-6 mb-6">
                    <InputLabel forInput="contactDescription" value="Description" />
                    <TextAreaInput
                        id="contactDescription"
                        name="contactDescription"
                        value={data.contactDescription}
                        className="mt-1 block w-full"
                        rows={3}
                        handleChange={handleChange}
                        required
                    />
                    <InputError message={errors.contactDescription} className="mt-2" />
                </div>
                <div className="w-full inline-flex justify-end"><PrimaryButton type="submit" className="w-1/3 md:w-1/4" processing={processing}>Submit</PrimaryButton></div>
            </form>
        </div>
    )
}