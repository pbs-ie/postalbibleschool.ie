import ButtonLink from "@/Elements/Buttons/ButtonLink";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import InputLabel2 from "@/Components/Forms/InputLabel2";
import NumberInput from "@/Components/Forms/NumberInput";
import TextInput from "@/Components/Forms/TextInput";
import ToastBanner from "@/Components/Forms/ToastBanner";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { useForm, usePage } from "@inertiajs/react";
import { FormEvent } from "react";


export default function Create() {
    const { errors } = usePage().props;
    const { data, setData, post, processing } = useForm({
        schoolName: "",
        schoolType: "",
        level0Order: 0,
        level1Order: 0,
        level2Order: 0,
        level3Order: 0,
        level4Order: 0,
        tlpOrder: 0
    });

    const handleChange = (event: React.ChangeEvent<HTMLFormElement | HTMLSelectElement>) => {
        switch (event.target.name) {
            case "schoolName":
            case "schoolType":
            case "level0Order":
            case "level1Order":
            case "level2Order":
            case "level3Order":
            case "level4Order":
            case "tlpOrder":
                setData(event.target.name, event.target.value);
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('orders.store'));
    }
    return (
        <WrapperLayout>
            <ContentWrapper title="Create New Order">
                {errors &&
                    Object.keys(errors).map((key) => {
                        if (key === "tlpOrder") {
                            let updatedError = errors[key].replaceAll("tlp", "Teacher Lesson Plan");
                            return <ToastBanner key={key} message={updatedError} />
                        }
                        return <ToastBanner key={key} message={errors[key]} />
                    }
                    )
                }
                <div className="flex flex-col items-start gap-4 px-10 py-5 border">
                    <form method="post" onSubmit={handleSubmit} className="text-left min-w-screen-md">
                        <h2 className="p-0 mb-2 text-xl font-bold text-black">Basic Information</h2>
                        <div className="block mb-4">
                            <InputLabel2 forInput={"schoolName"} value={"School Name"} required />
                            <TextInput type={"text"} name={"schoolName"} id={"schoolName"} value={data.schoolName} className={""} autoComplete={"off"} handleChange={handleChange} required />
                        </div>
                        <div className="block mb-4">
                            <InputLabel2 forInput={"schoolType"} value={"School Type"} />
                            <TextInput type={"text"} name={"schoolType"} id={"schoolType"} value={data.schoolType} className={""} autoComplete={"off"} handleChange={handleChange} />
                            <p className="text-sm italic text-gray-600">Like: Delivery, Saints, Non-Saints, Donegal</p>
                        </div>
                        <div className="block mb-4">
                            <InputLabel2 forInput={"tlpOrder"} value="Teacher Lesson Plans" />
                            <NumberInput name={"tlpOrder"} id={"tlpOrder"} value={data.tlpOrder} className={""} autoComplete={"off"} handleChange={handleChange} required />

                        </div>
                        <h2 className="p-0 mb-2 text-xl font-bold text-black">Lesson Order Numbers</h2>
                        <div className="flex flex-wrap gap-4 mb-4">
                            <div>
                                <InputLabel2 forInput={"level0Order"} value={"Level 0"} />
                                <NumberInput name={"level0Order"} id={"level0Order"} value={data.level0Order} className={""} autoComplete={"off"} handleChange={handleChange} required />
                            </div>

                            <div>
                                <InputLabel2 forInput={"level1Order"} value={"Level 1"} />
                                <NumberInput name={"level1Order"} id={"level1Order"} value={data.level1Order} className={""} autoComplete={"off"} handleChange={handleChange} required />
                            </div>

                            <div>
                                <InputLabel2 forInput={"level2Order"} value={"Level 2"} />
                                <NumberInput name={"level2Order"} id={"level2Order"} value={data.level2Order} className={""} autoComplete={"off"} handleChange={handleChange} required />
                            </div>

                            <div>
                                <InputLabel2 forInput={"level3Order"} value={"Level 3"} />
                                <NumberInput name={"level3Order"} id={"level3Order"} value={data.level3Order} className={""} autoComplete={"off"} handleChange={handleChange} required />
                            </div>

                            <div>
                                <InputLabel2 forInput={"level4Order"} value={"Level 4"} />
                                <NumberInput name={"level4Order"} id={"level4Order"} value={data.level4Order} className={""} autoComplete={"off"} handleChange={handleChange} required />
                            </div>
                        </div>

                        <div className="inline-flex justify-center w-full gap-2 mt-5 md:justify-end">
                            <ButtonLink type="secondary" href={route('orders.index')}>Cancel</ButtonLink>
                            <PrimaryButton type="submit" className="w-1/3" processing={processing}>Create</PrimaryButton>
                        </div>
                    </form>
                </div>
            </ContentWrapper>
        </WrapperLayout >
    )
}