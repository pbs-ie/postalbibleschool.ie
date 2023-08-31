import CountryDropdown from "@/Components/Forms/CountryDropdown";
import GroupLabel from "@/Components/Forms/GroupLabel";
import InputLabel from "@/Components/Forms/InputLabel";
import NumberInput from "@/Components/Forms/NumberInput";
import SelectInput from "@/Components/Forms/SelectInput";
import TextAreaInput from "@/Components/Forms/TextAreaInput";
import TextInput from "@/Components/Forms/TextInput";
import ToastBanner from "@/Components/Forms/ToastBanner";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import Heading1Alt from "@/Components/Typography/Heading1Alt";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { FormEvent, useEffect } from "react";


export default function GroupRequest() {
    const { errors } = usePage().props;
    const { data, setData, post, processing, reset } = useForm({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        postcode: "",
        country: "",
        type: "",
        numberOfStudents: 0,
        ageRange: "",
        message: ""
    });

    useEffect(() => {
        reset();
    }, []);


    const handleChange = (event: React.ChangeEvent<HTMLFormElement | HTMLSelectElement>) => {
        switch (event.target.name) {
            case "firstname":
            case "lastname":
            case "email":
            case "phone":
            case "address1":
            case "address2":
            case "city":
            case "state":
            case "postcode":
            case "country":
            case "type":
            case "numberOfStudents":
            case "ageRange":
            case "message":
                setData(event.target.name, event.target.value);
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('request.group'));
    }
    return (
        <WrapperLayout>
            <div className="px-4 py-12 mx-auto text-center shadow-sm max-w-7xl sm:px-6 lg:px-8">
                <Head title="Request Sample Lessons" />
                <Heading1Alt>Request Lesson for a Group or School</Heading1Alt>
                {errors &&
                    Object.keys(errors).map((key) =>
                        <ToastBanner key={key} message={errors[key]} />
                    )
                }
                <form method="post" onSubmit={handleSubmit} className="justify-center max-w-screen-md mx-auto">
                    <div className="grid mb-5 items-start grid-cols-[1fr_2fr] gap-2">

                        <InputLabel forInput="name" value="Name" required />
                        <div className="inline-flex gap-2">
                            <TextInput
                                type="text"
                                name="firstname"
                                id="firstname"
                                value={data.firstname}
                                placeholder="First Name"
                                className="block w-full"
                                autoComplete="given-name"
                                handleChange={handleChange}
                                required
                                ariaLabelledBy="name"
                            />
                            <TextInput
                                type="text"
                                name="lastname"
                                id="lastname"
                                value={data.lastname}
                                placeholder="Last Name"
                                className="block w-full"
                                autoComplete="family-name"
                                handleChange={handleChange}
                                required
                                ariaLabelledBy="name"
                            />
                        </div>


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

                        <GroupLabel id="address" value="Address"></GroupLabel>
                        <div className="grid grid-cols-2 gap-2">
                            <label htmlFor="address1" className="hidden">Address Field 1</label>
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
                            <label htmlFor="address2" className="hidden">Address Field 2</label>
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
                            <label htmlFor="city" className="hidden">City</label>
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
                            <label htmlFor="state" className="hidden">State</label>
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
                            <label htmlFor="postcode" className="hidden">Postcode</label>
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
                            <label htmlFor="country" className="hidden">Country</label>
                            <CountryDropdown
                                value={data.country}
                                handleChange={handleChange}
                            />
                        </div>

                        <InputLabel forInput="type" value="School or Group" required />
                        <SelectInput className="self-center" name="type" id="type" value={data.type} handleChange={handleChange} required>
                            <option value="" disabled>Select&hellip;</option>
                            <option value="school">School</option>
                            <option value="group">Group</option>
                        </SelectInput>

                        <InputLabel forInput="numberOfStudents" value="Number of Students" required />
                        <NumberInput
                            name="numberOfStudents"
                            id="numberOfStudents"
                            max={1000}
                            value={data.numberOfStudents}
                            placeholder="Number of Students"
                            className="self-center block w-full"
                            autoComplete="off"
                            handleChange={handleChange}
                            required
                        />

                        <InputLabel forInput="ageRange" value="Target Student Age Range" />
                        <TextInput
                            type="text"
                            name="ageRange"
                            id="ageRange"
                            value={data.ageRange}
                            className="block w-full"
                            autoComplete="off"
                            handleChange={handleChange}
                        />

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
                        <PrimaryButton type="submit" className="w-1/3" processing={processing}>Request a Lesson</PrimaryButton>
                    </div>
                </form>
            </div>
        </WrapperLayout >
    )
}
