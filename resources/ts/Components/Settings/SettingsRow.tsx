import InputLabel2 from "@/Components/Forms/InputLabel2";
import RadioInput from "@/Components/Forms/RadioInput";

export default function SettingsRow({ title, name, value = "", handleChange }: { title: string, name: string, value?: string, handleChange: React.ChangeEventHandler<HTMLElement> }) {

    return (


        <div className="flex justify-center border border-gray-200 w-3/4 p-5 rounded-md mb-2">
            <fieldset className="inline-flex justify-between items-center gap-10 w-full">
                <legend className="float-left font-bold">{title}</legend>
                <div className="inline-flex">
                    <InputLabel2 className="mr-2" forInput={"true" + name}>
                        <RadioInput name={name} id={"true" + name} value={"1"} handleChange={handleChange} checked={value === "1"} />
                        Show
                    </InputLabel2>
                    <InputLabel2 className="mr-2" forInput={"false" + name}>
                        <RadioInput name={name} id={"false" + name} value={"0"} handleChange={handleChange} checked={value === "0"} />
                        Hide
                    </InputLabel2>
                </div>
            </fieldset>
        </div>


    )
}