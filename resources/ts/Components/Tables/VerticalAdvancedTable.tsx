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
        getCoreRowModel: getCoreRowModel()
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
                    return <td className="p-2 px-4 text-base text-gray-900 border-r whitespace-nowrap" key={row.id}>{String(val)}</td>;
                })}
            </>
        );
    }

    return (
        <div className="relative overflow-auto max-h-96 lg:max-h-[70dvh]">
            <table className="min-w-full border divide-x divide-y divide-gray-200 table-auto">
                <tbody>
                    {table.getHeaderGroups().map((headerGroup) =>
                        headerGroup.headers.map((header) => (
                            <tr key={header.id} className="border-b hover:bg-gray-100" >
                                <th className={`${(header.colSpan > 1 ? "text-center" : "text-left")} p-2 pl-4 bg-gray-100 border-r w-fit`}>
                                    {header.isPlaceholder
                                        ? null
                                        : (
                                            <div className="flex flex-col">
                                                <div>
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                </th>
                                {renderRemainingRowData(header, table)}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}