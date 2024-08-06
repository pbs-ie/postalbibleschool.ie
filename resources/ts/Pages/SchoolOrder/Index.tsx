import { router } from "@inertiajs/react";
import { useMemo } from "react";
import route from "ziggy-js";

import AdvancedTable from "@/Components/Tables/AdvancedTable";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { truncateString } from "@/helper";
import { createColumnHelper } from "@tanstack/react-table";

import ButtonLink from "@/Elements/Buttons/ButtonLink";
import SecondaryButton from "@/Elements/Buttons/SecondaryButton";
import IconHoverSpan from "@/Elements/Span/IconHoverSpan";

import RefreshIcon from "@/Elements/Icons/RefreshIcon";
import EditIcon from "@/Elements/Icons/EditIcon";
import Eye from "@/Elements/Icons/Eye";
import ChevronLeft from "@/Elements/Icons/ChevronLeft";

export default function Index({ lessonOrders }: { lessonOrders: LessonOrder[] }) {
    const getTypeFromDispatchCode = (code: string) => {
        switch (code) {
            case "DL": return "Donegal";
            case "G": return "Group";
            case "S": return "Delivery";
            case "SP": return "Postal";
            default: return "";
        }
    }

    const tableDataMemo = useMemo(() => lessonOrders, [lessonOrders]);


    const columnHelper = createColumnHelper<LessonOrder>();

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
        columnHelper.accessor(row => row.level0Order.toString(), {
            id: 'level0Order',
            header: () => <span className="text-nowrap">Level 0</span>,
            enableColumnFilter: false,
            meta: {
                className: "bg-bibletime-pink text-gray-50"
            }
        }),
        columnHelper.accessor(row => row.level1Order.toString(), {
            id: 'level1Order',
            header: () => <span className="text-nowrap">Level 1</span>,
            enableColumnFilter: false,
            meta: {
                className: "bg-bibletime-orange text-gray-50"
            }
        }),
        columnHelper.accessor(row => row.level2Order.toString(), {
            id: 'level2Order',
            header: () => <span className="text-nowrap">Level 2</span>,
            enableColumnFilter: false,
            meta: {
                className: "bg-bibletime-red text-gray-50"
            }
        }),
        columnHelper.accessor(row => row.level3Order.toString(), {
            id: 'level3Order',
            header: () => <span className="text-nowrap">Level 3</span>,
            enableColumnFilter: false,
            meta: {
                className: "bg-bibletime-green text-gray-50"
            }
        }),
        columnHelper.accessor(row => row.level4Order.toString(), {
            id: 'level4Order',
            header: () => <span className="text-nowrap">Level 4</span>,
            enableColumnFilter: false,
            meta: {
                className: "bg-bibletime-blue text-gray-50"
            }
        }),
        columnHelper.accessor(row => row.tlpOrder.toString(), {
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


    const handleDataSync = () => {
        router.get(route('orders.sync'));
    }

    return (
        <WrapperLayout>
            <ButtonLink hierarchy="transparent" href={route('dashboard')}><span className="flex items-center gap-2">
                <ChevronLeft />{"Back to Hub"}
            </span></ButtonLink>
            <ContentWrapper title="Filemaker Lesson Order">
                <div className="flex flex-col items-start gap-4 px-2 py-5 border md:px-10">
                    <div className="flex justify-between w-full mb-2">
                        <h2 className="p-0 text-xl font-bold text-black lg:text-2xl">Schools List</h2>
                        <div className="flex gap-2 text-sm">
                            <SecondaryButton onClick={handleDataSync}><span className="flex items-center gap-2">Sync Data <RefreshIcon /></span></SecondaryButton>
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