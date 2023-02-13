import CountryDropdown from "@/Components/Forms/CountryDropdown";
import GroupLabel from "@/Components/Forms/GroupLabel";
import InputLabel from "@/Components/Forms/InputLabel";
import TextAreaInput from "@/Components/Forms/TextAreaInput";
import TextInput from "@/Components/Forms/TextInput";
import ToastBanner from "@/Components/Forms/ToastBanner";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Heading1Alt from "@/Components/Typography/Heading1Alt";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { Head, useForm, usePage } from "@inertiajs/inertia-react";
import React, { FormEvent, useEffect, useReducer } from "react";


export default function IndividualRequest() {
    interface Student {
        firstname: string;
        lastname: string;
        dob: string;
    }
    interface Action {
        type: "changeValue" | "addValue" | "removeValue";
    }
    interface ChangeAction extends Action {
        name: "firstname" | "lastname" | "dob";
        value: string;
        idx: number;
    }

    const initialState: Student[] = [{
        firstname: "",
        lastname: "",
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
            return state;
        }
    }


    const [studentState, dispatch] = useReducer(reducer, initialState);

    const { errors } = usePage().props;
    const { data, setData, post, processing, reset } = useForm({
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

    const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
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
                case "dob":
                    dispatch({
                        type: "changeValue",
                        name: event.target.name,
                        value: event.target.value,
                        idx: idx
                    });
                    setData("studentDetails", studentState);

            }
        }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
                <form method="post" onSubmit={handleSubmit} className="max-w-screen-md mx-auto">
                    <h2 className="flex mb-4 text-lg font-bold">Student Details</h2>
                    <div className="flex flex-col gap-4 pb-3 mb-8 border-b border-gray-600">
                        {studentState.map(({ firstname, lastname, dob }, idx) => (
                            <div key={idx} className="flex flex-col gap-2 mb-2">
                                <div className="flex gap-2">
                                    <InputLabel forInput={`fullname[${idx}]`} value={"Name " + (idx + 1)} className="basis-1/3" required />
                                    <div className="inline-flex gap-2 basis-2/3">
                                        <TextInput
                                            type="text"
                                            name="firstname"
                                            id={`firstname[${idx}]`}
                                            value={firstname}
                                            placeholder="First Name"
                                            className="block w-full"
                                            autoComplete="given-name"
                                            handleChange={(e) => handleComplexChange(idx, e)}
                                            required
                                            ariaLabelledBy="name"
                                        />
                                        <TextInput
                                            type="text"
                                            name="lastname"
                                            id={`lastname[${idx}]`}
                                            value={lastname}
                                            placeholder="Last Name"
                                            className="block w-full"
                                            autoComplete="family-name"
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
                                        autoComplete="bday"
                                        required
                                    />
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-end gap-2">
                            <SecondaryButton onClick={() => dispatch({ type: "addValue" })} className="my-2 before:content-['+'] before:pr-1 before:text-lg">Add Student</SecondaryButton>
                            <SecondaryButton onClick={() => dispatch({ type: "removeValue" })} className="my-2 before:content-['-'] before:pr-1 before:text-lg">Remove Student</SecondaryButton>
                        </div>
                    </div>
                    <h2 className="flex mb-4 text-lg font-bold">Contact Details</h2>
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
                    <div className="inline-flex justify-end w-full mt-5"><PrimaryButton type="submit" className="w-1/3 md:w-1/4" processing={processing}>Request a Lesson</PrimaryButton></div>
                </form>
            </div>
        </WrapperLayout >
    )
}
