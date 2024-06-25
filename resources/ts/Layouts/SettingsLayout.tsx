import { Head } from "@inertiajs/react";
import WrapperLayout from "./WrapperLayout";
import Cog6Tooth from "@/Elements/Icons/Cog6Tooth";
import Heading1Alt from "@/Components/Typography/Heading1Alt";
import SettingsSidebar from "@/Components/Navigation/SettingsSidebar";
import ChevronRight from "@/Elements/Icons/ChevronRight";
import ButtonLink from "@/Elements/Buttons/ButtonLink";

export default function SettingsLayout({ title, pageRoute, children }: { title: string, pageRoute?: string, children: React.ReactNode }): JSX.Element {
    return (
        <WrapperLayout>
            <div className="flex items-center justify-between mx-5 lg:ml-20">
                <div className="flex items-center">
                    <span className="p-1 rounded-full bg-pbsblue/20">
                        <Cog6Tooth className="w-8 h-8 text-pbsblue"></Cog6Tooth>
                    </span>
                    <Heading1Alt>Settings</Heading1Alt>
                </div>
                {pageRoute &&
                    <div className="lg:mr-40">
                        <ButtonLink Icon={ChevronRight} href={pageRoute}>Go to Page</ButtonLink>
                    </div>
                }
            </div>

            <div className="grid grid-cols-1 lg:mx-20 lg:grid-cols-[1fr_4fr]">
                <Head title={title}></Head>
                <SettingsSidebar />
                {children}
            </div>
        </WrapperLayout>
    )
}