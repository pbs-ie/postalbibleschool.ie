import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import { Column, ColumnDef, Row, createColumnHelper } from "@tanstack/react-table";
import { modalHelper } from "@/helper";

import Heading2Alt from "@/Components/Typography/Heading2Alt";
import PopupModal from "@/Components/Modals/PopupModal";
import TooltipCard from "@/Components/Cards/TooltipCard";
import AdvancedTable from "@/Components/Tables/AdvancedTable";
import CreateClassroomForm from "@/Components/Forms/CreateClassroomForm";
import ErrorBanner from "@/Components/Forms/ErrorBanner";
import Heading2Nospace from "@/Components/Typography/Heading2Nospace";

import route from "ziggy-js";

import Trash from "@/Elements/Icons/Trash";
import EditIcon from "@/Elements/Icons/EditIcon";
import FloppyDisk from "@/Elements/Icons/FloppyDisk";
import InformationCircle from "@/Elements/Icons/InformationCircle";
import CloseX from "@/Elements/Icons/CloseX";

import BasicButton from "@/Elements/Buttons/BasicButton";
import SecondaryButton from "@/Elements/Buttons/SecondaryButton";
import IconHoverSpan from "@/Elements/Span/IconHoverSpan";
import SelectInput from "@/Elements/Forms/SelectInput";
import TextInput from "@/Elements/Forms/TextInput";
import PlusHollow from "@/Elements/Icons/PlusHollow";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";


type ClassroomForm = Omit<ClassroomProps, "curriculum_name" | "updated_at">;

