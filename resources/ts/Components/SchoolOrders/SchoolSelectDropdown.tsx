import { SchoolsList } from "@/Pages/SchoolOrder/Show";
import { useState } from "react";
import SelectInput from "@/Elements/Forms/SelectInput";
import { router } from "@inertiajs/react";
import route from "ziggy-js";

export default function SchoolSelectDropdown({ currentSchoolId, schoolsList }: { currentSchoolId: number, schoolsList: SchoolsList[] }) {
    const [inputValue, setInputValue] = useState(currentSchoolId);
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setInputValue(+event.target.value);
        router.visit(
            route('orders.show', event.target.value),
            {
                only: ['lessonOrder', 'classroomOrder'],
                preserveScroll: true
            });
    }

    return (
        <div className="relative flex items-center p-2 bg-gray-100 rounded w-fit lg:w-1/2">
            <span className="w-full font-bold">Select School: </span>
            <SelectInput
                handleChange={handleChange}
                defaultValue={inputValue + ""}
                className="w-full pr-5 text-sm font-normal border rounded-md"
            >
                {schoolsList.map((school) => (
                    <option key={school.id} value={school.id}>{school.schoolName}</option>
                ))}
            </SelectInput>
        </div>
    )
}