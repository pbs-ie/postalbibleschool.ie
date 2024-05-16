import { Head } from "@inertiajs/react";
import WrapperLayout from "./WrapperLayout";
import Cog6Tooth from "@/Elements/Icons/Cog6Tooth";
import Heading1Alt from "@/Components/Typography/Heading1Alt";

export default function SettingsLayout({ title, children }: { title: string, children: React.ReactNode }): JSX.Element {
    return (
        <WrapperLayout>
            <div className="flex items-center lg:ml-20">
                <span className="bg-pbsblue/20 rounded-full p-1">
                    <Cog6Tooth className="w-8 h-8 text-pbsblue"></Cog6Tooth>
                </span>
                <Heading1Alt>Settings</Heading1Alt>
            </div>
            <div className="grid grid-cols-1 lg:mx-20 lg:grid-cols-[1fr_4fr]">
                <Head title={title}></Head>
                {children}
            </div>
        </WrapperLayout>
    )
}