export default function ClassroomListSection({ classrooms = [], curriculumList = [], viewOnly = false }: { classrooms: ClassroomProps[], curriculumList: CurriculumProps[], viewOnly?: boolean }) {
    const defaultEditingArray = Array(classrooms.length).fill(false);
    const [isEditing, setIsEditing] = useState<boolean[]>(defaultEditingArray);
    const { errors } = usePage().props;
    const [idToDelete, setIdToDelete] = useState<Number>();
    const [nameToDelete, setNameToDelete] = useState<string>();
    const { dialogRef: dialogRefCreate, showModal: showCreateModal, closeModal: closeCreateModal } = modalHelper();
    const { dialogRef: dialogRefDelete, showModal: showDeleteModal, closeModal: closeDeleteModal } = modalHelper();

    const getUpdatedAtDate = () => {
        if (classrooms.length === 0) {
            return "";
        }
        return new Date(classrooms[0].updated_at).toLocaleString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    // ****************FORM SECTION ***********************
    const defaultData: ClassroomForm = {
        id: 0,
        name: "",
        curriculum_id: 0,
        level_0_order: 0,
        level_1_order: 0,
        level_2_order: 0,
        level_3_order: 0,
        level_4_order: 0,
        tlp_order: 0,
    }
    const { data, setData, post, processing, reset } = useForm<ClassroomForm>(defaultData);


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setData(data);
        post(route('classroom.update', data.id), {
            preserveScroll: () => true,
            onSuccess: () => resetEditState()
        });
    }

    const resetEditState = () => {
        reset();
        setIsEditing(defaultEditingArray);
    }

    // ****************END FORM SECTION ***********************

    const setRowEditMode = (idx: number) => {
        resetEditState();
        const editArray = defaultEditingArray;
        editArray[idx] = true;
        setData({ ...classrooms[idx] });
        setIsEditing(editArray);
    }

    const editableCell = ({ row, column }: { row: Row<ClassroomProps>, column: Column<ClassroomProps, string> }) => {
        const currentProperty = column.id as keyof ClassroomForm;
        const initialValue = data[currentProperty];
        const [value, setValue] = useState(initialValue);

        useEffect(() => {
            setValue(initialValue)
        }, [initialValue]);
        const onBlur = () => {
            switch (currentProperty) {
                case "name":
                    data[currentProperty] = value + "";
                    break;
                case "level_0_order":
                case "level_1_order":
                case "level_2_order":
                case "level_3_order":
                case "level_4_order":
                case "tlp_order":
                    data[currentProperty] = +value;
                    break;
            }
        }
        return (
            !isEditing[+row.id] ?
                (currentProperty === "curriculum_id") ?
                    <span>{classrooms[+row.id]["curriculum_name"]}</span>
                    :
                    <span>{classrooms[+row.id][currentProperty]}</span>
                :
                <>
                    {(currentProperty === "name"
                        || currentProperty === "level_0_order"
                        || currentProperty === "level_1_order"
                        || currentProperty === "level_2_order"
                        || currentProperty === "level_3_order"
                        || currentProperty === "level_4_order"
                        || currentProperty === "tlp_order"
                    ) ?
                        <TextInput
                            key={`${currentProperty}[${row.id}]`}
                            name={currentProperty}
                            id={`${currentProperty}[${row.id}]`}
                            value={value}
                            className={"text-sm p-1 " + (currentProperty === "name" ? "w-24" : "w-12")}
                            handleChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                            onBlur={onBlur}
                        />
                        : (currentProperty === "curriculum_id") ?
                            <SelectInput
                                key={`${currentProperty}[${row.id}]`}
                                name={currentProperty}
                                id={`${currentProperty}[${row.id}]`}
                                handleChange={(e: ChangeEvent<HTMLSelectElement>) => setData(currentProperty, +e.target.value)}
                                className={"text-sm w-24 p-1"}
                                value={data[currentProperty] + ""}
                            >
                                {curriculumList.map(({ name, id }) => (
                                    <option key={name + id} value={id}>{name}</option>
                                ))}
                            </SelectInput>
                            // <span>{classrooms[+row.id]["curriculum_name"]}</span>
                            :
                            null
                    }
                </>
        )
    }

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
    const [columnTotals, setColumnTotals] = useState(defaultTotals);

    useEffect(() => {
        let totals = { ...defaultTotals };
        classrooms.forEach((value) => {
            totals.level_0_totals += value.level_0_order;
            totals.level_1_totals += value.level_1_order;
            totals.level_2_totals += value.level_2_order;
            totals.level_3_totals += value.level_3_order;
            totals.level_4_totals += value.level_4_order;
            totals.tlp_totals += value.tlp_order;
            totals.all_totals += value.level_0_order + value.level_1_order + value.level_2_order + value.level_3_order + value.level_4_order;
        });
        setColumnTotals(totals);

    }, [classrooms]);

    const tableDataMemo = useMemo(() => classrooms, [classrooms]);
    const columnHelper = createColumnHelper<ClassroomProps>();

    const viewColumns = [
        columnHelper.display({
            id: 'select-col',
            header: () => (
                <p>No.</p>
            ),
            cell: ({ row }) => (
                <div className="flex items-center">
                    {Number(row.id) + 1}
                </div>
            )
        }),
        columnHelper.accessor(row => row.name, {
            id: "name",
            header: "Classroom Name",
            cell: editableCell,
            footer: () => (
                <p>Totals:</p>
            )
        }),
        columnHelper.accessor(row => row.curriculum_name, {
            id: "curriculum_id",
            header: "Curriculum",
            cell: editableCell
        }),
        columnHelper.accessor(row => row.level_0_order + "", {
            id: "level_0_order",
            header: () => <span className="text-nowrap">Level 0</span>,
            footer: () => <span className="text-left">{columnTotals.level_0_totals}</span>,
            cell: editableCell,
            meta: {
                className: "bg-bibletime-pink text-gray-50"
            }
        }),
        columnHelper.accessor(row => row.level_1_order + "", {
            id: "level_1_order",
            header: () => <span className="text-nowrap">Level 1</span>,
            footer: () => <span className="text-left">{columnTotals.level_1_totals}</span>,
            cell: editableCell,
            meta: {
                className: "bg-bibletime-orange text-gray-50"
            }
        }),
        columnHelper.accessor(row => row.level_2_order + "", {
            id: "level_2_order",
            header: () => <span className="text-nowrap">Level 2</span>,
            footer: () => <span className="text-left">{columnTotals.level_2_totals}</span>,
            cell: editableCell,
            meta: {
                className: "bg-bibletime-red text-gray-50"
            }
        }),
        columnHelper.accessor(row => row.level_3_order + "", {
            id: "level_3_order",
            header: () => <span className="text-nowrap">Level 3</span>,
            footer: () => <span className="text-left">{columnTotals.level_3_totals}</span>,
            cell: editableCell,
            meta: {
                className: "bg-bibletime-green text-gray-50"
            }
        }),
        columnHelper.accessor(row => row.level_4_order + "", {
            id: "level_4_order",
            header: () => <span className="text-nowrap">Level 4</span>,
            footer: () => <span className="text-left">{columnTotals.level_4_totals}</span>,
            cell: editableCell,
            meta: {
                className: "bg-bibletime-blue text-gray-50"
            }
        }),
        columnHelper.accessor(row => row.tlp_order + "", {
            id: "tlp_order",
            header: () =>
                <span className="text-nowrap">
                    TLP
                    <TooltipCard id={"tlp-tip"} text={"Teacher Lesson Plans"} direction={"bottom"} size="xsmall">
                        <a href="#" className="pointer-events-none" aria-describedby="tlp-tip"><InformationCircle className="w-4 h-4 text-gray-600" /></a>
                    </TooltipCard>
                </span>,
            footer: () => <span className="text-left">{columnTotals.tlp_totals}</span>,
            cell: editableCell
        }),
        columnHelper.display({
            id: 'actions',
            header: () => "Actions",
            footer: () => <span>All students: {columnTotals.all_totals}</span>,
            cell: ({ row }) => {
                return (
                    <>
                        {(viewOnly) ? null :
                            <div key={'actions' + row.id} className="flex items-center">
                                {isEditing[+row.id] ?
                                    <>
                                        <IconHoverSpan>
                                            <BasicButton hierarchy="transparent" size="xsmall" dataTest="classroom_save_icon" type="submit" form="classroom_form" processing={processing}>
                                                <span className="flex flex-col items-center">
                                                    <FloppyDisk className="w-5 h-5 m-0.5 text-emerald-700" />Save
                                                </span></BasicButton>
                                        </IconHoverSpan>
                                        <IconHoverSpan>
                                            <BasicButton hierarchy="transparent" size="xsmall" onClick={() => resetEditState()} >
                                                <span className="flex flex-col items-center">
                                                    <CloseX className="w-6 h-6 text-gray-600" />Close
                                                </span></BasicButton>
                                        </IconHoverSpan>
                                    </>
                                    : <>
                                        <IconHoverSpan>
                                            <BasicButton hierarchy="transparent" processing={processing} size="xsmall" dataTest={"classroom_edit_icon_" + row.id} onClick={() => setRowEditMode(+row.id)}><span className="flex flex-col items-center">
                                                <EditIcon />Edit
                                            </span></BasicButton>
                                        </IconHoverSpan>
                                        {/* <IconHoverSpan>
                                    <ButtonLink dataTest="classroom_open_icon" hierarchy="transparent" size="xsmall" href={route("classroom.show", row.original.id)}><span className="flex flex-col items-center">
                                        <FolderOpenIcon className="w-6 h-6" key={row.id} />Open
                                    </span></ButtonLink>
                                </IconHoverSpan> */}
                                        <IconHoverSpan>
                                            <BasicButton processing={processing} dataTest={"classroom_delete_icon" + row.id} hierarchy="transparent" size="xsmall" onClick={() => {
                                                setIdToDelete(row.original.id);
                                                setNameToDelete(row.original.name);
                                                showDeleteModal();
                                            }}><span className="flex flex-col items-center text-red-500">
                                                    <Trash key={row.id} />Delete
                                                </span></BasicButton>
                                        </IconHoverSpan>
                                    </>
                                }

                            </div>
                        }
                    </>
                )
            }
        })
    ] as ColumnDef<ClassroomProps>[];
    // ****************END TABLE SECTION ***********************


    return (
        <div className="flex flex-col mb-3 lg:mb-14">
            {!viewOnly &&
                <>
                    <PopupModal onClose={closeCreateModal} innerRef={dialogRefCreate}>
                        <CreateClassroomForm onCancel={() => closeCreateModal()} />
                    </PopupModal>
                    <PopupModal onClose={closeDeleteModal} innerRef={dialogRefDelete}>
                        <article className="flex flex-col max-w-screen-sm gap-4 lg:max-w-screen-lg">
                            <Heading2Nospace isTitlecase>Delete Classroom?</Heading2Nospace>
                            <p>The classroom and all its related data will be removed. Are you sure you want to delete this classroom:</p>
                            <p className="font-bold">{`"${nameToDelete}"`}</p>
                            <div className="flex justify-end w-full gap-2">
                                <SecondaryButton onClick={() => closeDeleteModal()}>Cancel</SecondaryButton>
                                <BasicButton dataTest="confirm_delete_button" hierarchy="delete" onClick={() => {
                                    router.delete(route('classroom.destroy', idToDelete + ""),
                                        {
                                            preserveScroll: true
                                        }
                                    );
                                    closeDeleteModal();
                                }}>Delete</BasicButton>
                            </div>
                        </article>
                    </PopupModal>
                </>
            }

            <form id="classroom_form" action="submit" onSubmit={handleSubmit}>
                <div className="w-full mb-2 lg:mb-8">
                    <span className="flex items-start gap-2">
                        <Heading2Alt isTitlecase>Manage Classroom Numbers</Heading2Alt>
                        <TooltipCard id={"classroom-tip"} text={"Classrooms help segregate students into different groups that can be assigned a common curriculum. You can set the number of students in each class by their levels."} direction={"right"}>
                            <a href="#" className="pointer-events-none" aria-describedby="classroom-tip"><InformationCircle className="w-4 h-4 text-gray-600" /></a>
                        </TooltipCard>
                    </span>
                </div>
                <div className="flex items-end justify-between gap-2 mb-2">
                    <span>
                        {viewOnly ? null :
                            <div className="flex justify-end">
                                <PrimaryButton size="medium" type="button" dataTest="classroom_create_button" onClick={() => showCreateModal()}><span className="flex items-center gap-2">
                                    <PlusHollow className="size-4" /> Add new classroom
                                </span></PrimaryButton>
                            </div>
                        }
                    </span>
                    <span>
                        {classrooms.length !== 0 &&
                            <p className="align-bottom">
                                <span className="font-bold">Last updated at :</span> {getUpdatedAtDate()}
                            </p>
                        }
                    </span>
                </div>
                <div className="mt-4 space-y-2">
                    {errors && Object.keys(errors).length > 0 && Object.keys(errors).map((key, idx) => (
                        <ErrorBanner key={'error_banner' + idx} message={errors[key]} />
                    ))
                    }
                    {classrooms.length === 0 ?
                        <p className="italic text-gray-500">No classroom found. Create a new one by clicking the button below.</p>
                        :
                        <AdvancedTable
                            data={tableDataMemo}
                            columns={viewColumns}
                            enableGlobalFilter={false}
                            enableSorting={false}
                        />
                    }
                </div>
            </form>
        </div>
    )
}