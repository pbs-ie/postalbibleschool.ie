import LessonSettingsForm from "@/Components/Settings/LessonSettingsForm";
import AdvancedTable from "@/Components/Tables/AdvancedTable";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import { MonthKeys, monthMap, MonthToSeriesMap } from "@/constants";
import SettingsSection from "@/Elements/Sections/SettingsSection";
import SettingsLayout from "@/Layouts/SettingsLayout";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";

export interface LessonSettingsProps {
    lesson_map: [MonthToSeriesMap],
    active_index: number
}
export default function Lesson({ lessonSettings }: { lessonSettings: LessonSettingsProps }) {
    const tableDataMemo = useMemo(() => lessonSettings.lesson_map, [lessonSettings.lesson_map]);
    const columnHelper = createColumnHelper<LessonSettingsProps["lesson_map"][0]>();

    let defaultColumns = Object.entries(monthMap).map(([key, monthName]) =>
        columnHelper.accessor(row => row[key as MonthKeys], {
            header: monthName
        })
    );
    defaultColumns.unshift(columnHelper.display({
        id: 'select-col',
        header: () => (
            <p>No.</p>
        ),
        cell: ({ row }) => (
            <div className="flex items-center">
                {Number(row.id) + 1}
            </div>
        ),
    }))



    return (
        <SettingsLayout title={"iTeam Settings"}>
            <SettingsSection>
                <div>
                    <Heading2Alt>Active Month Series</Heading2Alt>
                    <hr />
                    <AdvancedTable enableGlobalFilter={false} enableSorting={false} enableColumnFilters={false} data={tableDataMemo} columns={defaultColumns} />
                    <LessonSettingsForm lessonSettings={lessonSettings} />
                </div>
            </SettingsSection>
        </SettingsLayout>
    )
}