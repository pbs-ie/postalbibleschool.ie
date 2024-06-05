import CountryDropdown from "@/Components/Forms/CountryDropdown";
import GroupLabel from "@/Elements/Forms/GroupLabel";
import InputLabel from "@/Elements/Forms/InputLabel";
import TextAreaInput from "@/Elements/Forms/TextAreaInput";
import TextInput from "@/Elements/Forms/TextInput";
import ToastBanner from "@/Components/Forms/ToastBanner";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import SecondaryButton from "@/Elements/Buttons/SecondaryButton";
import Heading1Alt from "@/Components/Typography/Heading1Alt";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { FormEvent, useEffect, useReducer, useState } from "react";
import InputError from "@/Elements/Forms/InputError";

export interface Student {
    firstname: string;
    lastname: string;
    day: string;
    month: string;
    year: string;
}

export default function IndividualRequest() {
    interface Action {
        type: "changeValue" | "addValue" | "removeValue";
    }
    interface ChangeAction extends Action {
        name: keyof Student;
        value: string | number;
        idx: number;
    }

    const initialState: Student[] = [{
        firstname: "",
        lastname: "",
        day: "",
        month: "",
        year: ""
    }]


    const reducer = (state: Student[], action: ChangeAction | Action) => {
        if (action.type === "changeValue" && "name" in action) {
            let returnObj = [...state];
            returnObj[action.idx][action.name] = action.value + "";
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
            return state;
        }
    }


    const [studentState, dispatch] = useReducer(reducer, initialState);
    const [showDateError, setShowDateError] = useState([false]);

    const { errors } = usePage().props;
    const { data, setData, post, processing, reset, transform } = useForm({
        studentDetails: [{
            firstname: "",
            lastname: "",
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
        message: ""
    });


    useEffect(() => {
        reset();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case "email":
            case "phone":
            case "address1":
            case "address2":
            case "city":
            case "state":
            case "postcode":
            case "country":
            case "message":
                setData(event.target.name, event.target.value);
        }
    };

    const handleComplexChange = (idx: number, event: React.ChangeEvent<HTMLInputElement | HTMLElement>) => {
        if (event.target instanceof HTMLInputElement) {
            switch (event.target.name) {
                case "firstname":
                case "lastname":
                case 'day':
                case "month":
                case "year":
                    dispatch({
                        type: "changeValue",
                        name: event.target.name,
                        value: event.target.value,
                        idx: idx
                    });
                    break;
            }
        }
    }
    const hasDateError = (idx: number) => {
        let isShowing = [...showDateError];
        if ((studentState[idx].day !== "" && (isNaN(+studentState[idx].day) || +studentState[idx].day < 1 || +studentState[idx].day > 31))
            || (studentState[idx].month !== "" && (isNaN(+studentState[idx].month) || +studentState[idx].month < 1 || +studentState[idx].month > 12))
            || (studentState[idx].year !== "" && (isNaN(+studentState[idx].year) || +studentState[idx].year < 1900 || +studentState[idx].year >= (new Date().getFullYear())))) {
            isShowing[idx] = true;
        } else {
            isShowing[idx] = false;
        }
        console.error("Setting showDateError", showDateError[idx]);
        setShowDateError(isShowing);


    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let transformStudent: any = [];
        studentState.forEach(({ firstname, lastname, day, month, year }) => {
            transformStudent.push({
                firstname: firstname,
                lastname: lastname,
                dob: new Date(Number(year), Number(month) - 1, Number(day)).toISOString().slice(0, 10)
            });
        });
        setData("studentDetails", transformStudent);
        transform((data) => ({
            ...data,
            studentDetails: transformStudent
        }));
        post(route('request.individual'));
    }

    return (
        <WrapperLayout>
            <div className="px-4 py-12 mx-auto text-center shadow-sm max-w-7xl sm:px-6 lg:px-8">
                <Head title="Request Sample Lessons" />
                <Heading1Alt>Request Lesson for an Individual</Heading1Alt>
                {errors &&
                    Object.keys(errors).map((key) =>
                        <ToastBanner key={key} message={errors[key]} />
                    )
                }
                <form aria-label="Individual lesson request form" name="individualForm" method="post" onSubmit={handleSubmit} className="max-w-screen-md mx-auto">
                    <h2 className="flex mb-4 text-lg font-bold">Student Details</h2>
                    <div className="flex flex-col gap-4 pb-3 mb-8 border-b border-gray-600">
                        {studentState.map(({ firstname, lastname, day, month, year }, idx) => (
                            <div key={idx} className="flex flex-col gap-2 mb-2">
                                <div className="flex gap-2">
                                    <InputLabel id={"fullname" + (idx + 1)} forInput={`firstname[${idx}]`} value={"Name " + (idx + 1)} className="basis-1/3" required />
                                    <div className="inline-flex gap-2 basis-2/3">
                                        <label htmlFor={`firstname[${idx}]`} className="hidden">First Name for {idx + 1}</label>
                                        <TextInput
                                            type="text"
                                            name="firstname"
                                            id={`firstname[${idx}]`}
                                            value={firstname}
                                            placeholder="First Name"
                                            className="block w-full"
                                            autoComplete="given-name"
                                            handleChange={(e) => handleComplexChange(idx, e)}
                                            ariaLabelledBy={"fullname" + (idx + 1)}
                                            required
                                        />
                                        <label htmlFor={`lastname[${idx}]`} className="hidden">Last Name for {idx + 1}</label>
                                        <TextInput
                                            type="text"
                                            name="lastname"
                                            id={`lastname[${idx}]`}
                                            value={lastname}
                                            placeholder="Last Name"
                                            className="block w-full"
                                            autoComplete="family-name"
                                            handleChange={(e) => handleComplexChange(idx, e)}
                                            ariaLabelledBy={"fullname" + (idx + 1)}
                                            required

                                        />

                                    </div>
                                </div>
                                <div className="inline-flex flex-wrap items-start gap-2 md:flex-nowrap">
                                    <InputLabel forInput={`day[${idx}]`} value={`Date of Birth ${idx + 1}`} className="basis-1/3" required />
                                    <div className="flex flex-col">
                                        <div className="flex justify-start gap-2 basis-2/3">
                                            <div className="flex flex-col items-start">
                                                <label htmlFor={`day[${idx}]`}>Day (DD):</label>
                                                <TextInput
                                                    type="text"
                                                    name="day"
                                                    id={`day[${idx}]`}
                                                    value={day}
                                                    className="w-24"
                                                    placeholder="DD"
                                                    autoComplete="on"
                                                    handleChange={(e) => handleComplexChange(idx, e)}
                                                    onBlur={(e) => hasDateError(idx)}
                                                    required
                                                ></TextInput>

                                            </div>
                                            <div className="flex flex-col items-start">
                                                <label htmlFor={`month[${idx}]`}>Month (MM):</label>
                                                <TextInput
                                                    type="text"
                                                    name="month"
                                                    id={`month[${idx}]`}
                                                    value={month}
                                                    className="w-24"
                                                    placeholder="MM"
                                                    autoComplete="on"
                                                    handleChange={(e) => handleComplexChange(idx, e)}
                                                    onBlur={(e) => hasDateError(idx)}
                                                    required
                                                ></TextInput>
                                            </div>
                                            <div className="flex flex-col items-start">
                                                <label htmlFor={`year[${idx}]`}>Year (YYYY):</label>
                                                <TextInput
                                                    type="text"
                                                    name="year"
                                                    id={`year[${idx}]`}
                                                    value={year}
                                                    className="w-40"
                                                    placeholder="YYYY"
                                                    autoComplete="on"
                                                    handleChange={(e) => handleComplexChange(idx, e)}
                                                    onBlur={(e) => hasDateError(idx)}
                                                    required
                                                ></TextInput>
                                            </div>
                                        </div>
                                        {showDateError && showDateError[idx] &&
                                            <InputError message={"Please enter a valid date"} className="mt-2 bg-red-100" />
                                        }
                                    </div>

                                </div>
                            </div>
                        ))}
                        <div className="flex justify-end gap-2">
                            <SecondaryButton onClick={() => dispatch({ type: "addValue" })} >+ Add Student</SecondaryButton>
                            <SecondaryButton onClick={() => dispatch({ type: "removeValue" })} >- Remove Student</SecondaryButton>
                        </div>
                    </div>
                    <h2 className="flex mb-4 text-lg font-bold">Contact Details</h2>
                    <div className="grid mb-5 items-start grid-cols-[1fr_2fr] gap-2">

                        <InputLabel forInput="email" value="Email" required />
                        <TextInput
                            type="email"
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
                            <label id="address1label" htmlFor="address1" className="hidden">Field 1</label>
                            <TextInput
                                type="text"
                                name="address1"
                                id="address1"
                                value={data.address1}
                                placeholder="Street Address"
                                className="block w-full col-span-2"
                                autoComplete="on"
                                handleChange={handleChange}
                                ariaLabelledBy="address address1label"
                            />
                            <label id="address2label" htmlFor="address2" className="hidden">Field 2</label>
                            <TextInput
                                type="text"
                                name="address2"
                                id="address2"
                                value={data.address2}
                                placeholder="Address Line 2"
                                className="block w-full col-span-2"
                                autoComplete="on"
                                handleChange={handleChange}
                                ariaLabelledBy="address address2label"
                            />
                            <label id="citylabel" htmlFor="city" className="hidden">City</label>
                            <TextInput
                                type="text"
                                name="city"
                                id="city"
                                value={data.city}
                                placeholder="City"
                                className="block w-full"
                                autoComplete="on"
                                handleChange={handleChange}
                                ariaLabelledBy="address citylabel"
                            />
                            <label id="statelabel" htmlFor="state" className="hidden">State</label>
                            <TextInput
                                type="text"
                                name="state"
                                id="state"
                                value={data.state}
                                placeholder="State"
                                className="block w-full"
                                autoComplete="on"
                                handleChange={handleChange}
                                ariaLabelledBy="address statelabel"
                            />
                            <label id="postcodelabel" htmlFor="postcode" className="hidden">Postcode</label>
                            <TextInput
                                type="text"
                                name="postcode"
                                id="postcode"
                                value={data.postcode}
                                placeholder="Postcode"
                                className="block w-full"
                                autoComplete="on"
                                handleChange={handleChange}
                                ariaLabelledBy="address postcode"
                            />
                            <label htmlFor="country" className="hidden">Country</label>
                            <CountryDropdown
                                value={data.country}
                                handleChange={handleChange}
                            />
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
                    <div className="inline-flex justify-center w-full gap-2 mt-5 md:justify-end">
                        <SecondaryButton onClick={() => window.history.back()}>Go Back</SecondaryButton>
                        <PrimaryButton type="submit" processing={processing || (showDateError.filter((el) => el === true).length > 0)}>Request a Lesson</PrimaryButton>
                    </div>
                </form>
            </div>
        </WrapperLayout >
    )
}
