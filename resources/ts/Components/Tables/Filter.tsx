import { Column, Table } from "@tanstack/react-table"
import DebouncedInput from "../Forms/DebouncedInput"
import { useMemo } from "react"
import CloseSolid from "@/Elements/Icons/CloseSolid";
import CloseX from "@/Elements/Icons/CloseX";

export default function Filter<TData>({ column }: { column: Column<TData, unknown> }) {

    const columnFilterValue = column.getFilterValue();

    const sortedUniqueValues = useMemo(
        () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
        [column.getFacetedUniqueValues()]
    )

    return (
        <div className="flex relative w-fit items-center">
            <datalist className="bg-white text-black" id={column.id + 'list'}>
                {["classroom-name"].includes(column.id) &&
                    <option value="-empty-" />
                }
                {sortedUniqueValues.slice(0, 5000).map((value: any) => (
                    <option value={value} key={value} />
                ))}
            </datalist>
            <DebouncedInput
                type="text"
                value={(columnFilterValue ?? '') as string}
                onChange={value => column.setFilterValue(value)}
                placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
                className="w-36 font-normal border rounded-md text-sm pr-5"
                list={column.id + 'list'}
            />
            <button title="Clear filter" className="absolute right-2" onClick={() => column.setFilterValue("")}><CloseSolid className="w-4 h-4" /></button>
        </div>
    )
}