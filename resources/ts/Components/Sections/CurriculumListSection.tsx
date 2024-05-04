import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import AdvancedTable from "@/Components/Tables/AdvancedTable";
import InformationCircle from "@/Elements/Icons/InformationCircle";
import TooltipCard from "../Cards/TooltipCard";
import Heading2Alt from "../Typography/Heading2Alt";
import Newspaper from "@/Elements/Icons/Newspaper";
import DeviceTabletIcon from "@/Elements/Icons/DeviceTabletIcon";
import { getIconForLessonType } from "@/helper";

export default function CurriculumListSection({ curriculumList }: { curriculumList?: CurriculumProps[] }) {
    const columnHeaderMap = {
        "jan_lesson": "A1",
        "feb_lesson": "A2",
        "mar_lesson": "A3",
        "apr_lesson": "A4",
        "may_lesson": "A5",
        "jun_lesson": "A6",
        "sep_lesson": "C9",
        "oct_lesson": "C10",
        "nov_lesson": "C11",
        "dec_lesson": "C12",
    }
    const tableDataMemo = useMemo(() => curriculumList, [curriculumList]);
    const columnHelper = createColumnHelper<CurriculumProps>();


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
        columnHelper.accessor(row => row.name, {
            header: "Name",
            enableColumnFilter: false
        }),
        columnHelper.display({
            id: 'sep-lesson',
            header: columnHeaderMap.sep_lesson,
            enableColumnFilter: false,
            cell: ({ row }) => (
                getIconForLessonType(row.original.sep_lesson)
            ),
        }),
        columnHelper.display({
            id: 'oct-lesson',
            header: columnHeaderMap.oct_lesson,
            enableColumnFilter: false,
            cell: ({ row }) => (
                getIconForLessonType(row.original.oct_lesson)
            ),
        }),
        columnHelper.display({
            id: 'nov-lesson',
            header: columnHeaderMap.nov_lesson,
            enableColumnFilter: false,
            cell: ({ row }) => (
                getIconForLessonType(row.original.nov_lesson)
            ),
        }),
        columnHelper.display({
            id: 'dec-lesson',
            header: columnHeaderMap.dec_lesson,
            enableColumnFilter: false,
            cell: ({ row }) => (
                getIconForLessonType(row.original.dec_lesson)
            ),
        }),
        columnHelper.display({
            id: 'jan-lesson',
            header: columnHeaderMap.jan_lesson,
            enableColumnFilter: false,
            cell: ({ row }) => (
                getIconForLessonType(row.original.jan_lesson)
            ),
        }),
        columnHelper.display({
            id: 'feb-lesson',
            header: columnHeaderMap.feb_lesson,
            enableColumnFilter: false,
            cell: ({ row }) => (
                getIconForLessonType(row.original.feb_lesson)
            ),
        }),
        columnHelper.display({
            id: 'mar-lesson',
            header: columnHeaderMap.mar_lesson,
            enableColumnFilter: false,
            cell: ({ row }) => (
                getIconForLessonType(row.original.mar_lesson)
            ),
        }),
        columnHelper.display({
            id: 'apr-lesson',
            header: columnHeaderMap.apr_lesson,
            enableColumnFilter: false,
            cell: ({ row }) => (
                getIconForLessonType(row.original.apr_lesson)
            ),
        }),
        columnHelper.display({
            id: 'may-lesson',
            header: columnHeaderMap.may_lesson,
            enableColumnFilter: false,
            cell: ({ row }) => (
                getIconForLessonType(row.original.may_lesson)
            ),
        }),
        columnHelper.display({
            id: 'jun-lesson',
            header: columnHeaderMap.jun_lesson,
            enableColumnFilter: false,
            cell: ({ row }) => (
                getIconForLessonType(row.original.jun_lesson)
            ),
        }),

    ];
    return (
        <div className="mb-4">
            <span className="flex items-start gap-2">
                <Heading2Alt>Curriculum</Heading2Alt>
                <TooltipCard id={"classroom-tip"} text={"Curriculum sets the type of lesson that the classroom will be completing for the year. By default all students are set to do paper lessons. A curriculum only needs to be assigned for custom digital lessons during the year"} direction={"top"}>
                    <a href="#" className="pointer-events-none" aria-describedby="classroom-tip"><InformationCircle className="w-4 h-4 text-gray-600" /></a>
                </TooltipCard>
            </span>
            {tableDataMemo && tableDataMemo.length > 0 ?
                <div className="w-full">
                    <AdvancedTable
                        data={tableDataMemo}
                        columns={defaultColumns}
                        enableGlobalFilter={false}
                        enableSorting={false}
                    />
                </div>
                :
                <p className="text-gray-700">No curricula created</p>
            }
        </div>
    )
}