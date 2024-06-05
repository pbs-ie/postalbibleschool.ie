import { useForm } from "@inertiajs/react";
import React, { FormEvent, useEffect } from "react";

import InputError from "@/Elements/Forms/InputError";
import InputLabel from "@/Elements/Forms/InputLabel";
import TextAreaInput from "@/Elements/Forms/TextAreaInput";
import TextInput from "@/Elements/Forms/TextInput";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import route from "ziggy-js";

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


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case "name":
            case "contactName":
            case "contactEmail":
            case "contactDescription":
                setData(event.target.name, event.target.value);

        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('contactus.store'));
    }
    return (
        <div className="block pt-4 text-left bg-white">
            <form name="contactUsForm" aria-label="Contact us form" onSubmit={handleSubmit} method="post" className="max-w-screen-md">
                <TextInput id="name" type="hidden" name="name" value={data.name} className="" autoComplete="off" handleChange={handleChange}></TextInput>
                <div className="flex gap-2 mb-2">
                    <InputLabel className="text-center basis-1/4" forInput="contactName" value="Name" required />
                    <TextInput
                        id="contactName"
                        type="text"
                        name="contactName"
                        value={data.contactName}
                        className="basis-3/4"
                        autoComplete="off"
                        handleChange={handleChange}
                        required
                    />
                    <InputError message={errors.contactName} className="mt-2" />

                </div>
                <div className="flex gap-2 mb-2">
                    <InputLabel className="text-center basis-1/4" forInput="contactEmail" value="Email" required />
                    <TextInput
                        id="contactEmail"
                        type="email"
                        name="contactEmail"
                        value={data.contactEmail}
                        className="basis-3/4"
                        autoComplete="email"
                        handleChange={handleChange}
                        required
                    />
                    <InputError message={errors.contactEmail} className="mt-2" />
                </div>
                <div className="flex items-start gap-2 mb-2">
                    <InputLabel className="text-center basis-1/4" forInput="contactDescription" value="Message" required />
                    <TextAreaInput
                        id="contactDescription"
                        name="contactDescription"
                        value={data.contactDescription}
                        className="w-full basis-3/4"
                        rows={4}
                        handleChange={handleChange}
                        required
                    />
                    <InputError message={errors.contactDescription} className="mt-2" />
                </div>
                <div className="inline-flex justify-end w-full mt-4"><PrimaryButton type="submit" processing={processing}>Submit</PrimaryButton></div>
            </form>
        </div>
    )
}