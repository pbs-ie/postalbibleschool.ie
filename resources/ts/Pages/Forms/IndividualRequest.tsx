import CountryDropdown from "@/Components/Forms/CountryDropdown";
import GroupLabel from "@/Components/Forms/GroupLabel";
import InputLabel from "@/Components/Forms/InputLabel";
import NumberInput from "@/Components/Forms/NumberInput";
import RegionDropdown from "@/Components/Forms/RegionDropdown";
import SelectInput from "@/Components/Forms/SelectInput";
import TextAreaInput from "@/Components/Forms/TextAreaInput";
import TextInput from "@/Components/Forms/TextInput";
import ToastBanner from "@/Components/Forms/ToastBanner";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { useForm, usePage } from "@inertiajs/inertia-react";
import { FormEvent, useEffect, useReducer, useState } from "react";


export default function IndividualRequest() {
    interface Student {
        fullname: string;
        dob: string;
    }
    interface Action {
        type: "changeValue" | "addValue" | "removeValue";
    }
    interface ChangeAction extends Action {
        name: "fullname" | "dob";
        value: string;
        idx: number;
    }

    const initialState: Student[] = [{
        fullname: "",
        dob: ""
    }]

    const reducer = (state: Student[], action: ChangeAction | Action) => {
        if (action.type === "changeValue" && "name" in action) {
            let returnObj = [...state];
            returnObj[action.idx][action.name] = action.value;
            return returnObj;
        } else if (action.type === 'addValue') {
            return [
                ...state, ...initialState
            ];
        } else if (action.type === "removeValue") {
            if (state.length === 1) {
                return initialState;
            }
            return state.slice(0, state.length - 1);
        }
        else {
            throw new Error();
        }
    }


    const [studentState, dispatch] = useReducer(reducer, initialState);

    const { errors } = usePage().props;
    const { data, setData, post, processing, reset } = useForm({
        studentDetails: [{
            fullname: "",
            dob: ""
        }],
        email: "",
        phone: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        postcode: "",
        country: "",
        region: "",
        message: ""
    });

    useEffect(() => {
        reset();
    }, []);

    useEffect(() => {
        reset("region");
    }, [data.country]);

    const handleChange = (event: any) => {
        setData(event.target.name, event.target.value);
    };

    // const handleMultiInputChange = (idx: number, event: any) => {
    //     const cloneArray = [...nameInputs];
    //     cloneArray[idx] = event.target.value;
    //     setNameInputs([...cloneArray]);
    // }

    const handleComplexChange = (idx: number, event: any) => {
        dispatch({
            type: "changeValue",
            name: event.target.name,
            value: event.target.value,
            idx: idx
        });
    }

    const addStudent = () => {
        dispatch({
            type: "addValue",
        })
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setData("studentDetails", studentState);
        post(route('request.individual'));
    }
    return (
        <WrapperLayout>
            <ContentWrapper title="Request Sample Lesson">
                <>
                    {errors &&
                        Object.keys(errors).map((key) =>
                            <ToastBanner key={key} message={errors[key]} />
                        )
                    }
                    <form method="post" onSubmit={handleSubmit} className="max-w-screen-md mx-auto">
                        <h3 className="flex mb-4 text-lg font-bold">Student Details</h3>
                        <div className="flex flex-col gap-4 pb-3 mb-8 border-b border-gray-600">
                            {studentState.map(({ fullname, dob }, idx) => (
                                <div key={idx} className="flex flex-col gap-2 mb-2">
                                    <div className="flex gap-2">
                                        <InputLabel forInput={`fullname[${idx}]`} value={"Name " + (idx + 1)} className="basis-1/3" required />
                                        <div className="inline-flex basis-2/3">
                                            <TextInput
                                                type="text"
                                                name="fullname"
                                                id={`fullname[${idx}]`}
                                                value={fullname}
                                                placeholder="Name"
                                                className="block w-full"
                                                autoComplete="name"
                                                handleChange={(e) => handleComplexChange(idx, e)}
                                                required
                                                ariaLabelledBy="name"
                                            />
                                        </div>
                                    </div>
                                    <div className="inline-flex gap-2">
                                        <InputLabel forInput={`fullname[${idx}]`} value="Date of Birth" className="basis-1/3" required />

                                        <input
                                            type="text"
                                            name="dob"
                                            placeholder="Date of birth"
                                            className="rounded basis-2/3"
                                            id={`dob[${idx}]`}
                                            onFocus={(e) => e.target.type = "date"}
                                            onBlur={(e) => e.target.type = "text"}
                                            onChange={(e) => handleComplexChange(idx, e)}
                                            value={dob}
                                            required={true}
                                        />
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-end gap-2">
                                <SecondaryButton onClick={() => dispatch({ type: "addValue" })} className="my-2 before:content-['+'] before:pr-1 before:text-lg">Add Student</SecondaryButton>
                                <SecondaryButton onClick={() => dispatch({ type: "removeValue" })} className="my-2 before:content-['-'] before:pr-1 before:text-lg">Remove Student</SecondaryButton>
                            </div>
                        </div>
                        <h3 className="flex mb-4 text-lg font-bold">Contact Details</h3>
                        <div className="grid mb-5 items-start grid-cols-[1fr_2fr] gap-2">

                            <InputLabel forInput="email" value="Email" required />
                            <TextInput
                                type="text"
                                name="email"
                                id="email"
                                value={data.email}
                                className="block w-full"
                                autoComplete="email"
                                handleChange={handleChange}
                                required
                            />

                            <InputLabel forInput="phone" value="Phone" />
                            <TextInput
                                type="text"
                                name="phone"
                                id="phone"
                                value={data.phone}
                                className="block w-full"
                                autoComplete="phone"
                                handleChange={handleChange}
                            />

                            <GroupLabel id="address" value="Address" required></GroupLabel>
                            <div className="grid grid-cols-2 gap-2">
                                <TextInput
                                    type="text"
                                    name="address1"
                                    id="address1"
                                    value={data.address1}
                                    placeholder="Street Address"
                                    className="block w-full col-span-2"
                                    autoComplete="on"
                                    handleChange={handleChange}
                                    ariaLabelledBy="address"
                                />
                                <TextInput
                                    type="text"
                                    name="address2"
                                    id="address2"
                                    value={data.address2}
                                    placeholder="Address Line 2"
                                    className="block w-full col-span-2"
                                    autoComplete="on"
                                    handleChange={handleChange}
                                    ariaLabelledBy="address"
                                />
                                <TextInput
                                    type="text"
                                    name="city"
                                    id="city"
                                    value={data.city}
                                    placeholder="City"
                                    className="block w-full"
                                    autoComplete="on"
                                    handleChange={handleChange}
                                    ariaLabelledBy="address"
                                />
                                <TextInput
                                    type="text"
                                    name="state"
                                    id="state"
                                    value={data.state}
                                    placeholder="State"
                                    className="block w-full"
                                    autoComplete="on"
                                    handleChange={handleChange}
                                    ariaLabelledBy="address"
                                />
                                <TextInput
                                    type="text"
                                    name="postcode"
                                    id="postcode"
                                    value={data.postcode}
                                    placeholder="Postcode"
                                    className="block w-full"
                                    autoComplete="on"
                                    handleChange={handleChange}
                                    ariaLabelledBy="address"
                                />
                                <CountryDropdown
                                    value={data.country}
                                    handleChange={handleChange}
                                />
                                <RegionDropdown
                                    country={data.country}
                                    value={data.region}
                                    handleChange={handleChange}
                                ></RegionDropdown>
                            </div>

                            <InputLabel forInput="message" value="Message or Comment" />
                            <TextAreaInput
                                name="message"
                                id="message"
                                value={data.message}
                                className="block w-full"
                                handleChange={handleChange}
                                rows={4}
                            />

                        </div>
                        <div className="inline-flex justify-end w-full mt-5"><PrimaryButton type="submit" className="w-1/3 md:w-1/4" processing={processing}>Submit</PrimaryButton></div>
                    </form>
                </>
            </ContentWrapper>
        </WrapperLayout >
    )
}
