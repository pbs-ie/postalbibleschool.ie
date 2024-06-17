import ITeamSettingsForm from "@/Components/Settings/ITeamSettingsForm";
import Heading2Alt from "@/Components/Typography/Heading2Alt";
import SettingsLayout from "@/Layouts/SettingsLayout";
import { ITeamSettingProps } from "@/Pages/Events/ITeam";


export default function ITeam({ iteamSettings }: { iteamSettings: ITeamSettingProps }) {
    return (
        <SettingsLayout title={"iTeam Settings"}>
            <section className="px-4 py-4 space-y-8 sm:px-6 lg:px-12">

                <div>
                    <Heading2Alt>Registration Details</Heading2Alt>
                    <hr />
                    <ITeamSettingsForm iteamSettings={iteamSettings} />
                </div>
            </section>
        </SettingsLayout>
    )
}