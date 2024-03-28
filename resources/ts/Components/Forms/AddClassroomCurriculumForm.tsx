import Heading2Nospace from "@/Components/Typography/Heading2Nospace";
import { FormEvent, useMemo, useState } from "react";
import { RowSelectionState, createColumnHelper } from "@tanstack/react-table";
import AdvancedTable from "@/Components/Tables/AdvancedTable";
import RadioInput from "./RadioInput";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import { router } from "@inertiajs/react";

export default function AddClassroomCurriculumForm({ curricula, classroomId, onClose }: { curricula: CurriculumProps[], classroomId: number, onClose: () => void }) {
    const tableDataMemo = useMemo(() => curricula, [curricula]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});


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
            header: "Name"
        }),
        columnHelper.accessor(row => row.curriculum_type, {
            header: "Type"
        }),
        columnHelper.accessor(row => row.jan_lesson, {
            header: "Jan",
            enableSorting: false
        }),
        columnHelper.accessor(row => row.feb_lesson, {
            header: "Feb",
            enableSorting: false
        }),
        columnHelper.accessor(row => row.mar_lesson, {
            header: "Mar",
            enableSorting: false
        }),
        columnHelper.accessor(row => row.apr_lesson, {
            header: "Apr",
            enableSorting: false
        }),
        columnHelper.accessor(row => row.may_lesson, {
            header: "May",
            enableSorting: false
        }),
        columnHelper.accessor(row => row.jun_lesson, {
            header: "Jun",
            enableSorting: false
        }),
        columnHelper.accessor(row => row.sep_lesson, {
            header: "Sep",
            enableSorting: false
        }),
        columnHelper.accessor(row => row.oct_lesson, {
            header: "Oct",
            enableSorting: false
        }),
        columnHelper.accessor(row => row.nov_lesson, {
            header: "Nov",
            enableSorting: false
        }),
        columnHelper.accessor(row => row.dec_lesson, {
            header: "Dec",
            enableSorting: false
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
                        <PrimaryButton processing={Object.keys(rowSelection).length === 0} dataTest="submit_btn" type="submit">Add Selected</PrimaryButton>
                    </div>
                </form>
            }
        </article>
    )
}