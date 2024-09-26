import TextInput from "@/Elements/Forms/TextInput";
import InputLabel2 from "@/Elements/Forms/InputLabel2";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import InputError from "@/Elements/Forms/InputError";
import SelectInput from "@/Elements/Forms/SelectInput";

import { CampSettingProps } from "@/Pages/Settings/Camp";

import { useForm } from "@inertiajs/react"
import { FormEvent } from "react";
import route from "ziggy-js";
import Heading2Alt from "@/Components/Typography/Heading2Alt";

export default function ReunionSettingsForm({ campSettings }: { campSettings: Pick<CampSettingProps, 'reunionDates' | 'reunionIsActive' | 'reunionFormEmbedLink'> }) {
    const defaultData = {
        "reunionDates": campSettings.reunionDates,
        "reunionIsActive": campSettings.reunionIsActive,
        "reunionFormEmbedLink": campSettings.reunionFormEmbedLink
    }
    const { data, setData, post, errors } = useForm(defaultData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        switch (event.target.name) {
            case "reunionDates":
            case "reunionIsActive":
            case "reunionFormEmbedLink":
                setData(event.target.name, event.target.value);
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
                    <div>
                        <InputLabel2 forInput={"reunionIsActive"} value={"Is Registration Active?"} />
                        <SelectInput name="reunionIsActive" id="reunionIsActive" handleChange={handleChange} defaultValue={data.reunionIsActive ? 1 : 0}>
                            <option value={1}>True</option>
                            <option value={0}>False</option>
                        </SelectInput>
                        <InputError message={errors.reunionIsActive} />
                    </div>
                </div>
            </div>
            <div>
                <PrimaryButton>Update</PrimaryButton>
            </div>
        </form>
    )
}