import { useState, useMemo } from "react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { MonthKeys, monthLessonMap, monthMap } from "@/constants";

import AdvancedTable from "@/Components/Tables/AdvancedTable";
import Heading2Alt from "@/Components/Typography/Heading2Alt";

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
    // ****************TABLE SECTION ***********************
    const defaultTotals = {
        level_0_totals: 0,
        level_1_totals: 0,
        level_2_totals: 0,
        level_3_totals: 0,
        level_4_totals: 0,
        tlp_totals: 0,
        all_totals: 0
    };

    const tableDataMemo = useMemo(() => projectedOrders, [projectedOrders]);
    const columnHelper = createColumnHelper<ProjectedOrders>();

    const defaultColumns: ColumnDef<ProjectedOrders, string>[] = [
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
        columnHelper.accessor(row => row.level, {
            header: "Level",
        }),
    ];
    Object.keys(monthMap).forEach((month) => {
        const monthKey = month as MonthKeys;
        defaultColumns.push(
            columnHelper.accessor(row => row[monthKey] + "", {
                header: `${monthMap[monthKey].substring(0, 3)}(${monthLessonMap[monthKey]})`,
                enableSorting: false
            })
        );
    })

    return (
        <div className="pt-10 text-left">
            <Heading2Alt>Projected Orders</Heading2Alt>
            <AdvancedTable
                data={tableDataMemo}
                columns={defaultColumns}
                enableGlobalFilter={false}
            />
        </div>
    )
}