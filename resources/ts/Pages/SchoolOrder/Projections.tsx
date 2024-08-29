import { useMemo } from "react";
import route from "ziggy-js";

import AdvancedTable from "@/Components/Tables/AdvancedTable";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { truncateString } from "@/helper";
import { createColumnHelper } from "@tanstack/react-table";

import ButtonLink from "@/Elements/Buttons/ButtonLink";
import IconHoverSpan from "@/Elements/Span/IconHoverSpan";

import EditIcon from "@/Elements/Icons/EditIcon";
import Eye from "@/Elements/Icons/Eye";
import ChevronLeft from "@/Elements/Icons/ChevronLeft";
import MonthSelectDropdown from "@/Components/SchoolOrders/MonthSelectDropdown";
import { MonthKeys, MonthToSeriesMap } from "@/constants";

interface ProjectedOrdersProps {
    id: number;
    schoolName: string;
    schoolType: string;
    contactName: string;
    level_0: number;
    level_1: number;
    level_2: number;
    level_3: number;
    level_4: number;
    tlp: number;
}
export default function Index({ projectedOrders, currentMonth, currentMonthToSeries }: { projectedOrders: ProjectedOrdersProps[], currentMonth: string, currentMonthToSeries: MonthToSeriesMap }) {
    const monthNames = ['sep', 'oct', 'nov', 'dec', 'jan', 'feb', 'mar', 'apr', 'may', 'jun'];

    const monthList = monthNames.map(name => ({
        name,
        series: currentMonthToSeries[`${name}_lesson` as MonthKeys]
    }));
    const getTypeFromDispatchCode = (code: string) => {
        switch (code) {
            case "DL": return "Donegal";
            case "G": return "Group";
            case "S": return "Delivery";
            case "SP": return "Postal";
            default: return "";
        }
    }

    const tableDataMemo = useMemo(() => projectedOrders, [projectedOrders]);


    const columnHelper = createColumnHelper<ProjectedOrdersProps>();

    const defaultColumns = [
        columnHelper.accessor(row => truncateString(row.schoolName, 20), {
            id: 'schoolName',
            header: 'School Name',
            maxSize: 20,
            enableColumnFilter: true
        }),
        columnHelper.accessor(row => getTypeFromDispatchCode(row.schoolType), {
            id: 'schoolType',
            header: 'School Type',
            minSize: 100,
            enableColumnFilter: true
        }),
        columnHelper.accessor(row => row.level_0.toString(), {
            id: 'level0Order',
            header: () => <span className="text-nowrap">Level 0</span>,
            enableColumnFilter: false,
            meta: {
                className: "bg-bibletime-pink text-gray-50"
            }
        }),
        columnHelper.accessor(row => row.level_1.toString(), {
            id: 'level1Order',
            header: () => <span className="text-nowrap">Level 1</span>,
            enableColumnFilter: false,
            meta: {
                className: "bg-bibletime-orange text-gray-50"
            }
        }),
        columnHelper.accessor(row => row.level_2.toString(), {
            id: 'level2Order',
            header: () => <span className="text-nowrap">Level 2</span>,
            enableColumnFilter: false,
            meta: {
                className: "bg-bibletime-red text-gray-50"
            }
        }),
        columnHelper.accessor(row => row.level_3.toString(), {
            id: 'level3Order',
            header: () => <span className="text-nowrap">Level 3</span>,
            enableColumnFilter: false,
            meta: {
                className: "bg-bibletime-green text-gray-50"
            }
        }),
        columnHelper.accessor(row => row.level_4.toString(), {
            id: 'level4Order',
            header: () => <span className="text-nowrap">Level 4</span>,
            enableColumnFilter: false,
            meta: {
                className: "bg-bibletime-blue text-gray-50"
            }
        }),
        columnHelper.accessor(row => row.tlp.toString(), {
            header: 'TLP',
            enableColumnFilter: false,
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex w-full gap-2 text-sm">
                    <IconHoverSpan>
                        <ButtonLink hierarchy="transparent" size="xsmall" href={route('orders.edit', row.original.id)}><EditIcon /> Edit</ButtonLink>
                    </IconHoverSpan>
                    <IconHoverSpan>
                        <ButtonLink hierarchy="transparent" size="xsmall" href={route('orders.show', row.original.id)}><Eye /> View</ButtonLink>
                    </IconHoverSpan>
                </div>
            )
        })
    ];

    return (
        <WrapperLayout>
            <ButtonLink hierarchy="transparent" href={route('orders.index')}><span className="flex items-center gap-2">
                <ChevronLeft />{"Back to Filemaker Orders"}
            </span></ButtonLink>
            <ContentWrapper title="Lesson Order Projections">
                <div className="flex flex-col items-start gap-4 px-2 py-5 border md:px-10">
                    <div className="flex items-center w-full mb-2">
                        <div className="w-64">
                            <MonthSelectDropdown currentMonth={currentMonth} monthList={monthList} />
                        </div>
                    </div>
                    <div className="w-full">
                        <AdvancedTable enableColumnFilters={true} enableGlobalFilter={false} data={tableDataMemo} columns={defaultColumns} />
                    </div>

                </div>
            </ContentWrapper>
        </WrapperLayout>
    )
}