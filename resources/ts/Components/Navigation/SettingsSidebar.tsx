import Cog6Tooth from "@/Elements/Icons/Cog6Tooth";
import route from "ziggy-js";
import PresentationChart from "@/Elements/Icons/PresentationChart";
import VideoCamera from "@/Elements/Icons/VideoCamera";
import SunIcon from "@/Elements/Icons/SunIcon";
import SidebarComponent, { SidebarProps } from "./SidebarComponent";
import PuzzleIcon from "@/Elements/Icons/PuzzleIcon";

export default function SettingsSidebar() {
    const settingsMenuList: SidebarProps["listItems"] = [
        {
            routeString: route('settings.step.index'),
            isActive: route().current('settings.step.*'),
            Icon: PresentationChart,
            name: "STEP"
        },
        {
            routeString: route('settings.iteam.index'),
            isActive: route().current('settings.iteam.*'),
            Icon: VideoCamera,
            name: "iTeam"
        },
        {
            routeString: route('settings.camp.index'),
            isActive: route().current('settings.camp.*'),
            Icon: PuzzleIcon,
            name: "Camp"
        },
        {
            routeString: route('settings.sunscool.index'),
            isActive: route().current('settings.sunscool.*'),
            Icon: SunIcon,
            name: "Sunscool"
        }
    ]
    return (
        <SidebarComponent Icon={Cog6Tooth} title="Settings" listItems={settingsMenuList} />
    )
}