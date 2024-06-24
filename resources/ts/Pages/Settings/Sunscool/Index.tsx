import SettingsSidebar from "@/Components/Navigation/SettingsSidebar";
import SunscoolSchoolsTable from "@/Components/Tables/SunscoolSchoolsTable";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import SettingsSection from "@/Elements/Sections/SettingsSection";
import SettingsLayout from "@/Layouts/SettingsLayout";

export interface SunscoolStudentProps {
    id: number,
    levels: [number],
    name: string,
    ts: number
}
export interface SunscoolClassProps {
    id: number,
    lessons: [string],
    name: string,
    students: [
        SunscoolStudentProps
    ]
}
export interface SunscoolSchoolProps {
    id: number;
    name: string;
    org_id: number;
    school_id: number;
    school_name: string;
    classes: [
        SunscoolClassProps
    ]
}
export default function Index({ schools }: { schools: SunscoolSchoolProps[] }) {
    return (
        <SettingsLayout title={"Sunscool Settings"}>
            <SettingsSidebar />
            <SettingsSection>
                <div>
                    <Heading2Alt>All Classrooms</Heading2Alt>
                    <hr />
                    <SunscoolSchoolsTable schools={schools} />
                </div>
            </SettingsSection>
        </SettingsLayout>
    )
}