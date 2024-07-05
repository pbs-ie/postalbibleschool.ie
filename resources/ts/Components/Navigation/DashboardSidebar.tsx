import PlayIcon from "@/Elements/Icons/PlayIcon";
import VideoCamera from "@/Elements/Icons/VideoCamera";
import route from "ziggy-js";
import SidebarComponent, { SidebarProps } from "./SidebarComponent";
import Cog6Tooth from "@/Elements/Icons/Cog6Tooth";

export default function DashboardSidebar() {
    const sidebarListItems: SidebarProps["listItems"] = [
        {
            routeString: route('assembly.index'),
            isActive: route().current('assembly.index'),
            Icon: PlayIcon,
            name: "Assembly Videos"
        },
        {
            routeString: route('assembly.bonus.index'),
            isActive: route().current('assembly.bonus.index'),
            Icon: VideoCamera,
            name: "Bonus Videos"
        },
    ];
    return (
        <SidebarComponent title="Resources" Icon={Cog6Tooth} listItems={sidebarListItems} />
    )
}