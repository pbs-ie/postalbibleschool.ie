import TextInput from "@/Elements/Forms/TextInput";
import InputLabel2 from "@/Elements/Forms/InputLabel2";
import InputError from "@/Elements/Forms/InputError";

import { CampSettingProps } from "@/Pages/Settings/Camp";

import { useForm } from "@inertiajs/react"
import { FormEvent } from "react";
import route from "ziggy-js";
import UpdateFormButton from "@/Elements/Buttons/UpdateFormButton";
import YesNoRadio from "@/Elements/Forms/YesNoRadio";

export default function CampSettingsForm({ campSettings }: { campSettings: Pick<CampSettingProps, "dates" | "year" | "embedLink" | "isActive"> }) {
    const defaultData = {
        "dates": campSettings.dates,
        "year": campSettings.year,
        "embedLink": campSettings.embedLink,
        "isActive": campSettings.isActive
    }
    const { data, setData, post, errors, isDirty, setDefaults } = useForm(defaultData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        switch (event.target.name) {
            case "dates":
            case "year":
            case "embedLink":
                setData(event.target.name, event.target.value);
                break;
            case "isActive":
                setData(event.target.name, Boolean(+event.target.value));
                break;
        }
    };
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('settings.camp.update'), {
            preserveScroll: true,
            onSuccess: () => setDefaults()
        });
    }
    return (
        <form name="campSettingsForm" aria-label="Camp Settings form" onSubmit={handleSubmit} method="post" className="max-w-screen-md">
            <div className="my-4 ">
                <div className="flex flex-col sm:flex-row sm:gap-2 sm:flex-wrap lg:grid lg:grid-cols-2">
                    <div className="w-fit">
                        <YesNoRadio title="Is Registration Active?" name="isActive" handleChange={handleChange} value={data.isActive ? 1 : 0} />
                        <InputError message={errors.isActive} />
                    </div>
                    <div>
                        <InputLabel2 forInput={"dates"} value={"Dates"} />
                        <TextInput name={"dates"} id={"dates"} value={data.dates + ""} handleChange={handleChange} />
                        <InputError message={errors.dates} />
                    </div>
                    <div>
                        <InputLabel2 forInput={"year"} value={"Year"} />
                        <TextInput name={"year"} id={"year"} value={data.year + ""} handleChange={handleChange} />
                        <InputError message={errors.year} />
                    </div>

                    <div>
                        <InputLabel2 forInput={"embedLink"} value={"Google Form Embed Link"} />
                        <TextInput name={"embedLink"} id={"embedLink"} value={data.embedLink} handleChange={handleChange} />
                        <InputError message={errors.embedLink} />
                    </div>

                </div>
            </div>
            <UpdateFormButton isDirty={isDirty} />
        </form>
    )
}