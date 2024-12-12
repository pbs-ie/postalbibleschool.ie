import { Head, router } from "@inertiajs/react";
import { useMemo } from "react";
import route from "ziggy-js";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import WrapperLayout from "@/Layouts/WrapperLayout";

import AdvancedTable from "@/Components/Tables/AdvancedTable";
import Heading1Nospace from "@/Components/Typography/Heading1Nospace";
import { SchoolsListProps } from "@/Components/SchoolOrders/SchoolSelectDropdown";

import SecondaryButton from "@/Elements/Buttons/SecondaryButton";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import ChevronLeft from "@/Elements/Icons/ChevronLeft";
import RefreshIcon from "@/Elements/Icons/RefreshIcon";
import Download from "@/Elements/Icons/Download";
import AnchorLink from "@/Components/Navigation/AnchorLink";

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
                <p>#</p>
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
            header: "Level",
            enableColumnFilter: true,
        }),
        columnHelper.accessor(row => row.fm_student_id, {
            header: "FM Student ID",
            enableColumnFilter: true,
        }),

    ];

    const getStudentList = () => {
        router.get(route('schools.studentsRefresh', schoolDetails.id), {
            only: ['students']
        });
    }

    return (
        <WrapperLayout>
            <ButtonLink hierarchy="transparent" href={route('schools.index')}><span className="flex items-center gap-2">
                <ChevronLeft />{"Back to Schools"}
            </span></ButtonLink>
            <div className="m-5 lg:m-10">
                <div className="flex flex-col items-start justify-between w-full lg:flex-row">
                    <Heading1Nospace>School - {schoolDetails.schoolName}</Heading1Nospace>
                    <Head><title>{schoolDetails.schoolName}</title></Head>
                    <div className="inline-flex flex-wrap items-center gap-2 lg:gap-4">
                        <SecondaryButton size="small" onClick={() => getStudentList()} Icon={RefreshIcon}>Refresh List</SecondaryButton>
                        <AnchorLink Icon={Download} href={route('schools.exportStudentsList', schoolDetails.id)}>Download Excel</AnchorLink>
                    </div>
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