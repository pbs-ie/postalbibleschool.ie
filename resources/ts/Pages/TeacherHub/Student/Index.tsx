import AdvancedTable from "@/Components/Tables/AdvancedTable";
import Heading1 from "@/Components/Typography/Heading1";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import ChevronLeft from "@/Elements/Icons/ChevronLeft";
import SidebarLayout from "@/Layouts/SidebarLayout";
import TwoColumnLayout from "@/Layouts/TwoColumnLayout";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { Row, createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";

export interface StudentProps {
    classroom_id: number,
    fm_student_id: string,
    first_name: string,
    last_name: string,
    area_code: string,
    grade: string,
    id: number,
    classroom_name?: string;
}

export default function Index({ students }: { students: StudentProps[] }) {

    const tableDataMemo = useMemo(() => students, [students]);

    const columnHelper = createColumnHelper<StudentProps>();

    const defaultColumns = [
        columnHelper.display({
            id: 'select-col',
            header: () => (
                <p>No.</p>
            ),
            cell: ({ row }) => (
                <div className="flex items-center">
                    {Number(row.id) + 1}
                </div>
            ),
        }),
        columnHelper.accessor(row => `${row.first_name} ${row.last_name}`, {
            header: "Full Name",
            filterFn: 'includesString'
        }),
        columnHelper.accessor(row => row.grade, {
            header: "Level"
        }),
        columnHelper.accessor(row => row.classroom_name, {
            header: "Classroom",
        })
    ];

    return (
        <WrapperLayout>
            <ButtonLink hierarchy="transparent" href={route('dashboard')}><span className="flex items-center gap-2">
                <ChevronLeft />{"Back to Hub"}
            </span></ButtonLink>
            <SidebarLayout>
                <div></div>
                <div className="mx-10 mb-10">
                    <Heading1>My Students</Heading1>
                    <p>View all the students for your school and their assigned classrooms in one view here</p>
                    <div className="mt-5">
                        <AdvancedTable enableGlobalFilter={false} data={tableDataMemo} columns={defaultColumns} />
                    </div>
                </div>
            </SidebarLayout>
        </WrapperLayout>
    )
}