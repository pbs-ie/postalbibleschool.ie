import { SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { ChangeEvent, useState } from "react";
import InputLabel2 from "../Forms/InputLabel2";
import TextInput from "../Forms/TextInput";

export default function AdvancedTable({ data, columns }: { data: any, columns: any }) {
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
            globalFilter: filtering
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering
    });

    return (
        <>
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
            <table className="w-full text-base text-left border border-black table-auto">
                <thead className="font-normal text-gray-500 border-b border-gray-400">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th className="p-2" key={header.id}>
                                    {header.isPlaceholder ? null : (
                                        <div className={header.column.getCanSort()
                                            ? 'cursor-pointer select-none'
                                            : ''}
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {header.column.getCanSort() && {
                                                asc: ' 🔼',
                                                desc: ' 🔽',
                                                none: ' ↕️',
                                            }[header.column.getIsSorted() ? header.column.getIsSorted() as string : 'none']}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr className="even:bg-gray-100" key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td className="px-2 min-w-[50px]" key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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