import List from "@/Elements/Lists/List";
import ListItem from "@/Elements/Lists/ListItem";
import SidebarLink from "@/Elements/Links/SidebarLink";
import Cog6Tooth from "@/Elements/Icons/Cog6Tooth";
import route from "ziggy-js";
import PresentationChart from "@/Elements/Icons/PresentationChart";
import VideoCamera from "@/Elements/Icons/VideoCamera";
import SunIcon from "@/Elements/Icons/SunIcon";

export default function SettingsSidebar() {
    return (
        <div className="px-4 text-white lg:min-h-[75dvh] bg-pbsblue">
            <div className="flex items-center">
                <span className="p-1 rounded-full bg-pbsblue/20">
                    <Cog6Tooth className="w-8 h-8 text-white"></Cog6Tooth>
                </span>
                <h1 className="p-4 py-6 text-3xl font-bold leading-relaxed text-center text-white uppercase">Settings</h1>
            </div>
            <nav className="w-full text-white">
                <List>
                    <SidebarLink href={route('settings.step.index')} isActive={route().current('settings.step.*')}>
                        <ListItem Icon={PresentationChart}>
                            STEP
                        </ListItem>
                    </SidebarLink>
                    <SidebarLink href={route('settings.iteam.index')} isActive={route().current('settings.iteam.*')}>
                        <ListItem Icon={VideoCamera}>
                            iTeam
                        </ListItem>
                    </SidebarLink>
                    <SidebarLink href={route('settings.sunscool.index')} isActive={route().current('settings.sunscool.*')}>
                        <ListItem Icon={SunIcon}>
                            Sunscool
                        </ListItem>
                    </SidebarLink>
                </List>
            </nav>
        </div>
    )
}