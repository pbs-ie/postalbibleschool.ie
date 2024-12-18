import { router } from "@inertiajs/react";
import route from "ziggy-js";
import { useState } from "react";

import SelectInput from "@/Elements/Forms/SelectInput";

export type SchoolsListProps = Pick<SchoolProps, "id" | "schoolName">;

export default function SchoolSelectDropdown({ currentSchoolId, schoolsList }: { currentSchoolId: number, schoolsList: SchoolsListProps[] }) {
    const [inputValue, setInputValue] = useState(currentSchoolId);
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setInputValue(+event.target.value);
        router.visit(
            route('schools.show', event.target.value),
            {
                only: ['schoolDetails', 'classrooms', 'projectedOrders'],
                preserveScroll: true
            });
    }

    return (
        <div className="relative flex items-baseline p-2 w-fit lg:w-1/2">
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