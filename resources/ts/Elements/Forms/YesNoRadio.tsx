import InputLabel2 from "@/Elements/Forms/InputLabel2";
import RadioInput from "@/Elements/Forms/RadioInput";

export default function YesNoRadio({ title, name, value, handleChange }: { title: string, name: string, value: string, handleChange: React.ChangeEventHandler<HTMLInputElement> }) {
    return (
        <div className="flex justify-center border border-gray-200 p-5 rounded-md mb-2">
            <fieldset className="inline-flex justify-between items-center gap-10 w-full">
                <legend className="float-left font-bold">{title}</legend>
                <div className="inline-flex">
                    <InputLabel2 className="mr-2" forInput={"true" + name}>
                        <RadioInput name={name} id={"true " + name} value={"1"} handleChange={handleChange} checked={value === "1"} />
                        Yes
                    </InputLabel2>
                    <InputLabel2 className="mr-2" forInput={"false" + name}>
                        <RadioInput name={name} id={"false " + name} value={"0"} handleChange={handleChange} checked={value === "0"} />
                        No
                    </InputLabel2>
                </div>
            </fieldset>
        </div>


    )
}