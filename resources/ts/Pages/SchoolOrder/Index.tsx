import { router } from "@inertiajs/react";
import { useMemo } from "react";
import route from "ziggy-js";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { truncateString } from "@/helper";
import { MonthKeys, MonthToSeriesMap } from "@/constants";

import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";

import AdvancedTable from "@/Components/Tables/AdvancedTable";
import MonthSelectDropdown from "@/Components/SchoolOrders/MonthSelectDropdown";

import ButtonLink from "@/Elements/Buttons/ButtonLink";
import SecondaryButton from "@/Elements/Buttons/SecondaryButton";
import IconHoverSpan from "@/Elements/Span/IconHoverSpan";
import RefreshIcon from "@/Elements/Icons/RefreshIcon";
import Eye from "@/Elements/Icons/Eye";
import ChevronLeft from "@/Elements/Icons/ChevronLeft";
import CloudArrowUp from "@/Elements/Icons/CloudArrowUp";
import Download from "@/Elements/Icons/Download";
import Group from "@/Elements/Icons/Group";
import DatabaseIcon from "@/Elements/Icons/DatabaseIcon";
import AnchorLink from "@/Components/Navigation/AnchorLink";

interface ProjectedOrdersProps {
    id: number;
    schoolName: string;
    schoolType: string;
    hasDigitalClass: boolean;
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
        columnHelper.accessor(row => row.schoolName, {
            id: 'schoolName',
            header: 'School Name',
            maxSize: 20,
            enableColumnFilter: true,
            cell: ({ row }) => (
                <span title={row.original.schoolName}>{truncateString(row.original.schoolName, 20)}</span>
            )
        }),
        columnHelper.accessor(row => getTypeFromDispatchCode(row.schoolType), {
            id: 'schoolType',
            header: 'School Type',
            minSize: 100,
            enableColumnFilter: true
        }),
        columnHelper.accessor(row => row.hasDigitalClass ? "Yes" : "No", {
            id: 'hasDigital',
            header: 'Digital this month',
            maxSize: 20,
            enableSorting: false,
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
                        <ButtonLink hierarchy="transparent" size="xsmall" href={route('schools.show', row.original.id)}><Eye /> View</ButtonLink>
                    </IconHoverSpan>
                    <IconHoverSpan>
                        <ButtonLink hierarchy="transparent" size="xsmall" href={route('schools.students', row.original.id)}><span className="inline-flex flex-col items-center">
                            <Group /> Students
                        </span></ButtonLink>
                    </IconHoverSpan>
                </div>
            ),
            meta: { isPinned: "right" }
        })
    ];


    const handleDataSync = () => {
        router.get(route('schools.sync'));
    }
    const handleClassroomPopulate = () => {
        router.get(route('schools.createdefaultclassrooms'));
    }
    const handleDataPush = () => {
        router.post(route('schools.push'), {
            month: currentMonth
        });
    }

    return (
        <WrapperLayout>
            <ButtonLink hierarchy="transparent" href={route('dashboard')}><span className="flex items-center gap-2">
                <ChevronLeft />{"Back to Hub"}
            </span></ButtonLink>
            <ContentWrapper title="Paper Orders by Month">
                <div className="flex flex-col items-start gap-4 px-2 py-5 border md:px-10">
                    <div className="flex flex-col justify-between w-full mb-2 lg:flex-row">
                        <div className="w-full bg-blue-500 rounded-md lg:w-64">
                            <MonthSelectDropdown currentMonth={currentMonth} monthList={monthList} />
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-sm shrink">
                            <SecondaryButton size="small" onClick={handleClassroomPopulate} Icon={RefreshIcon}>Restore Default Classrooms</SecondaryButton>
                            <SecondaryButton size="small" onClick={handleDataSync} Icon={DatabaseIcon}>Pull all schools from FM</SecondaryButton>
                            <SecondaryButton size="small" onClick={handleDataPush} Icon={CloudArrowUp}>Push Month to FM</SecondaryButton>
                            <AnchorLink href={route('schools.export', currentMonth)} Icon={Download}>Download Excel</AnchorLink>
                        </div>
                    </div>
                    <div className="flex items-center w-full mb-2">
                        <AdvancedTable enableColumnFilters={true} enableGlobalFilter={false} data={tableDataMemo} columns={defaultColumns as ColumnDef<ProjectedOrdersProps>[]} />
                    </div>

                </div>
            </ContentWrapper>
        </WrapperLayout>
    )
}