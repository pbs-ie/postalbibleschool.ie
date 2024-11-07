import AdvancedTable from "@/Components/Tables/AdvancedTable";
import Heading1 from "@/Components/Typography/Heading1";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import ChevronLeft from "@/Elements/Icons/ChevronLeft";
import RefreshIcon from "@/Elements/Icons/RefreshIcon";
import { router } from "@inertiajs/react";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import route from "ziggy-js";
import { SchoolsListProps } from "@/Components/SchoolOrders/SchoolSelectDropdown";
import SecondaryButton from "@/Elements/Buttons/SecondaryButton";

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

export default function Index({ students, schoolDetails }: { students: StudentProps[], schoolDetails: SchoolsListProps }) {

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
        columnHelper.accessor(row => row.first_name, {
            header: "First Name",
            filterFn: 'includesString',
            enableColumnFilter: true,
        }),
        columnHelper.accessor(row => row.last_name, {
            header: "Last Name",
            filterFn: 'includesString',
            enableColumnFilter: true,
        }),
        columnHelper.accessor(row => row.grade, {
            header: "Grade",
            enableColumnFilter: true,
        }),
        columnHelper.accessor(row => row.fm_student_id, {
            header: "Student ID",
            enableColumnFilter: true,
        }),

    ];

    const getStudentList = () => {
        router.get(route('orders.studentsRefresh', schoolDetails.id), {
            only: ['students']
        });
    }

    return (
        <WrapperLayout>
            <ButtonLink hierarchy="transparent" href={route('orders.index')}><span className="flex items-center gap-2">
                <ChevronLeft />{"Back to Schools"}
            </span></ButtonLink>
            <div className="mx-10 mb-10">
                <Heading1>{schoolDetails.schoolName}</Heading1>
                <div className="inline-flex justify-end w-full">
                    <SecondaryButton size="small" onClick={() => getStudentList()}><span className="flex items-center gap-3">Refresh List <RefreshIcon /></span></SecondaryButton>
                </div>
                <div className="mt-5">
                    {students.length > 0 ?
                        <AdvancedTable enableColumnFilters={true} enableGlobalFilter={false} data={tableDataMemo} columns={defaultColumns as ColumnDef<StudentProps>[]} />
                        :
                        <p className="italic text-gray-500">No students found for this school.</p>
                    }
                </div>
            </div>
        </WrapperLayout>
    )
}