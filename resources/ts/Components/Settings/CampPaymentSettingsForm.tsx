import InputLabel2 from "@/Elements/Forms/InputLabel2";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import InputError from "@/Elements/Forms/InputError";
import NumberInput from "@/Elements/Forms/NumberInput";
import TextAreaInput from "@/Elements/Forms/TextAreaInput";

import { CampSettingProps } from "@/Pages/Settings/Camp";

import Heading2Alt from "@/Components/Typography/Heading2Alt";
import Heading3 from "@/Components/Typography/Heading3";

import { useForm } from "@inertiajs/react"
import { FormEvent } from "react";
import route from "ziggy-js";
import UpdateFormButton from "@/Elements/Buttons/UpdateFormButton";

export default function CampPaymentSettingsForm({ campSettings }: { campSettings: Pick<CampSettingProps, "paymentPrices" | "paymentDescription"> }) {
    const defaultData = {
        "paymentDescription": campSettings.paymentDescription,
        "paymentPrices": campSettings.paymentPrices.concat(Array(3 - campSettings.paymentPrices.length).fill("")).slice(0, 3)
    }
    const { data, setData, post, errors, isDirty } = useForm(defaultData);

    const handleChange = (value: string, index: number) => {
        data.paymentPrices[index] = value;
        setData("paymentPrices", data.paymentPrices);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('settings.camp.payment.update'), {
            preserveScroll: true
        })
    }
    return (
        <form name="campPaymentSettingsForm" aria-label="Camp Payment Settings form" onSubmit={handleSubmit} method="post" className="max-w-screen-md mt-5">
            <div className="flex justify-between w-full align-middle">
                <Heading2Alt>Payment Values</Heading2Alt>
            </div>
            <hr />
            <div className="my-4">
                <div className="mb-2">
                    <InputLabel2 forInput={"paymentDescription"} value={"Description"} />
                    <TextAreaInput
                        className="w-full"
                        name={"paymentDescription"}
                        id={"paymentDescription"}
                        value={data.paymentDescription + ""}
                        handleChange={(event) => {
                            setData("paymentDescription", event.target.value)
                        }} />
                    <InputError message={errors.paymentDescription} />
                </div>
                <Heading3>Custom Prices</Heading3>
                <p className="py-2 pl-4 text-gray-700 border-l-2 border-gray-400">Leave fields blank for fewer choices or only custom option</p>
                <div className="flex flex-col sm:flex-row sm:gap-2 sm:flex-wrap lg:grid lg:grid-cols-3">
                    <div>
                        <InputLabel2 forInput={"paymentPrice1"} value={"Custom Price 1"} />
                        <NumberInput name={"paymentPrice1"} id={"paymentPrice1"} value={data.paymentPrices[0] + ""} handleChange={(event) => handleChange(event.target.value, 0)} />
                        <InputError message={errors.paymentPrices} />
                    </div>
                    <div>
                        <InputLabel2 forInput={"paymentPrice2"} value={"Custom Price 2"} />
                        <NumberInput name={"paymentPrice2"} id={"paymentPrice2"} value={data.paymentPrices[1] + ""} handleChange={(event) => handleChange(event.target.value, 1)} />
                        <InputError message={errors.paymentPrices} />
                    </div>
                    <div>
                        <InputLabel2 forInput={"paymentPrice3"} value={"Custom Price 3"} />
                        <NumberInput name={"paymentPrice3"} id={"paymentPrice3"} value={data.paymentPrices[2] + ""} handleChange={(event) => handleChange(event.target.value, 2)} />
                        <InputError message={errors.paymentPrices} />
                    </div>

                </div>
            </div>
            <UpdateFormButton isDirty={isDirty} />
        </form>
    )
}