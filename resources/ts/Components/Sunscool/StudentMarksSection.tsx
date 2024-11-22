import { useEffect, useMemo, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { ColumnDef, createColumnHelper, RowSelectionState } from "@tanstack/react-table";
import route from "ziggy-js";
import _ from "lodash";
import { modalHelper } from "@/helper";

import { SunscoolStudentProps } from "@/Pages/Settings/Sunscool/Index";

import ListingTable, { ListingTableData } from "@/Components/Tables/ListingTable";
import AdvancedTable from "@/Components/Tables/AdvancedTable";
import CheckboxInput from "@/Components/Forms/CheckboxInput";
import ErrorBanner from "@/Components/Forms/ErrorBanner";
import PopupModal from "@/Components/Modals/PopupModal";
import Heading2Alt from "@/Components/Typography/Heading2Alt";

import BasicButton from "@/Elements/Buttons/BasicButton";
import IconHoverSpan from "@/Elements/Span/IconHoverSpan";
import Eye from "@/Elements/Icons/Eye";

interface GroupedStudent {
    pbsId: number | null;
    sunscoolId: number;
    name: string;
    language: string;
    level: number;
    lessons: {
        bibletime: string;
        progress: number;
    }[];
}

export default function StudentMarksSection({ schoolId, students }: { schoolId: number, students: SunscoolStudentProps[] }) {
    const { errors } = usePage().props;
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [lessonsToView, setLessonsToView] = useState<GroupedStudent["lessons"]>();
    const [nameToView, setNameToView] = useState<GroupedStudent["name"]>();
    const { dialogRef, showModal, closeModal } = modalHelper();

    useEffect(() => {
        setRowSelection({});
    }, [students]);

    const addStudentsToDatabase = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        let idSelection = [] as typeof tableData[0]["pbsId"][];
        students.map((student, idx) => {
            if (rowSelection[idx])
                idSelection.push(student.pbsId)
        });
        if (Object.keys(rowSelection).length > 0) {
            router.post(route('settings.sunscool.store'), {
                schoolId: schoolId,
                selectedStudents: idSelection
            });
        }
    }

    const groupedStudents = useMemo(() => {
        const grouped = students.reduce((acc: Record<number, GroupedStudent>, lesson) => {
            const { sunscoolId, pbsId, name, language, level, bibletime, progress } = lesson;

            // Check if the student already exists in the accumulator
            if (!acc[sunscoolId]) {
                // Initialize a new entry for the student
                acc[sunscoolId] = {
                    pbsId,
                    sunscoolId,
                    name,
                    language,
                    level,
                    lessons: [],
                };
            }

            // Add the lesson to the student's lessons array
            acc[sunscoolId].lessons.push({ bibletime, progress });

            return acc;
        }, {});
        return Object.values(grouped);
    }, [students]);
    console.log(groupedStudents);

    const tableData = useMemo(() => groupedStudents, [groupedStudents]);

    const columnHelper = createColumnHelper<typeof groupedStudents[0]>();

    const defaultColumns = [
        columnHelper.display({
            id: 'select-col',
            header: ({ table }) => (
                <label htmlFor="checkbox-all" className="rounded hover:bg-black/10">
                    <CheckboxInput
                        id="checkbox-all"
                        isChecked={table.getIsAllRowsSelected()}
                        handleChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
                    />
                    <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                </label>
            ),
            cell: ({ row }) => (
                <label htmlFor={"checkbox-" + row.id} className="flex items-center rounded hover:bg-black/10">
                    <CheckboxInput
                        id={"checkbox-" + row.id}
                        isChecked={row.getIsSelected()}
                        handleChange={row.getToggleSelectedHandler()}
                    />
                    <label htmlFor={"checkbox-" + row.id} className="sr-only">checkbox</label>
                </label>
            ),
        }),
        columnHelper.display({
            id: "Sr",
            header: "Sunscool ID",
            cell: ({ row }) => (
                <span>{(+row.original.sunscoolId)}</span>
            )
        }),
        columnHelper.display({
            id: "pbsid",
            header: "PBS ID",
            cell: ({ row }) => (
                <span>{(row.original.pbsId ?? "-")}</span>
            )
        }),
        columnHelper.accessor(row => row.name + "", {
            header: "Student",
        }),
        columnHelper.accessor(row => row.level + "", {
            header: "Level",
        }),
        columnHelper.accessor(row => row.lessons[0].bibletime ?? "", {
            header: "BibleTime"
        }),
        // columnHelper.accessor(row => Math.round(row.attemptedAverage * 100) / 100 + "", {
        //     header: "Attempted Avg (%)",
        //     enableColumnFilter: false
        // }),
        columnHelper.accessor(row => Math.round(row.lessons[0].progress) + "", {
            header: "Score",
            enableColumnFilter: false,
            enableSorting: false
        }),
        columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex items-center">
                    <IconHoverSpan>
                        <BasicButton hierarchy="transparent" size="xsmall" onClick={() => {
                            setNameToView(row.original.name);
                            setLessonsToView(row.original.lessons);
                            showModal();
                        }}><span className="flex flex-col items-center">
                                <Eye /> Details
                            </span></BasicButton>
                    </IconHoverSpan>
                </div>
            )
        })
    ]

    const popupTableData: ListingTableData = {
        headings: ['bibletime', 'progress'],
        content: lessonsToView?.map(({ bibletime, progress }) => (
            <>
                <td>{bibletime}</td>
                <td>{progress}</td>
            </>
        ))
    }
    return (
        <>
            <PopupModal onClose={closeModal} innerRef={dialogRef}>
                <Heading2Alt>{nameToView}</Heading2Alt>
                <ListingTable tableData={popupTableData} />
            </PopupModal>
            <div className="flex justify-end gap-2 my-2">
                <BasicButton dataTest="add_results_fm_button" processing={rowSelection && Object.keys(rowSelection).length === 0} hierarchy="primary" onClick={addStudentsToDatabase}>Add Students</BasicButton>
            </div>
            <div className="space-y-2">
                {errors &&
                    Object.keys(errors).map((key) =>
                        <ErrorBanner key={key} message={errors[key]} />
                    )
                }
            </div>
            <AdvancedTable
                data={tableData}
                columns={defaultColumns as ColumnDef<GroupedStudent>[]}
                enableColumnFilters={true}
                enableGlobalFilter={false}
                enableRowSelection={true}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
            />
        </>
    )
}