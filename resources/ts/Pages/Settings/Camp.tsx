import CampSettingsForm from "@/Components/Settings/CampSettingsForm";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import SettingsSection from "@/Elements/Sections/SettingsSection";
import SettingsLayout from "@/Layouts/SettingsLayout";

export interface CampSettingProps {
    dates: string;
    year: string;
    embedLink: string;
    isActive: boolean;
}
export default function Camp({ campSettings }: { campSettings: CampSettingProps }) {
    return (
        <SettingsLayout title={"Camp Settings"}>
            <SettingsSection>

                <div>
                    <Heading2Alt>Registration Details</Heading2Alt>
                    <hr />
                    <CampSettingsForm campSettings={campSettings} />
                </div>
            </SettingsSection>
        </SettingsLayout>
    )
}