import { useForm } from "@inertiajs/react"
import { FormEvent } from "react";
import InputLabel2 from "@/Elements/Forms/InputLabel2";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import InputError from "@/Elements/Forms/InputError";
import SelectInput from "@/Elements/Forms/SelectInput";
import route from "ziggy-js";
import { LessonSettingsProps } from "@/Pages/Settings/Lesson";

export default function LessonSettingsForm({ lessonSettings }: { lessonSettings: LessonSettingsProps }) {
    const defaultData = {
        "selectedMap": lessonSettings.active_index
    }
    const { data, setData, post, errors } = useForm(defaultData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        switch (event.target.name) {
            case "selectedMap":
                setData(event.target.name, +event.target.value);
                break;
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('settings.lesson.update'));
    }
    return (
        <form name="lessonSettingsForm" aria-label="Lesson Settings form" onSubmit={handleSubmit} method="post" className="max-w-screen-md">
            <hr />
            <div className="my-4 ">

                <div className="p-2 mb-1 border border-gray-600 rounded-sm w-fit">
                    Currently Active: <span className="font-bold">{lessonSettings.active_index + 1}</span>
                </div>
                <div className="grid grid-cols-2 ">

                    <div>
                        <InputLabel2 forInput={"selectedMap"} value={"Change active map number:"} />
                        <SelectInput name="selectedMap" id="selectedMap" handleChange={handleChange} defaultValue={data.selectedMap}>
                            <option value={0}>1</option>
                            <option value={1}>2</option>
                            <option value={2}>3</option>
                        </SelectInput>
                        <InputError message={errors.selectedMap} />
                    </div>
                </div>
            </div>
            <div>
                <PrimaryButton>Update</PrimaryButton>
            </div>
        </form>
    )
}