import { ChangeEventHandler } from "react";

interface Select {
    handleChange: ChangeEventHandler<HTMLSelectElement>
    startYear?: number;
    endYear?: number;
}
export default function YearSelect({ startYear = 1900, endYear = new Date().getFullYear(), handleChange, ...props }: Select & React.SelectHTMLAttributes<HTMLSelectElement>) {
    const yearsList = Array.from({ length: endYear - startYear }, (_, i) => startYear + i);
    return (
        <select
            {...props}
            className="text-gray-700 transition ease-in-out border-gray-400 rounded-md shadow-sm bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 focus-within:text-inherit "
            onChange={(e) => handleChange(e)}>
            {yearsList.map((year) =>
                <option key={year} value={year}>{year}</option>
            )}
        </select>
    )
}