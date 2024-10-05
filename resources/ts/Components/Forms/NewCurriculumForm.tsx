import { useForm, usePage } from "@inertiajs/react"
import TextInput from "@/Elements/Forms/TextInput";
import InputLabel from "@/Elements/Forms/InputLabel";
import InputError from "@/Elements/Forms/InputError";
import { MonthKeys, monthMap } from "@/constants";
import SelectInput from "@/Elements/Forms/SelectInput";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import Heading3 from "@/Components/Typography/Heading3";
import route from "ziggy-js";

type CreateCurriculumProps = Omit<CurriculumProps, "id" | "digital_count">;
type EditCurriculumProps = Omit<CurriculumProps, "digital_count">

export default function NewCurriculumForm({ curriculum }: { curriculum?: CurriculumProps }) {
    const { currentMonthToSeries } = usePage<PassedProps>().props;
    let defaultFormObject = {
        name: "",
        email: "",
        jan_lesson: "paper",
        feb_lesson: "paper",
        mar_lesson: "paper",
        apr_lesson: "paper",
        may_lesson: "paper",
        jun_lesson: "paper",
        sep_lesson: "paper",
        oct_lesson: "paper",
        nov_lesson: "paper",
        dec_lesson: "paper",
        curriculum_type: "paper"
    } as CreateCurriculumProps | EditCurriculumProps;
    if (curriculum) {
        defaultFormObject = {
            id: curriculum.id,
            name: curriculum.name,
            email: curriculum.email,
            jan_lesson: curriculum.jan_lesson,
            feb_lesson: curriculum.feb_lesson,
            mar_lesson: curriculum.mar_lesson,
            apr_lesson: curriculum.apr_lesson,
            may_lesson: curriculum.may_lesson,
            jun_lesson: curriculum.jun_lesson,
            sep_lesson: curriculum.sep_lesson,
            oct_lesson: curriculum.oct_lesson,
            nov_lesson: curriculum.nov_lesson,
            dec_lesson: curriculum.dec_lesson,
            curriculum_type: curriculum.curriculum_type
        }
    }
    const { data, setData, post, errors, processing, put } = useForm<CreateCurriculumProps | EditCurriculumProps>(
        defaultFormObject
    );



    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        switch (event.target.name) {
            case "name":
            case "email":
            case "jan_lesson":
            case "feb_lesson":
            case "mar_lesson":
            case "apr_lesson":
            case "may_lesson":
            case "jun_lesson":
            case "sep_lesson":
            case "oct_lesson":
            case "nov_lesson":
            case "dec_lesson":
            case "curriculum_type":
                setData(event.target.name, event.target.value);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (curriculum) {
            put(route('curriculum.update', curriculum.id));
        } else {
            post(route('curriculum.store'));
        }
    }
    return (
        <form className="lg:my-10" onSubmit={handleSubmit}>

            <div className="flex flex-col gap-4 lg:flex-row lg:gap-10">
                <div className="flex flex-col gap-4 mb-2">
                    <div className="flex items-center gap-2">
                        <InputLabel forInput={"name"} value={"Curriculum Name"} required />
                        <TextInput
                            name={"name"}
                            id={"name"}
                            value={data.name}
                            className={""}
                            handleChange={handleChange}
                            required />
                        <InputError message={errors["name"]} />
                    </div>
                    <div className="flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <InputLabel forInput={"email"} value={"Email"} />
                            <TextInput
                                name={"email"}
                                id={"email"}
                                type={"email"}
                                value={data.email}
                                className={""}
                                handleChange={handleChange} />
                            <InputError message={errors["email"]} />
                        </div>
                        <p className="text-gray-600">//Leave blank to be accessible to all schools. Enter school email for specific school</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <InputLabel forInput={"curriculum_type"} value={"Curriculum Type"} required />
                        <SelectInput
                            name={"curriculum_type"}
                            id={"curriculum_type"}
                            value={data.curriculum_type}
                            className={""}
                            handleChange={handleChange}
                            required >
                            <option value="paper">Paper only</option>
                            <option value="digital">Paper & Digital</option>
                        </SelectInput>
                        <InputError message={errors["curriculum_type"]} />
                    </div>
                </div>

                {data.curriculum_type === "digital" &&
                    <div data-test='curriculum_calender_block' className="flex flex-col gap-1 p-5 border border-b-4 border-r-2 border-gray-300 rounded-md w-fit">
                        <Heading3>Calendar</Heading3>
                        <p className="mb-2 text-base text-gray-500">Select a maximum of 5 months for digital lessons</p>
                        {Object.keys(monthMap).map((value) => {
                            const month = value as MonthKeys;
                            return (
                                <div key={month} className="grid grid-cols-[1fr_2fr] items-center gap-2">
                                    <InputLabel className="" forInput={month} value={currentMonthToSeries[month as MonthKeys]} />
                                    <SelectInput
                                        name={month}
                                        id={month}
                                        value={data[month] ?? ""}
                                        className={""}
                                        handleChange={handleChange} >
                                        <option value="paper">Paper Lesson</option>
                                        <option value="digital">Digital Lesson</option>
                                    </SelectInput>
                                    <InputError className="col-span-2" message={errors[month]} />
                                </div>
                            )
                        })}
                    </div>
                }
            </div>


            <div className="flex gap-2">
                <ButtonLink hierarchy="secondary" href={route('curriculum.index')}>Cancel</ButtonLink>
                {curriculum ?
                    <PrimaryButton dataTest="form_submit_btn" processing={processing}>Update</PrimaryButton>
                    :
                    <PrimaryButton dataTest="form_submit_btn" processing={processing}>Create</PrimaryButton>
                }
            </div>
        </form>
    )
}