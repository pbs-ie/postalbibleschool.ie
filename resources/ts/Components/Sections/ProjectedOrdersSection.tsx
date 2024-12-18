import { usePage } from "@inertiajs/react";
import { useMemo } from "react";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { MonthKeys, monthMap } from "@/constants";

import AdvancedTable from "@/Components/Tables/AdvancedTable";
import TooltipCard from "@/Components/Cards/TooltipCard";

import DetailsSummary from "@/Elements/Sections/DetailsSummary";
import InformationCircle from "@/Elements/Icons/InformationCircle";

export interface ProjectedOrders {
    "jan_lesson": number
    "feb_lesson": number
    "mar_lesson": number
    "apr_lesson": number
    "may_lesson": number
    "jun_lesson": number
    "sep_lesson": number
    "oct_lesson": number
    "nov_lesson": number
    "dec_lesson": number
    "level": string
}
export default function ProjectedOrdersSection({ projectedOrders = [], hasClassrooms = false }: { projectedOrders: ProjectedOrders[], viewOnly?: boolean, hasClassrooms?: boolean }) {
    const { currentMonthToSeries } = usePage<PassedProps>().props;
    const tableDataMemo = useMemo(() => projectedOrders, [projectedOrders]);
    const columnHelper = createColumnHelper<ProjectedOrders>();

    const defaultColumns = [
        columnHelper.display({
            id: 'select-col',
            header: () => (
                <p>No.</p>
            ),
            cell: ({ row }) => (
                <div className="flex items-center">
                    {Number(row.id) + 1}
                </div>
            ),
        }),
        columnHelper.accessor(row => row.level.split("_").join(" "), {
            header: "Level",
        }),
    ];
    Object.keys(monthMap).forEach((month) => {
        const monthKey = month as MonthKeys;
        defaultColumns.push(
            columnHelper.accessor(row => row[monthKey] + "", {
                header: `${monthMap[monthKey].substring(0, 3)}(${currentMonthToSeries[monthKey]})`,
                enableSorting: false
            })
        );
    })

    return (
        <DetailsSummary defaultOpen summaryElement={
            <span className="flex gap-2 align-top">
                <p className="text-xl font-bold">Paper Orders for the Year</p>
                <TooltipCard id={"projection-tip"} text={"This section shows the paper lessons you will be sent for each month. The numbers are calculated based on the curriculum you have set for your classrooms"} direction={"top"}>
                    <a href="#" className="pointer-events-none" aria-describedby="projection-tip"><InformationCircle className="w-4 h-4 text-gray-600" /></a>
                </TooltipCard>
            </span>
        }>
            {hasClassrooms ?
                <AdvancedTable
                    data={tableDataMemo}
                    columns={defaultColumns as ColumnDef<ProjectedOrders>[]}
                    enableGlobalFilter={false}
                />
                :
                <p className="italic text-gray-500">No classroom found. Create a new one by clicking the button <b>Add New Classroom</b>.</p>
            }
        </DetailsSummary>
    )
}