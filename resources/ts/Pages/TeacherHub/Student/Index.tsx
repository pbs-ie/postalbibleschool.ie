import AdvancedTable from "@/Components/Tables/AdvancedTable";
import Heading1 from "@/Components/Typography/Heading1";
import BasicButton from "@/Elements/Buttons/BasicButton";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import ChevronLeft from "@/Elements/Icons/ChevronLeft";
import RefreshIcon from "@/Elements/Icons/RefreshIcon";
import SidebarLayout from "@/Layouts/SidebarLayout";
import { router } from "@inertiajs/react";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import route from "ziggy-js";

export interface StudentProps {
    classroom_id: number,
    fm_student_id: string,
    first_name: string,
    last_name: string,
    area_code: string,
    grade: string,
    id: number,
    classroom?: {
        id: number,
        name: string
    };
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
            filterFn: 'includesString',
            enableColumnFilter: true,
        }),
        columnHelper.accessor(row => row.grade, {
            header: "Grade",
            enableColumnFilter: true,
        }),
        columnHelper.accessor(row => row.classroom?.name ?? "", {
            id: 'classroom-name',
            header: "Classroom",
            filterFn: (row, columnId, filterValue) => {
                if (filterValue === "-empty-") {
                    return row.getValue<String>(columnId).toString() === "";
                }
                return row.getValue<String>(columnId).toString().toLowerCase().trim().includes(filterValue.toLowerCase());
            },
            enableColumnFilter: true,
        })
    ];

    const getStudentList = () => {
        router.get(route('students.all'));
    }

    return (
        <WrapperLayout>
            <ButtonLink hierarchy="transparent" href={route('dashboard')}><span className="flex items-center gap-2">
                <ChevronLeft />{"Back to Hub"}
            </span></ButtonLink>
            <SidebarLayout>
                <div></div>
                <div className="mx-10 mb-10">
                    <Heading1>My Students</Heading1>
                    <p>View all the students for your school and their assigned classrooms in one view here.</p>
                    <div className="inline-flex justify-end w-full"><BasicButton size="small" onClick={() => getStudentList()}><span className="flex items-center gap-3">Refresh List <RefreshIcon /></span></BasicButton></div>
                    <div className="mt-5">
                        {students.length > 0 ?
                            <AdvancedTable enableColumnFilters={true} enableGlobalFilter={false} data={tableDataMemo} columns={defaultColumns} />
                            :
                            <p className="italic text-gray-500">No students found for your account. If this is a mistake please contact the administrator.</p>
                        }
                    </div>
                </div>
            </SidebarLayout>
        </WrapperLayout>
    )
}