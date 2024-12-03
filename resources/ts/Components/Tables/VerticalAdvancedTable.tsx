import React from "react";
import { AdvancedTableProps } from "@/Components/Tables/AdvancedTable";
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, flexRender, Table, Header } from "@tanstack/react-table";
import ChevronDown from "@/Elements/Icons/ChevronDown";
import ChevronUp from "@/Elements/Icons/ChevronUp";
import ChevronUpDown from "@/Elements/Icons/ChevronUpDown";
import TableColumnFilter from "./TableColumnFilter";

export interface ListingTableData {
    headings: string[];
    content: JSX.Element[] | string[] | undefined;
}

export default function VerticalAdvancedTable<TData, TValue>({ data, columns }: AdvancedTableProps<TData, TValue>) {

    const table = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel()
    });

    function renderRemainingRowData(header: any, table: Table<TData>) {
        return (
            <>
                {table.getRowModel().rows.map((row) => {
                    const val = header.column.columnDef.accessorKey
                        ? row.original[header.column.columnDef.accessorKey as keyof TData] // Use `keyof TData` for type safety
                        : header.column.columnDef.accessorFn
                            ? header.column.columnDef.accessorFn(row.original)
                            : undefined;
                    return <td className="w-2 p-2 px-4 text-base text-gray-900 whitespace-nowrap border-r" key={row.id}>{String(val)}</td>;
                })}
            </>
        );
    }

    return (
        <div className="relative overflow-auto max-h-96 lg:max-h-[75dvh]">
            <table className="min-w-full divide-y divide-x divide-gray-200 table-auto border">
                {table.getHeaderGroups().map((headerGroup) =>
                    headerGroup.headers.map((header) => (
                        <tr key={header.id} className="hover:bg-gray-100" >
                            <th className={`${(header.colSpan > 1 ? "text-center" : "text-left")} p-2 pl-4 bg-gray-100 border-r`}>
                                {header.isPlaceholder
                                    ? null
                                    : (
                                        <div className="flex flex-col">
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
                                                    asc: <ChevronUp className="w-4 h-4" />,
                                                    desc: <ChevronDown className="w-4 h-4" />,
                                                    none: <ChevronUpDown className="w-4 h-4" />,
                                                }[header.column.getIsSorted() ? header.column.getIsSorted() as string : 'none']}
                                            </div>
                                        </div>
                                    )}
                            </th>
                            {renderRemainingRowData(header, table)}
                        </tr>
                    ))
                )}
            </table>
        </div>
    )
}