import AdvancedTable from "@/Components/Tables/AdvancedTable";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import { MonthKeys, monthMap, MonthToSeriesMap } from "@/constants";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import InputError from "@/Elements/Forms/InputError";
import RadioInput from "@/Elements/Forms/RadioInput";
import SettingsSection from "@/Elements/Sections/SettingsSection";
import SettingsLayout from "@/Layouts/SettingsLayout";
import { router, usePage } from "@inertiajs/react";
import { createColumnHelper, RowSelectionState } from "@tanstack/react-table";
import { FormEvent, useMemo, useState } from "react";
import route from "ziggy-js";

export interface LessonSettingsProps {
    lesson_map: [MonthToSeriesMap],
    active_index: number
}
export default function Lesson({ lessonSettings }: { lessonSettings: LessonSettingsProps }) {
    const { errors } = usePage<PassedProps>().props;

    const tableDataMemo = useMemo(() => lessonSettings.lesson_map, [lessonSettings.lesson_map]);
    const columnHelper = createColumnHelper<LessonSettingsProps["lesson_map"][0]>();
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({ [lessonSettings.active_index]: true });

    let defaultColumns = Object.entries(monthMap).map(([key, monthName]) =>
        columnHelper.accessor(row => row[key as MonthKeys], {
            header: monthName.slice(0, 3)
        })
    );
    defaultColumns.unshift(
        columnHelper.display({
            id: 'select-col',
            cell: ({ table, row }) => (
                <label htmlFor={"checkbox" + row.id} className="flex items-center p-1 rounded-full hover:bg-black/10">
                    <RadioInput
                        id={"checkbox" + row.id}
                        checked={row.getIsSelected()}
                        handleChange={() => {
                            const selected = row.getIsSelected();
                            table.toggleAllRowsSelected(false);
                            row.toggleSelected(!selected);
                        }}
                        name={"checkbox" + row.id}
                        value={row.id + ""} />
                    <label htmlFor={"checkbox" + row.id} className="sr-only">checkbox</label>
                </label>
            ),
        }),
        columnHelper.display({
            id: 'sr-no',
            header: () => (
                <p>No.</p>
            ),
            cell: ({ row }) => (
                <div className="flex items-center">
                    {Number(row.id) + 1}
                </div>
            ),
        }))

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.post(route('settings.lesson.update'), {
            selectedMap: Object.keys(rowSelection)[0]
        });
    }

    return (
        <SettingsLayout title={"iTeam Settings"}>
            <SettingsSection>
                <form name="lessonSettingsForm" aria-label="Lesson Settings form" onSubmit={handleSubmit} >
                    <Heading2Alt>Active Month Series</Heading2Alt>
                    <p className="my-4 text-gray-700">Select one of the following as the current active series for each month of the year. This will affect the series displayed in the Teacher Dashboard and other related pages.</p>
                    <hr />
                    <AdvancedTable
                        enableGlobalFilter={false}
                        enableSorting={false}
                        enableColumnFilters={false}
                        enableRowSelection={true}
                        rowSelection={rowSelection}
                        setRowSelection={setRowSelection}
                        data={tableDataMemo}
                        columns={defaultColumns}
                    />
                    <InputError message={errors.selectedMap} />
                    {/* <LessonSettingsForm lessonSettings={lessonSettings} /> */}
                    <PrimaryButton>Update</PrimaryButton>
                </form>
            </SettingsSection>
        </SettingsLayout>
    )
}