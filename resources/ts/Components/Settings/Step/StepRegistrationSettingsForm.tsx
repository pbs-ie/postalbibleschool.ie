import { useForm } from "@inertiajs/react"
import { ChangeEvent, FormEvent } from "react";
import SettingsRadio from "../SettingsRadio";
import Banknotes from "@/Elements/Icons/Banknotes";
import Calendar from "@/Elements/Icons/Calendar";
import ChatBubble from "@/Elements/Icons/ChatBubble";
import Group from "@/Elements/Icons/Group";
import TextInput from "@/Elements/Forms/TextInput";
import InputLabel from "@/Elements/Forms/InputLabel";
import InputLabel2 from "@/Elements/Forms/InputLabel2";
import TextAreaInput from "@/Elements/Forms/TextAreaInput";

export default function StepRegistrationSettingsForm() {
    const defaultData = {
        "topic": "",
        "speaker": "",
        "dates": "",
        "cost": "",
        "description": "",
        "link": "",
    }
    const { data, setData } = useForm(defaultData);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        switch (event.target.name) {
            case "topic":
            case "speaker":
            case "dates":
            case "cost":
            case "description":
            case "link":
                setData(event.target.name, event.target.value);
                break;
        }
    };


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }
    return (
        <form name="stepRegistrationSettingsForm" aria-label="STEP Settings form" onSubmit={handleSubmit} method="post" className="max-w-screen-md">
            <hr />
            <div>
                <div className=" grid grid-cols-2 my-4">
                    <div>
                        <InputLabel2 forInput={"topic"} value={"Topic"} />
                        <TextInput name={"topic"} id={"topic"} value={data.topic} handleChange={handleChange} />
                    </div>
                    <div>
                        <InputLabel2 forInput={"speaker"} value={"Speaker"} />
                        <TextInput name={"speaker"} id={"speaker"} value={data.speaker} handleChange={handleChange} />
                    </div>
                    <div>
                        <InputLabel2 forInput={"dates"} value={"Dates"} />
                        <TextInput name={"dates"} id={"dates"} value={data.dates + ""} handleChange={handleChange} />
                    </div>
                    <div>
                        <InputLabel2 forInput={"cost"} value={"Cost"} />
                        <TextInput name={"cost"} id={"cost"} value={data.cost + ""} handleChange={handleChange} />
                    </div>
                </div>
                <div>
                    <InputLabel2 forInput="description" value="Description text" />
                    <TextAreaInput name={"description"} id={"description"} value={data.description} rows={4} className="w-full" handleChange={handleChange} />
                </div>
                <div>
                    <InputLabel2 forInput={"link"} value={"Google Form Embed Link"} />
                    <TextInput name={"link"} id={"link"} value={data.link} handleChange={handleChange} />
                </div>
            </div>
        </form>
    )
}