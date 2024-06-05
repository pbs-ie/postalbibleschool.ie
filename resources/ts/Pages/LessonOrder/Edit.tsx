import ButtonLink from "@/Elements/Buttons/ButtonLink";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import OrderInfoCard from "@/Components/Cards/OrderInfoCard";
import InputLabel2 from "@/Elements/Forms/InputLabel2";
import NumberInput from "@/Elements/Forms/NumberInput";
import ToastBanner from "@/Components/Forms/ToastBanner";
import Paragraph from "@/Components/Typography/Paragraph";
import ParagraphContainer from "@/Components/Typography/ParagraphContainer";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { useForm, usePage } from "@inertiajs/react";
import { FormEvent } from "react";


export default function Edit({ isAdmin, lessonOrder }: { isAdmin: boolean, lessonOrder: LessonOrder }) {
    const { errors } = usePage().props;
    const { data, setData, processing, reset, put } = useForm({
        schoolName: lessonOrder.schoolName,
        schoolType: lessonOrder.schoolType ?? "",
        email: lessonOrder.email,
        level0Order: lessonOrder.level0Order,
        level1Order: lessonOrder.level1Order,
        level2Order: lessonOrder.level2Order,
        level3Order: lessonOrder.level3Order,
        level4Order: lessonOrder.level4Order,
        tlpOrder: lessonOrder.tlpOrder
    });

    const handleChange = (event: React.ChangeEvent<HTMLFormElement | HTMLSelectElement>) => {
        switch (event.target.name) {
            case "schoolName":
            case "schoolType":
            case "email":
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
        put(route('orders.update', lessonOrder.id));
    }

    return (
        <WrapperLayout>
            <ContentWrapper title="Edit Order">

                <ParagraphContainer>
                    <Paragraph className="text-left">View and update your monthly orders of BibleTime lessons here. Please note, changes are made effective only from the following month. If you wish for the changes to take effect immediately, please contact us.</Paragraph>
                </ParagraphContainer>
                <div className="flex justify-center">
                    <div className="flex flex-col items-start gap-4 py-5 md:px-10">
                        <h2 className="p-0 mb-2 text-xl font-bold text-black capitalize">Current information</h2>
                        <OrderInfoCard schoolName={lessonOrder.schoolName} email={lessonOrder.email} level0Order={lessonOrder.level0Order} level1Order={lessonOrder.level1Order} level2Order={lessonOrder.level2Order} level3Order={lessonOrder.level3Order} level4Order={lessonOrder.level4Order} tlpOrder={lessonOrder.tlpOrder}></OrderInfoCard>
                        <h2 className="p-0 mb-2 text-xl font-bold text-black">Update Information</h2>
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
                        <form method="post" onSubmit={handleSubmit} className="text-left min-w-screen-md">
                            <div className="block mb-4">
                                <InputLabel2 forInput={"tlpOrder"} value="Teacher Lesson Plans" />
                                <NumberInput name={"tlpOrder"} id={"tlpOrder"} value={data.tlpOrder} className={""} autoComplete={"off"} handleChange={handleChange} />
                            </div>
                            <h3 className="p-0 mb-2 font-bold text-black text-l">Lesson Order Numbers</h3>
                            <div className="flex flex-wrap gap-4 mb-4">
                                <div>
                                    <InputLabel2 forInput={"level0Order"} value={"Level 0"} />
                                    <NumberInput name={"level0Order"} id={"level0Order"} value={data.level0Order} className={""} autoComplete={"off"} handleChange={handleChange} />
                                </div>
                                <div>
                                    <InputLabel2 forInput={"level1Order"} value={"Level 1"} />
                                    <NumberInput name={"level1Order"} id={"level1Order"} value={data.level1Order} className={""} autoComplete={"off"} handleChange={handleChange} />
                                </div>
                                <div>
                                    <InputLabel2 forInput={"level2Order"} value={"Level 2"} />
                                    <NumberInput name={"level2Order"} id={"level2Order"} value={data.level2Order} className={""} autoComplete={"off"} handleChange={handleChange} />
                                </div>
                                <div>
                                    <InputLabel2 forInput={"level3Order"} value={"Level 3"} />
                                    <NumberInput name={"level3Order"} id={"level3Order"} value={data.level3Order} className={""} autoComplete={"off"} handleChange={handleChange} />
                                </div>
                                <div>
                                    <InputLabel2 forInput={"level4Order"} value={"Level 4"} />
                                    <NumberInput name={"level4Order"} id={"level4Order"} value={data.level4Order} className={""} autoComplete={"off"} handleChange={handleChange} />
                                </div>
                            </div>
                            <div className="inline-flex justify-end w-full gap-2 mt-5 md:justify-end">
                                <ButtonLink hierarchy="secondary" href={route('orders.index')}>Cancel</ButtonLink>
                                <PrimaryButton type="submit" processing={processing}>Update</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </ContentWrapper>
        </WrapperLayout >
    )
}