import SecondaryButton from "@/Elements/Buttons/SecondaryButton";
import EditIcon from "@/Elements/Icons/EditIcon";
import Eye from "@/Elements/Icons/Eye";
import AdvancedTable from "@/Components/Tables/AdvancedTable";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { truncateString } from "@/helper";
import { Link, router } from "@inertiajs/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import RefreshIcon from "@/Elements/Icons/RefreshIcon";

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
            header: () => <span className="p-2 text-white text-sm text-nowrap bg-bibletime-pink">Level 0</span>,
        }),
        columnHelper.accessor(row => row.level1Order.toString(), {
            id: 'level1Order',
            header: () => <span className="p-2 text-white text-sm text-nowrap bg-bibletime-orange">Level 1</span>,
        }),
        columnHelper.accessor(row => row.level2Order.toString(), {
            id: 'level2Order',
            header: () => <span className="p-2 text-white text-sm text-nowrap bg-bibletime-red">Level 2</span>,
        }),
        columnHelper.accessor(row => row.level3Order.toString(), {
            id: 'level3Order',
            header: () => <span className="p-2 text-white text-sm text-nowrap bg-bibletime-green">Level 3</span>,
        }),
        columnHelper.accessor(row => row.level4Order.toString(), {
            id: 'level4Order',
            header: () => <span className="p-2 text-white text-sm text-nowrap bg-bibletime-blue">Level 4</span>,
        }),
        columnHelper.accessor(row => row.tlpOrder.toString(), {
            header: 'TLP',
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex w-full gap-2 py-2">
                    <Link className="text-blue-500 underline hover:no-underline" href={"/orders/" + row.original.id + "/edit"}><EditIcon className="w-6 h-6" /> Edit</Link>
                    <Link className="text-blue-500 underline hover:no-underline" href={"/orders/" + row.original.id}><Eye className="w-6 h-6" /> View</Link>
                </div>
            )
        })
    ];


    const handleDataSync = () => {
        router.get(route('orders.sync'));
    }

    return (
        <WrapperLayout>
            <ContentWrapper title="Monthly Lesson Order">
                <div className="flex flex-col items-start gap-4 px-2 py-5 border md:px-10">
                    <div className="flex justify-between w-full mb-2">
                        <h2 className="p-0 text-xl font-bold text-black">View Schools</h2>
                        <div className="flex gap-2 text-sm">
                            <SecondaryButton onClick={handleDataSync}><span className="flex items-center gap-2">Sync Data <RefreshIcon /></span></SecondaryButton>
                        </div>

                    </div>
                    <AdvancedTable enableColumnFilters={true} enableGlobalFilter={false} data={tableDataMemo} columns={defaultColumns} />

                </div>
            </ContentWrapper>
        </WrapperLayout>
    )
}