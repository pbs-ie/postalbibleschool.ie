import SettingsSidebar from "@/Components/Navigation/SettingsSidebar";
import AdvancedTable from "@/Components/Tables/AdvancedTable";
import SunscoolSchoolsTable from "@/Components/Tables/SunscoolSchoolsTable";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import FolderOpenIcon from "@/Elements/Icons/FolderOpenIcon";
import SettingsSection from "@/Elements/Sections/SettingsSection";
import IconHoverSpan from "@/Elements/Span/IconHoverSpan";
import SettingsLayout from "@/Layouts/SettingsLayout";
import { SunscoolClassProps, SunscoolSchoolProps } from "@/Pages/Settings/Sunscool/Index";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import route from "ziggy-js";

export default function Classes({ school }: { school: SunscoolSchoolProps }) {
    const tableDataMemo = useMemo(() => school.classes, [school.classes]);

    const columnHelper = createColumnHelper<SunscoolClassProps>();

    const defaultColumns = [
        columnHelper.accessor(row => row.id + "", {
            header: "Class ID",
        }), columnHelper.accessor(row => row.name, {
            header: "Class Name",
        }),
        columnHelper.display({
            id: 'actions',
            header: () => "Actions",
            cell: ({ row }) => {
                return (
                    <div key={'actions' + row.id} className="flex items-center">
                        <>
                            <IconHoverSpan>
                                <ButtonLink dataTest="school_open_icon" hierarchy="transparent" size="xsmall" href={route("settings.sunscool.students", row.original.id)}><span className="flex flex-col items-center">
                                    <FolderOpenIcon className="w-6 h-6" key={row.id} />Open
                                </span></ButtonLink>
                            </IconHoverSpan>
                        </>
                    </div>
                )
            }
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