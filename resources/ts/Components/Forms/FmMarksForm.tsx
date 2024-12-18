import { FmDataProps } from "@/Pages/Settings/Sunscool/Index"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import Heading3 from "@/Components/Typography/Heading3";
import VerticalAdvancedTable from "@/Components/Tables/VerticalAdvancedTable";

interface FormProps {
    studentName: string,
    fmData: FmDataProps;
}
export default function FmMarksForm({ studentName, fmData }: FormProps) {

    const tableData = useMemo(() => fmData.portalData, [fmData.portalData]);

    const columnHelper = createColumnHelper<FmDataProps["portalData"][0]>();

    const defaultColumns = [
        columnHelper.accessor(row => row.yearDescription, {
            header: "Year"
        }),
        columnHelper.accessor(row => row.yearFormat, {
            header: "Year Format"
        }),
        columnHelper.accessor(row => row.grade, {
            header: "Level"
        }),
        columnHelper.accessor(row => row.month1, {
            header: fmData.monthNames.monthName1
        }),
        columnHelper.accessor(row => row.month2, {
            header: fmData.monthNames.monthName2
        }),
        columnHelper.accessor(row => row.month3, {
            header: fmData.monthNames.monthName3
        }),
        columnHelper.accessor(row => row.month4, {
            header: fmData.monthNames.monthName4
        }),
        columnHelper.accessor(row => row.month5, {
            header: fmData.monthNames.monthName5
        }),
        columnHelper.accessor(row => row.month6, {
            header: fmData.monthNames.monthName6
        }),
        columnHelper.accessor(row => row.month7, {
            header: fmData.monthNames.monthName7
        }),
        columnHelper.accessor(row => row.month8, {
            header: fmData.monthNames.monthName8
        }),
        columnHelper.accessor(row => row.month9, {
            header: fmData.monthNames.monthName9
        }),
        columnHelper.accessor(row => row.month10, {
            header: fmData.monthNames.monthName10
        }),
        columnHelper.accessor(row => row.yearPercentage, {
            header: "Percentage"
        })
    ];
    return (
        <div className="border rounded-md shadow-md lg:w-96 p-4">
            <Heading3>FileMaker Data</Heading3>
            <VerticalAdvancedTable
                data={tableData}
                columns={defaultColumns as ColumnDef<FmDataProps["portalData"][0]>[]}
            />
        </div>
    )
}