import SunscoolSchoolsTable from "@/Components/Tables/SunscoolSchoolsTable";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import SettingsSection from "@/Elements/Sections/SettingsSection";
import SettingsLayout from "@/Layouts/SettingsLayout";

// export interface SunscoolLessonProps {
//     id: number;
//     done: boolean;
//     progress: number;
//     title: string;
//     bibletime: string;
//     level: string;
// }

interface FieldData {
    studentId: number;
    areaCode: string;
    firstName: string;
    lastName: string;
    active: string;
    grade: string;
}

interface PortalDataEntry {
    yearDescription: string;
    month1: string;
    month2: string;
    month3: string;
    month4: string;
    month5: string;
    month6: string;
    month7: string;
    month8: string;
    month9: string;
    month10: string;
    month11: string;
    month12: string;
    yearPercentage: number;
    yearPrize: string;
    monthName1: string;
    monthName2: string;
    monthName3: string;
    monthName4: string;
    monthName5: string;
    monthName6: string;
    monthName7: string;
    monthName8: string;
    monthName9: string;
    monthName10: string;
    monthName11: string;
    monthName12: string;
    grade: string;
    yearFormat: string;
    source1: string;
    source2: string;
    source3: string;
    source4: string;
    source5: string;
    source6: string;
    source7: string;
    source8: string;
    source9: string;
    source10: string;
    source11: string;
    source12: string;
}

interface MonthNames {
    monthName1: string;
    monthName2: string;
    monthName3: string;
    monthName4: string;
    monthName5: string;
    monthName6: string;
    monthName7: string;
    monthName8: string;
    monthName9: string;
    monthName10: string;
    monthName11: string;
    monthName12: string;
}

export interface FmDataProps {
    recordId: string;
    fieldData: FieldData;
    portalData: PortalDataEntry[];
    monthNames: MonthNames;
}


export interface SunscoolStudentProps {
    sunscoolId: number,
    pbsId: number | null,
    name: string,
    language: string,
    lessons: {
        level: number,
        bibletime: string;
        progress: number;
    }[],
    fmData?: FmDataProps
}
export interface SunscoolClassProps {
    id: number,
    // lessons: [string],
    name: string,
    students: [
        SunscoolStudentProps
    ]
}
export interface SunscoolSchoolProps {
    id: number;
    name: string;
    classes: [
        SunscoolClassProps
    ]
}
export default function Index({ schools }: { schools: SunscoolSchoolProps[] }) {
    return (
        <SettingsLayout title={"Sunscool Settings"}>
            <SettingsSection>
                <div>
                    <Heading2Alt>Schools List</Heading2Alt>
                    <hr />
                    <SunscoolSchoolsTable schools={schools} />
                </div>
            </SettingsSection>
        </SettingsLayout>
    )
}