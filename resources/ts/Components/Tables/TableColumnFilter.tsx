import { Column, Table } from "@tanstack/react-table";
import DebouncedInput from "@/Components/Forms/DebouncedInput";
import { useMemo } from "react";
import CloseSolid from "@/Elements/Icons/CloseSolid";

export default function TableColumnFilter<TData>({ column }: { column: Column<TData, unknown> }) {

    const columnFilterValue = column.getFilterValue();

    const sortedUniqueValues = useMemo(
        () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
        [column.getFacetedUniqueValues()]
    )

    return (
        <div className="relative flex items-center w-fit">
            <datalist className="text-black bg-white" id={column.id + 'list'}>
                {["classroom-name"].includes(column.id) &&
                    <option value="-empty-" />
                }
                {sortedUniqueValues.slice(0, 5000).map((value: any) => (
                    <option value={value} key={value} />
                ))}
            </datalist>
            <DebouncedInput
                name="filter-text"
                type="text"
                value={(columnFilterValue ?? '') as string}
                onChange={value => column.setFilterValue(value)}
                placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
                className="pr-5 text-sm font-normal border rounded-md w-36"
                list={column.id + 'list'}
            />
            <button type="button" title="Clear filter" className="absolute right-2" onClick={() => column.setFilterValue("")}><CloseSolid className="w-4 h-4" /></button>
        </div>
    )
}