import { ColumnDef, ColumnFiltersState, OnChangeFn, RowSelectionState, SortingState, flexRender, getCoreRowModel, getFacetedUniqueValues, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import ChevronUpDown from "@/Elements/Icons/ChevronUpDown";
import ChevronUp from "@/Elements/Icons/ChevronUp";
import ChevronDown from "@/Elements/Icons/ChevronDown";
import TableColumnFilter from "@/Components/Tables/TableColumnFilter";
import InputLabel2 from "@/Elements/Forms/InputLabel2";
import TextInput from "@/Elements/Forms/TextInput";

export interface AdvancedTableProps<TData, TValue> {
    data: TData[],
    columns: ColumnDef<TData, TValue>[],
    enableGlobalFilter?: boolean,
    enableColumnFilters?: boolean,
    enableRowSelection?: boolean,
    enableSorting?: boolean,
    rowSelection?: RowSelectionState,
    searchPlaceholder?: string,
    setRowSelection?: Dispatch<SetStateAction<RowSelectionState>>
    enableHighlightedColumns?: boolean
}
export default function AdvancedTable<TData, TValue>({
    data,
    columns,
    searchPlaceholder,
    enableGlobalFilter = true,
    enableColumnFilters = false,
    enableRowSelection = false,
    enableSorting = true,
    rowSelection = {},
    setRowSelection = () => { },
    enableHighlightedColumns = false
}: AdvancedTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [filtering, setFiltering] = useState('');
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
            rowSelection: rowSelection,
            columnFilters: columnFilters
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        enableRowSelection: enableRowSelection,
        enableGlobalFilter: enableGlobalFilter,
        enableSorting: enableSorting,
        enableColumnFilters: enableColumnFilters,
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setColumnFilters
    });

    const getPinnedStyling = (isPinned: "left" | "right" | "") => {
        if (isPinned === "")
            return "";
        else if (isPinned === "right")
            return "sticky right-0 shadow-[inset_4px_0px_2px_-4px_gray] bg-white";
        else if (isPinned === "left")
            return "sticky left-0 shadow-[inset_-4px_0px_2px_-4px_gray] bg-white";
    }

    const getPinnedStylingHead = (isPinned: "left" | "right" | "") => {
        if (isPinned === "")
            return "";
        else if (isPinned === "right")
            return "sticky right-0 shadow-[inset_4px_0px_2px_-4px_gray] z-30 bg-gray-100";
        else if (isPinned === "left")
            return "sticky left-0 shadow-[inset_-4px_0px_2px_-4px_gray] z-30 bg-gray-100";
    }

    const getIsSelectedStyling = (isSelected = false) => {
        if (isSelected) {
            return "bg-blue-100";
        } else {
            return "hover:bg-gray-100"
        }
    }

    return (
        <>
            {enableGlobalFilter &&
                <div className="flex items-center gap-2 mb-2 ">
                    <InputLabel2 forInput={"filter"} value={"Filter :"} />
                    <TextInput
                        placeholder={searchPlaceholder ?? "Search all columns..."}
                        type={"text"}
                        name={"filter"}
                        id={"filter"}
                        value={filtering}
                        className={""}
                        handleChange={(e: ChangeEvent<HTMLInputElement>) => setFiltering(e.target.value)}
                    ></TextInput>
                </div>
            }
            <div className="relative overflow-auto max-h-96 lg:max-h-[75dvh]">
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                    {enableHighlightedColumns &&
                        <colgroup>
                            {table.getFlatHeaders().map((header, index) => (
                                // @ts-ignore Meta may have highlightColumn
                                header.column.columnDef.meta?.highlightColumn ?? false ?
                                    <col
                                        key={index}
                                        className="border-2 border-blue-500"
                                    /> :
                                    <col key={index} />
                            ))}
                        </colgroup>
                    }
                    <thead >
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className="sticky top-0 z-10 bg-gray-100 table-row">
                                {headerGroup.headers.map(header => (
                                    // @ts-ignore Meta may have className
                                    <th colSpan={header.colSpan} scope="col" className={`${(header.column.columnDef.meta?.className ?? "")} ${getPinnedStylingHead(header.column.columnDef.meta?.isPinned ?? "")} ${(header.colSpan > 1 ? "text-center" : "text-left")} p-2 pl-4`} key={header.id}>
                                        {header.isPlaceholder ? null : (
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
                                                {header.column.getCanFilter() && (
                                                    <TableColumnFilter column={header.column} />
                                                )
                                                }
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="overflow-y-auto bg-white divide-y divide-gray-200 max-h-96">
                        {table.getRowModel().rows.map(row => (
                            <tr className={getIsSelectedStyling(row.getIsSelected())} key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    // @ts-ignore Meta may have className
                                    <td className={`${getPinnedStyling(cell.column.columnDef.meta?.isPinned ?? "")} w-2 p-2 px-4 text-base font-medium text-gray-900 whitespace-nowrap`} key={cell.id}>
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
                            <tr className="bg-gray-100" key={footerGroup.id}>
                                {footerGroup.headers.map(header => (
                                    <th className={header.column.columnDef.footer ? "text-left p-2 px-4" : ""} key={header.id}>
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
            </div>
        </>
    )
}