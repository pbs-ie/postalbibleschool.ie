import { ColumnDef, OnChangeFn, RowSelectionState, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import InputLabel2 from "../Forms/InputLabel2";
import TextInput from "../Forms/TextInput";
import ChevronUpDown from "@/Elements/Icons/ChevronUpDown";
import ChevronUp from "@/Elements/Icons/ChevronUp";
import ChevronDown from "@/Elements/Icons/ChevronDown";

interface AdvancedTableProps<TData, TValue> {
    data: TData[],
    columns: ColumnDef<TData, TValue>[],
    enableGlobalFilter?: boolean,
    enableRowSelection?: boolean,
    rowSelection?: RowSelectionState
    setRowSelection?: Dispatch<SetStateAction<RowSelectionState>>
}
export default function AdvancedTable<TData, TValue>({ data, columns, enableGlobalFilter = true, enableRowSelection = false, rowSelection, setRowSelection }: AdvancedTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [filtering, setFiltering] = useState('');

    const table = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
            rowSelection: rowSelection
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        enableRowSelection: enableRowSelection,
        enableGlobalFilter: enableGlobalFilter,
        onRowSelectionChange: setRowSelection,
    });

    return (
        <>
            {enableGlobalFilter &&
                <div className="flex items-center gap-2 mb-2">
                    <InputLabel2 forInput={"filter"} value={"Filter :"} />
                    <TextInput
                        placeholder="Search"
                        type={"text"}
                        name={"filter"}
                        id={"filter"}
                        value={filtering}
                        className={""}
                        handleChange={(e: ChangeEvent<HTMLInputElement>) => setFiltering(e.target.value)}
                    ></TextInput>
                </div>
            }
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-gray-100">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th scope="col" className="p-2 px-4 text-left" key={header.id}>
                                    {header.isPlaceholder ? null : (
                                        <div className={header.column.getCanSort()
                                            ? 'cursor-pointer select-none inline-flex items-center gap-2'
                                            : ''}
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {header.column.getCanSort() && {
                                                asc: <ChevronUp className="h-4 w-4" />,
                                                desc: <ChevronDown className="h-4 w-4" />,
                                                none: <ChevronUpDown className="h-4 w-4" />,
                                            }[header.column.getIsSorted() ? header.column.getIsSorted() as string : 'none']}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {table.getRowModel().rows.map(row => (
                        <tr className="hover:bg-gray-100" key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td className="p-2 px-4 w-2 text-base font-medium text-gray-900 whitespace-nowrap" key={cell.id}>
                                    <div className="flex items-center">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    {table.getFooterGroups().map(footerGroup => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.footer,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
        </>
    )
}