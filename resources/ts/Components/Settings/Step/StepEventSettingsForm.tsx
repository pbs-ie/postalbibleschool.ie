import { useForm } from "@inertiajs/react"
import { FormEvent } from "react";
import SettingsRadio from "@/Components/Settings/SettingsRadio";
import Banknotes from "@/Elements/Icons/Banknotes";
import Calendar from "@/Elements/Icons/Calendar";
import ChatBubble from "@/Elements/Icons/ChatBubble";
import Group from "@/Elements/Icons/Group";
import TextInput from "@/Elements/Forms/TextInput";
import InputLabel2 from "@/Elements/Forms/InputLabel2";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import RadioInput from "@/Elements/Forms/RadioInput";

export default function StepEventSettingsForm() {
    const defaultData = {
        "step_upcoming_card": "0",
        "card_details": [
            {
                Icon: Calendar,
                title: "When",
                description: "14th June - 16th June, 2024",
                buttonText: "",
                buttonLink: ""
            },
            {
                Icon: Location,
                title: "Where",
                description: "Castledaly Manor, Athlone,<br /> Co Westmeath",
                buttonText: "",
                buttonLink: ""
            },
            {
                Icon: ChatBubble,
                title: "Topic",
                description: "Book of Nehemiah",
                buttonText: "",
                buttonLink: ""
            },
            {
                Icon: Group,
                title: "Who can attend",
                description: "Teens and Young Adults 16+",
                buttonText: "",
                buttonLink: ""
            },
            {
                Icon: Banknotes,
                title: "Cost",
                description: `"Standard €65<br />Student €50"`,
                buttonText: "",
                buttonLink: ""
            }] as CardBlock[]
    }
    const { data, setData } = useForm(defaultData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case "step_upcoming_card":
                setData(event.target.name, event.target.value);
                break;
        }
    };

    const handleCardChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const targetName = event.target.name.replace(/\d+$/, '');
        switch (targetName) {
            case "title":
            case "description":
            case "buttonText":
            case "buttonLink":
            case "isHighlighted":
                const updatedCardDetails = [
                    ...data.card_details.slice(0, index),
                    {
                        ...data.card_details[index],
                        [targetName]: event.target.value
                    },
                    ...data.card_details.slice(index + 1)
                ];
                setData("card_details", updatedCardDetails);
                break;
        }
    }


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(data);
    }
    return (
        <form name="stepEventSettingsForm" aria-label="STEP Settings form" onSubmit={handleSubmit} method="post" className="max-w-screen-md">
            <SettingsRadio title={"Show STEP Upcoming Card"} name={"step_upcoming_card"} value={data.step_upcoming_card} handleChange={handleChange} />

            <div className="border border-gray-200 p-5 rounded-md mb-2">
                <h3 className="font-bold capitalize">Card blocks</h3>
                <hr />
                <div className="flex flex-col space-y-6 mt-4">
                    {defaultData.card_details.map(({ title }, idx) => (
                        <div key={title + idx}>
                            <div className="font-bold mb-2">{`Block ${idx + 1}`}</div>
                            <div className="grid grid-cols-3 ">
                                <div>
                                    <InputLabel2 forInput={"title" + idx} value={"Title"} />
                                    <TextInput name={"title"} id={"title" + idx} value={data.card_details[idx].title} handleChange={(e) => handleCardChange(e, idx)} />
                                </div>
                                <div>
                                    <InputLabel2 forInput={"description" + idx} value={"Description"} />
                                    <TextInput name={"description"} id={"description" + idx} value={data.card_details[idx].description + ""} handleChange={(e) => handleCardChange(e, idx)} />
                                </div>
                                <div>
                                    <InputLabel2 forInput={"buttonLink" + idx} value={"Button Link"} />
                                    <TextInput name={"buttonLink"} id={"buttonLink" + idx} value={data.card_details[idx].buttonLink + ""} handleChange={(e) => handleCardChange(e, idx)} />
                                </div>
                                <div>
                                    <InputLabel2 forInput={"buttonText" + idx} value={"Button Text"} />
                                    <TextInput name={"buttonText"} id={"buttonText" + idx} value={data.card_details[idx].buttonText + ""} handleChange={(e) => handleCardChange(e, idx)} />
                                </div>
                                <div className="h-full">
                                    <fieldset className="inline-flex flex-col items-start justify-around pt-2 h-full">
                                        <legend className="float-left capitalize text-slate-700 font-medium">{"Is Highlighted?"}</legend>
                                        <div className="inline-flex">
                                            <InputLabel2 className="mr-2" forInput={"true" + idx}>
                                                <RadioInput name={"isHighlighted" + idx} id={"true" + idx} value={"1"} handleChange={(e) => handleCardChange(e, idx)} checked={data.card_details[idx].isHighlighted === "1"} />
                                                Yes
                                            </InputLabel2>
                                            <InputLabel2 className="mr-2" forInput={"false" + idx}>
                                                <RadioInput name={"isHighlighted" + idx} id={"false" + idx} value={"0"} handleChange={(e) => handleCardChange(e, idx)} checked={data.card_details[idx].isHighlighted === "0"} />
                                                No
                                            </InputLabel2>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <PrimaryButton>Update</PrimaryButton>
            </div>
        </form>
    )
}