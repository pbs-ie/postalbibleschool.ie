import SettingsSection from "@/Elements/Sections/SettingsSection";
import SettingsLayout from "@/Layouts/SettingsLayout";
import List from "@/Elements/Lists/List";
import ListItem from "@/Elements/Lists/ListItem";
import AdvancedTable from "@/Components/Tables/AdvancedTable";
import { useMemo } from "react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

interface FmStudentProps {
    fieldData: {
        active: string,
        area: string,
        areaDetails: string,
        cName: string,
        currentCategory: string,
        dateFinished: string,
        dateStarted: string,
        grade: string,
        leader: string,
        leaderCode: string,
        sName: string,
        studentID: number,
    },
    portalData: [{
        grade: string,
        modId: string,
        month1: string,
        month10: string,
        month11: string,
        month12: string,
        month2: string,
        month3: string,
        month4: string,
        month5: string,
        month6: string,
        month7: string,
        month8: string,
        month9: string,
        recordId: string,
        source1: string,
        source10: string,
        source11: string,
        source12: string,
        source2: string,
        source3: string,
        source4: string,
        source5: string,
        source6: string,
        source7: string,
        source8: string,
        source9: string,
        yearDescription: string,
        yearFormat: string,
        yearPercentage: string,
        yearPrize: string,

    }],
    monthNames: {
        monthName1: string,
        monthName10: string,
        monthName11: string,
        monthName12: string,
        monthName2: string,
        monthName3: string,
        monthName4: string,
        monthName5: string,
        monthName6: string,
        monthName7: string,
        monthName8: string,
        monthName9: string,
    },
    recordId: number,
}

export default function Student({ student }: { student: FmStudentProps }) {

    const tableData = useMemo(() => student.portalData, [student.portalData]);

    const columnHelper = createColumnHelper<typeof student.portalData[0]>();

    const defaultColumns = [
        columnHelper.accessor(row => row.yearDescription, {
            header: "Year"
        }),
        columnHelper.accessor(row => row.yearFormat, {
            header: "Year Format"
        }),
        columnHelper.accessor(row => row.grade, {
            header: "Level"
        }),
        columnHelper.accessor(row => row.month1, {
            header: student.monthNames.monthName1
        }),
        columnHelper.accessor(row => row.month2, {
            header: student.monthNames.monthName2
        }),
        columnHelper.accessor(row => row.month3, {
            header: student.monthNames.monthName3
        }),
        columnHelper.accessor(row => row.month4, {
            header: student.monthNames.monthName4
        }),
        columnHelper.accessor(row => row.month5, {
            header: student.monthNames.monthName5
        }),
        columnHelper.accessor(row => row.month6, {
            header: student.monthNames.monthName6
        }),
        columnHelper.accessor(row => row.month7, {
            header: student.monthNames.monthName7
        }),
        columnHelper.accessor(row => row.month8, {
            header: student.monthNames.monthName8
        }),
        columnHelper.accessor(row => row.month9, {
            header: student.monthNames.monthName9
        }),
        columnHelper.accessor(row => row.month10, {
            header: student.monthNames.monthName10
        }),
        columnHelper.accessor(row => row.yearPercentage, {
            header: "Percentage"
        })

    ]
    return (
        <SettingsLayout title={"Sunscool Settings"}>
            <SettingsSection>

                <div className="w-full lg:mt-4">
                    <span><strong>Student Record ID:</strong> {student.recordId}</span>
                    <List>
                        {Object.entries(student.fieldData).map(([key, value], idx) => (
                            <ListItem key={key + idx}>
                                <strong>{key}</strong> - {value}
                            </ListItem>
                        ))}
                    </List>

                </div>
                <AdvancedTable
                    enableGlobalFilter={false}
                    data={tableData}
                    columns={defaultColumns as ColumnDef<typeof student.portalData[0]>[]}
                />
            </SettingsSection>
        </SettingsLayout>
    )
}