import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import route from "ziggy-js";

import { getCurrentMonthNumber, monthLessonMap } from "@/constants";
import { getIconForLessonType } from "@/helper";

import AdvancedTable from "@/Components/Tables/AdvancedTable";
import TooltipCard from "@/Components/Cards/TooltipCard";
import Heading2Alt from "@/Components/Typography/Heading2Alt";

import InformationCircle from "@/Elements/Icons/InformationCircle";
import ButtonLink from "@/Elements/Buttons/ButtonLink";

export default function CurriculumListSection({ curriculumList, canViewCurriculum = false }: { curriculumList?: CurriculumProps[], canViewCurriculum?: boolean }) {

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
        }),
        columnHelper.display({
            id: 'sep-lesson',
            header: monthLessonMap.sep_lesson,
            cell: ({ row }) => (
                getIconForLessonType(row.original.sep_lesson)
            ),
            meta: { highlightColumn: getCurrentMonthNumber() + 1 === 9 }
        }),
        columnHelper.display({
            id: 'oct-lesson',
            header: monthLessonMap.oct_lesson,
            cell: ({ row }) => (
                getIconForLessonType(row.original.oct_lesson)
            ),
            meta: { highlightColumn: getCurrentMonthNumber() + 1 === 10 }
        }),
        columnHelper.display({
            id: 'nov-lesson',
            header: monthLessonMap.nov_lesson,
            cell: ({ row }) => (
                getIconForLessonType(row.original.nov_lesson)
            ),
            meta: { highlightColumn: getCurrentMonthNumber() + 1 === 11 }
        }),
        columnHelper.display({
            id: 'dec-lesson',
            header: monthLessonMap.dec_lesson,
            cell: ({ row }) => (
                getIconForLessonType(row.original.dec_lesson)
            ),
            meta: { highlightColumn: getCurrentMonthNumber() + 1 === 12 }
        }),
        columnHelper.display({
            id: 'jan-lesson',
            header: monthLessonMap.jan_lesson,
            cell: ({ row }) => (
                getIconForLessonType(row.original.jan_lesson)
            ),
            meta: { highlightColumn: getCurrentMonthNumber() + 1 === 1 }
        }),
        columnHelper.display({
            id: 'feb-lesson',
            header: monthLessonMap.feb_lesson,
            cell: ({ row }) => (
                getIconForLessonType(row.original.feb_lesson)
            ),
            meta: { highlightColumn: getCurrentMonthNumber() + 1 === 2 }
        }),
        columnHelper.display({
            id: 'mar-lesson',
            header: monthLessonMap.mar_lesson,
            cell: ({ row }) => (
                getIconForLessonType(row.original.mar_lesson)
            ),
            meta: { highlightColumn: getCurrentMonthNumber() + 1 === 3 }
        }),
        columnHelper.display({
            id: 'apr-lesson',
            header: monthLessonMap.apr_lesson,
            cell: ({ row }) => (
                getIconForLessonType(row.original.apr_lesson)
            ),
            meta: { highlightColumn: getCurrentMonthNumber() + 1 === 4 }
        }),
        columnHelper.display({
            id: 'may-lesson',
            header: monthLessonMap.may_lesson,
            cell: ({ row }) => (
                getIconForLessonType(row.original.may_lesson)
            ),
            meta: { highlightColumn: getCurrentMonthNumber() + 1 === 5 }
        }),
        columnHelper.display({
            id: 'jun-lesson',
            header: monthLessonMap.jun_lesson,
            cell: ({ row }) => (
                getIconForLessonType(row.original.jun_lesson)
            ),
            meta: { highlightColumn: getCurrentMonthNumber() + 1 === 6 }
        }),

    ];
    return (
        <div className="mb-4 lg:mb-10">
            <div className="flex justify-between mb-1">
                <span className="flex items-start gap-2">
                    <Heading2Alt>Curriculum</Heading2Alt>
                    <TooltipCard id={"classroom-tip"} text={"Curriculum sets the type of lesson that the classroom will be completing for the year. By default all students are set to do paper lessons. A curriculum only needs to be assigned for custom digital lessons during the year"} direction={"top"}>
                        <a href="#" className="pointer-events-none" aria-describedby="classroom-tip"><InformationCircle className="w-4 h-4 text-gray-600" /></a>
                    </TooltipCard>
                </span>
                {canViewCurriculum &&
                    <ButtonLink href={route('curriculum.index')}>Manage Curriculum</ButtonLink>
                }
            </div>
            {tableDataMemo && tableDataMemo.length > 0 ?
                <div className="w-full">
                    <AdvancedTable
                        data={tableDataMemo}
                        columns={defaultColumns}
                        enableGlobalFilter={false}
                        enableSorting={false}
                        enableHighlightedColumns
                    />
                </div>
                :
                <p className="text-gray-700">No curricula created</p>
            }
        </div>
    )
}