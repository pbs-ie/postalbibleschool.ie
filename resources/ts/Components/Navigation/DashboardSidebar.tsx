import PlayIcon from "@/Elements/Icons/PlayIcon";
import VideoCamera from "@/Elements/Icons/VideoCamera";
import route from "ziggy-js";
import SidebarComponent, { SidebarProps } from "./SidebarComponent";
import Cog6Tooth from "@/Elements/Icons/Cog6Tooth";
import Group from "@/Elements/Icons/Group";
import Newspaper from "@/Elements/Icons/Newspaper";

export default function DashboardSidebar({ canViewCurriculum = false }: { canViewCurriculum?: boolean }) {
    let sidebarListItems: SidebarProps["listItems"] = [
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

    if (canViewCurriculum) {
        sidebarListItems.unshift(...[
            {
                routeString: route('curriculum.index'),
                isActive: route().current('curriculum.*'),
                Icon: Group,
                name: "Manage Curriculum"
            },
            {
                routeString: route('orders.index'),
                isActive: route().current('orders.index'),
                Icon: Newspaper,
                name: "Manage School Orders"
            }
        ]);
    }
    return (
        <SidebarComponent title="Resources" Icon={Cog6Tooth} listItems={sidebarListItems} />
    )
}