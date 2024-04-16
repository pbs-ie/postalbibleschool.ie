import { Column, Table } from "@tanstack/react-table"
import DebouncedInput from "../Forms/DebouncedInput"
import { useMemo } from "react"

export default function Filter<TData>({ column }: { column: Column<TData, unknown> }) {

    const columnFilterValue = column.getFilterValue();

    const sortedUniqueValues = useMemo(
        () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
        [column.getFacetedUniqueValues()]
    )

    return (
        <>
            <datalist className="bg-white text-black" id={column.id + 'list'}>
                {sortedUniqueValues.slice(0, 5000).map((value: any) => (
                    <option value={value} key={value} />
                ))}
            </datalist>
            <DebouncedInput
                type="text"
                value={(columnFilterValue ?? '') as string}
                onChange={value => column.setFilterValue(value)}
                placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
                className="w-36 font-normal border rounded-md text-sm"
                list={column.id + 'list'}
            />
        </>
    )
}