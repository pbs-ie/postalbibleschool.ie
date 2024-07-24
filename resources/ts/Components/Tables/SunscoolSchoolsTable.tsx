import { SunscoolSchoolProps } from "@/Pages/Settings/Sunscool/Index";
import AdvancedTable from "./AdvancedTable";
import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import IconHoverSpan from "@/Elements/Span/IconHoverSpan";
import route from "ziggy-js";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import FolderOpenIcon from "@/Elements/Icons/FolderOpenIcon";

export default function SunscoolSchoolsTable({ schools }: { schools: SunscoolSchoolProps[] }) {
    const tableDataMemo = useMemo(() => schools, [schools]);

    const columnHelper = createColumnHelper<SunscoolSchoolProps>();

    const defaultColumns = [
        columnHelper.accessor(row => row.school_id + "", {
            header: "School ID",
        }), columnHelper.accessor(row => row.school_name, {
            header: "School Name",
        }),
        columnHelper.display({
            id: 'actions',
            header: () => "Actions",
            cell: ({ row }) => {
                return (
                    <div key={'actions' + row.id} className="flex items-center">
                        <>
                            <IconHoverSpan>
                                <ButtonLink dataTest="school_open_icon" hierarchy="transparent" size="xsmall" href={route("settings.sunscool.classes", row.original.id)}><span className="flex flex-col items-center">
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
        <AdvancedTable enableGlobalFilter={false} data={tableDataMemo} columns={defaultColumns} />
    )
}