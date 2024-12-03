import { SunscoolStudentProps } from "@/Pages/Settings/Sunscool/Index"
import { ColumnDef, createColumnHelper, RowSelectionState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import AdvancedTable from "@/Components/Tables/AdvancedTable";
import CheckboxInput from "@/Elements/Forms/CheckboxInput";
import Heading3 from "@/Components/Typography/Heading3";

interface FormProps {
    studentName: string,
    lessons?: SunscoolStudentProps["lessons"]
}
export default function SunscoolMarksForm({ studentName, lessons = [] }: FormProps) {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    const tableData = useMemo(() => lessons, [lessons]);

    const columnHelper = createColumnHelper<SunscoolStudentProps["lessons"][0]>();

    const defaultColumns = [
        columnHelper.display({
            id: 'select-col',
            header: ({ table }) => (
                <label htmlFor="checkbox-all" className="rounded hover:bg-black/10">
                    <CheckboxInput
                        id="checkbox-all"
                        isChecked={table.getIsAllRowsSelected()}
                        handleChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
                    />
                    <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                </label>
            ),
            cell: ({ row }) => (
                <label htmlFor={"checkbox-" + row.id} className="flex items-center rounded hover:bg-black/10">
                    <CheckboxInput
                        id={"checkbox-" + row.id}
                        isChecked={row.getIsSelected()}
                        handleChange={row.getToggleSelectedHandler()}
                    />
                    <label htmlFor={"checkbox-" + row.id} className="sr-only">checkbox</label>
                </label>
            ),
        }),
        columnHelper.accessor(row => row.bibletime, {
            header: "Bibletime",
        }),
        columnHelper.accessor(row => row.level, {
            header: "Level",
        }),
        columnHelper.accessor(row => row.progress, {
            header: "Progress",
        })
    ];

    return (
        <div className="border rounded-md shadow-md p-4 ">
            <Heading3>Sunscool Data</Heading3>
            {
                <AdvancedTable
                    data={tableData}
                    columns={defaultColumns as ColumnDef<SunscoolStudentProps["lessons"][0]>[]}
                    enableGlobalFilter={false}
                    enableRowSelection={true}
                    rowSelection={rowSelection}
                    setRowSelection={setRowSelection}
                />
            }
        </div>
    )
}