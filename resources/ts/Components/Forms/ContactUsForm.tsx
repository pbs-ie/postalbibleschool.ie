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
        <div className="block py-6 text-left bg-white rounded-lg">
            <form onSubmit={handleSubmit} method="post" className="max-w-screen-md">
                <TextInput id="name" type="hidden" name="name" value={data.name} className="" autoComplete="off" handleChange={handleChange}></TextInput>
                <div className="mb-6">
                    <InputLabel forInput="contactName" value="Name" required />
                    <TextInput
                        id="contactName"
                        type="text"
                        name="contactName"
                        value={data.contactName}
                        className="block w-full mt-1"
                        autoComplete="off"
                        handleChange={handleChange}
                        required
                    />
                    <InputError message={errors.contactName} className="mt-2" />

                </div>
                <div className="mb-6">
                    <InputLabel forInput="contactEmail" value="Email" required />
                    <TextInput
                        id="contactEmail"
                        type="email"
                        name="contactEmail"
                        value={data.contactEmail}
                        className="block w-full mt-1"
                        autoComplete="email"
                        handleChange={handleChange}
                        required
                    />
                    <InputError message={errors.contactEmail} className="mt-2" />
                </div>
                <div className="mb-6">
                    <InputLabel forInput="contactDescription" value="Message" required />
                    <TextAreaInput
                        id="contactDescription"
                        name="contactDescription"
                        value={data.contactDescription}
                        className="block w-full mt-1"
                        rows={4}
                        handleChange={handleChange}
                        required
                    />
                    <InputError message={errors.contactDescription} className="mt-2" />
                </div>
                <div className="inline-flex justify-end w-full"><PrimaryButton type="submit" className="w-1/3 md:w-1/4" processing={processing}>Submit</PrimaryButton></div>
            </form>
        </div>
    )
}