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

export interface SunscoolStudentProps {
    sunscoolId: number,
    pbsId: number | null,
    level: number,
    name: string,
    bibletime: string,
    progress: number,
    language: string,
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