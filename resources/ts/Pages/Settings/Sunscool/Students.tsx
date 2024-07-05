import AdvancedTable from "@/Components/Tables/AdvancedTable";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import SettingsSection from "@/Elements/Sections/SettingsSection";
import SettingsLayout from "@/Layouts/SettingsLayout";
import { SunscoolClassProps, SunscoolStudentProps } from "@/Pages/Settings/Sunscool/Index";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";

export default function Students({ classroom }: { classroom: SunscoolClassProps }) {
    const tableDataMemo = useMemo(() => classroom.students, [classroom.students]);

    const columnHelper = createColumnHelper<SunscoolStudentProps>();

    const defaultColumns = [
        columnHelper.accessor(row => row.id + "", {
            header: "Student ID",
        }), columnHelper.accessor(row => row.name + "", {
            header: "Student Name",
        })
    ];
    return (
        <SettingsLayout title={"Sunscool Settings"}>
            <SettingsSection>
                <div>
                    <Heading2Alt>All Classrooms</Heading2Alt>
                    <hr />
                    <AdvancedTable data={tableDataMemo} columns={defaultColumns} />
                </div>
            </SettingsSection>
        </SettingsLayout>
    )
}