import { router } from "@inertiajs/react";
import route from "ziggy-js";
import { useState } from "react";

import SelectInput from "@/Elements/Forms/SelectInput";

interface MonthList {
    name: string;
    series: string;
}
export default function MonthSelectDropdown({ currentMonth, monthList }: { currentMonth: string, monthList: MonthList[] }) {
    const [inputValue, setInputValue] = useState(currentMonth);
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setInputValue(event.target.value);
        router.visit(
            route('orders.projections', event.target.value),
            {
            });
    }

    return (
        <div className="relative flex items-baseline w-full gap-2 p-2">
            <span className="w-full font-bold">Select Month: </span>
            <SelectInput
                handleChange={handleChange}
                defaultValue={inputValue}
                className="w-full pr-5 text-sm font-normal uppercase border rounded-md"
            >
                {monthList.map((month) => (
                    <option className="uppercase" key={month.name} value={month.name}>{month.name} - {month.series}</option>
                ))}
            </SelectInput>
        </div>
    )
}