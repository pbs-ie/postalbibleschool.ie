import Heading2Nospace from "@/Components/Typography/Heading2Nospace";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { RowSelectionState, createColumnHelper } from "@tanstack/react-table";
import AdvancedTable from "@/Components/Tables/AdvancedTable";
import RadioInput from "@/Elements/Forms/RadioInput";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import { router } from "@inertiajs/react";
import { getIconForLessonType } from "@/helper";
import route from "ziggy-js";

export default function AddClassroomCurriculumForm({ curricula, classroomId, onClose }: { curricula: CurriculumProps[], classroomId: number, onClose: () => void }) {
    const tableDataMemo = useMemo(() => curricula, [curricula]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    useEffect(() => {
        setRowSelection({ 0: true });
    }, [])

    const columnHelper = createColumnHelper<CurriculumProps>();

    const defaultColumns = [
        columnHelper.display({
            id: 'select-col',
            cell: ({ table, row }) => (
                <label htmlFor={"checkbox" + row.original.id} className="flex items-center p-1 hover:bg-black/10 rounded-full">
                    <RadioInput
                        id={"checkbox" + row.original.id}
                        checked={row.getIsSelected()}
                        handleChange={() => {
                            const selected = row.getIsSelected();
                            table.toggleAllRowsSelected(false);
                            row.toggleSelected(!selected);
                        }}
                        name={"checkbox" + row.original.id}
                        value={row.original.id + ""} />
                    <label htmlFor={"checkbox" + row.original.id} className="sr-only">checkbox</label>
                </label>
            ),
        }),
        columnHelper.accessor(row => row.name, {
            header: "Name",
        }),
        columnHelper.display({
            id: 'sep-lesson',
            header: "Sep",
            enableSorting: false,
            cell: ({ row }) => {
                return getIconForLessonType(row.original.sep_lesson)
            }
        }),
        columnHelper.display({
            id: 'oct-lesson',
            header: "Oct",
            enableSorting: false,
            cell: ({ row }) => {
                return getIconForLessonType(row.original.oct_lesson)
            }
        }),
        columnHelper.display({
            id: 'nov-lesson',
            header: "Nov",
            enableSorting: false,
            cell: ({ row }) => {
                return getIconForLessonType(row.original.nov_lesson)
            }
        }),
        columnHelper.display({
            id: 'dec-lesson',
            header: "Dec",
            enableSorting: false,
            cell: ({ row }) => {
                return getIconForLessonType(row.original.dec_lesson)
            }
        }),
        columnHelper.display({
            id: 'jan-lesson',
            header: "Jan",
            enableSorting: false,
            cell: ({ row }) => {
                return getIconForLessonType(row.original.jan_lesson)
            },
        }),
        columnHelper.display({
            id: 'feb-lesson',
            header: "Feb",
            enableSorting: false,
            cell: ({ row }) => {
                return getIconForLessonType(row.original.feb_lesson)
            },
        }),
        columnHelper.display({
            id: 'mar-lesson',
            header: "Mar",
            enableSorting: false,
            cell: ({ row }) => {
                return getIconForLessonType(row.original.mar_lesson)
            },
        }),
        columnHelper.display({
            id: 'apr-lesson',
            header: "Apr",
            enableSorting: false,
            cell: ({ row }) => {
                return getIconForLessonType(row.original.apr_lesson)
            }
        }),
        columnHelper.display({
            id: 'may-lesson',
            header: "May",
            enableSorting: false,
            cell: ({ row }) => {
                return getIconForLessonType(row.original.may_lesson)
            }
        }),
        columnHelper.display({
            id: 'jun-lesson',
            header: "Jun",
            enableSorting: false,
            cell: ({ row }) => {
                return getIconForLessonType(row.original.jun_lesson)
            }
        }),

    ]

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let idSelection;
        curricula.forEach((curriculum, idx) => {
            if (rowSelection[idx])
                idSelection = curriculum.id
        });
        onClose();
        router.post(route('classroom.curriculum.store'), {
            classroomId: classroomId,
            curriculumId: idSelection
        });
    }

    return (
        <article>
            <Heading2Nospace className="mb-3">Select Curriculum</Heading2Nospace>
            {curricula.length === 0 ?
                <p>No curricula found</p>
                :
                <form onSubmit={handleSubmit}>
                    <AdvancedTable
                        data={tableDataMemo}
                        columns={defaultColumns}
                        enableGlobalFilter={false}
                        enableRowSelection={true}
                        rowSelection={rowSelection}
                        setRowSelection={setRowSelection}
                    />
                    <div className="flex w-full justify-end gap-2">
                        <PrimaryButton processing={Object.keys(rowSelection).length === 0} dataTest="submit_btn" type="submit">Save</PrimaryButton>
                    </div>
                </form>
            }
        </article>
    )
}