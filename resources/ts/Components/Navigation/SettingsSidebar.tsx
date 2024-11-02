import route from "ziggy-js";

import SidebarComponent, { SidebarProps } from "@/Components/Navigation/SidebarComponent";

import Cog6Tooth from "@/Elements/Icons/Cog6Tooth";
import PresentationChart from "@/Elements/Icons/PresentationChart";
import VideoCamera from "@/Elements/Icons/VideoCamera";
import SunIcon from "@/Elements/Icons/SunIcon";
import PuzzleIcon from "@/Elements/Icons/PuzzleIcon";
import Newspaper from "@/Elements/Icons/Newspaper";
import PlayIcon from "@/Elements/Icons/PlayIcon";

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
            routeString: route('settings.lesson.index'),
            isActive: route().current('settings.lesson.*'),
            Icon: Newspaper,
            name: "Lesson"
        },
        {
            routeString: route('assembly.admin'),
            isActive: !route().current('assembly.bonus.*') && route().current('assembly.*'),
            Icon: PlayIcon,
            name: "Assembly Admin"
        },
        {
            routeString: route('assembly.bonus.admin'),
            isActive: route().current('assembly.bonus.*'),
            Icon: VideoCamera,
            name: "Bonus Admin"
        }
    ]

    const bottomSettingsMenuList: SidebarProps["bottomListItems"] = [
        {
            routeString: route('settings.sunscool.index'),
            isActive: route().current('settings.sunscool.*'),
            Icon: SunIcon,
            name: "Sunscool"

        }
    ];
    return (
        <SidebarComponent Icon={Cog6Tooth} title="Settings" listItems={settingsMenuList} bottomListItems={bottomSettingsMenuList} />
    )
}