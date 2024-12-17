import TextInput from "@/Elements/Forms/TextInput";
import InputLabel2 from "@/Elements/Forms/InputLabel2";
import InputError from "@/Elements/Forms/InputError";

import { CampSettingProps } from "@/Pages/Settings/Camp";

import { useForm } from "@inertiajs/react"
import { FormEvent } from "react";
import route from "ziggy-js";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import UpdateFormButton from "@/Elements/Buttons/UpdateFormButton";
import YesNoRadio from "@/Elements/Forms/YesNoRadio";

export default function ReunionSettingsForm({ campSettings }: { campSettings: Pick<CampSettingProps, 'reunionDates' | 'reunionIsActive' | 'reunionFormEmbedLink'> }) {
    const defaultData = {
        "reunionDates": campSettings.reunionDates,
        "reunionIsActive": campSettings.reunionIsActive,
        "reunionFormEmbedLink": campSettings.reunionFormEmbedLink
    }
    const { data, setData, post, errors, isDirty } = useForm(defaultData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        switch (event.target.name) {
            case "reunionDates":
            case "reunionFormEmbedLink":
                setData(event.target.name, event.target.value);
                break;
            case "reunionIsActive":
                setData(event.target.name, Boolean(+event.target.value));
                break;
        }
    };
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('settings.camp.reunion.update'), {
            preserveScroll: true
        });
    }
    return (
        <form name="reunionSettingsForm" aria-label="Camp Reunion Settings form" onSubmit={handleSubmit} method="post" className="max-w-screen-md mt-4">
            <Heading2Alt>Reunion Settings</Heading2Alt>
            <hr />
            <div className="my-4 ">
                <div className="flex flex-col sm:flex-row sm:gap-2 sm:flex-wrap lg:grid lg:grid-cols-2 ">
                    <div className="w-fit">
                        <YesNoRadio title="Is Registration Active?" name="reunionIsActive" handleChange={handleChange} value={data.reunionIsActive ? 1 : 0} />
                        <InputError message={errors.reunionIsActive} />
                    </div>
                    <div>
                        <InputLabel2 forInput={"reunionDates"} value={"Dates"} />
                        <TextInput name={"reunionDates"} id={"reunionDates"} value={data.reunionDates + ""} handleChange={handleChange} />
                        <InputError message={errors.reunionDates} />
                    </div>

                    <div>
                        <InputLabel2 forInput={"reunionFormEmbedLink"} value={"Google Form Embed Link"} />
                        <TextInput name={"reunionFormEmbedLink"} id={"reunionFormEmbedLink"} value={data.reunionFormEmbedLink} handleChange={handleChange} />
                        <InputError message={errors.reunionFormEmbedLink} />
                    </div>
                </div>
            </div>
            <UpdateFormButton isDirty={isDirty} />
        </form>
    )
}