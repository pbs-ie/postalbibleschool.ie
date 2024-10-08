import { useMemo } from "react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { MonthKeys, monthMap } from "@/constants";

import AdvancedTable from "@/Components/Tables/AdvancedTable";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import { usePage } from "@inertiajs/react";
import DetailsSummary from "@/Elements/Sections/DetailsSummary";

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
export default function ProjectedOrdersSection({ projectedOrders = [] }: { projectedOrders: ProjectedOrders[], viewOnly?: boolean }) {
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
        <DetailsSummary defaultOpen summaryBody={
            <Heading2Alt>Paper Orders for the Year</Heading2Alt>
        }>
            <AdvancedTable
                data={tableDataMemo}
                columns={defaultColumns as ColumnDef<ProjectedOrders>[]}
                enableGlobalFilter={false}
            />
        </DetailsSummary>
    )
}