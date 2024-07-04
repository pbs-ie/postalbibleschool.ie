import SettingsSidebar from "@/Components/Navigation/SettingsSidebar";
import ITeamSettingsForm from "@/Components/Settings/ITeamSettingsForm";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import SettingsSection from "@/Elements/Sections/SettingsSection";
import SettingsLayout from "@/Layouts/SettingsLayout";
import { ITeamSettingProps } from "@/Pages/Events/ITeam";


export default function ITeam({ iteamSettings }: { iteamSettings: ITeamSettingProps }) {
    return (
        <SettingsLayout title={"iTeam Settings"}>
            <SettingsSection>

                <div>
                    <Heading2Alt>Registration Details</Heading2Alt>
                    <hr />
                    <ITeamSettingsForm iteamSettings={iteamSettings} />
                </div>
            </SettingsSection>
        </SettingsLayout>
    )
}