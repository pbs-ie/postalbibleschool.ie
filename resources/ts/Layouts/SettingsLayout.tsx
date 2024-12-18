import { Head } from "@inertiajs/react";
import WrapperLayout from "./WrapperLayout";
import SettingsSidebar from "@/Components/Navigation/SettingsSidebar";
import ChevronRight from "@/Elements/Icons/ChevronRight";
import ButtonLink from "@/Elements/Buttons/ButtonLink";

export default function SettingsLayout({ title, pageRoute, children }: { title: string, pageRoute?: string, children: React.ReactNode }): JSX.Element {
    return (
        <WrapperLayout>
            <Head title={title}></Head>
            <div className="flex items-center justify-between mx-5">

                {pageRoute &&
                    <div className="lg:mr-40">
                        <ButtonLink Icon={ChevronRight} href={pageRoute}>Go to Page</ButtonLink>
                    </div>
                }
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,4fr)]">
                <SettingsSidebar />
                {children}
            </div>
        </WrapperLayout>
    )
}