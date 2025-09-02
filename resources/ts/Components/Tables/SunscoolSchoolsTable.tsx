import { SunscoolSchoolProps } from "@/Pages/Settings/Sunscool/Index";
import AdvancedTable from "./AdvancedTable";
import { useMemo } from "react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import IconHoverSpan from "@/Elements/Span/IconHoverSpan";
import route from "ziggy-js";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import FolderOpenIcon from "@/Elements/Icons/FolderOpenIcon";

export default function SunscoolSchoolsTable({ schools }: { schools: SunscoolSchoolProps[] }) {
    const tableDataMemo = useMemo(() => schools, [schools]);

    const columnHelper = createColumnHelper<SunscoolSchoolProps>();

    const defaultColumns = [
        columnHelper.accessor(row => row.id + "", {
            header: "School ID",
            enableColumnFilter: false
        }), columnHelper.accessor(row => row.name, {
            header: "School Name",
            enableColumnFilter: true
        }),
        columnHelper.display({
            id: 'actions',
            header: () => "Actions",
            cell: ({ row }) => {
                return (
                    <div key={'actions' + row.id} className="flex items-center">
                        <>
                            {row.original.classes?.length > 0 &&
                                <IconHoverSpan>
                                    <ButtonLink dataTest="school_open_icon" hierarchy="transparent" size="xsmall" href={route("settings.sunscool.classroom", { schoolId: row.original.id, classroomId: row.original.classes[0].id })}><span className="flex flex-col items-center">
                                        <FolderOpenIcon className="w-6 h-6" key={row.id} />Open
                                    </span></ButtonLink>
                                </IconHoverSpan>
                            }
                        </>
                    </div>
                )
            }
        })
    ];
    return (
        <AdvancedTable enableColumnFilters={true} enableGlobalFilter={false} data={tableDataMemo} columns={defaultColumns as ColumnDef<SunscoolSchoolProps>[]} />
    )
}