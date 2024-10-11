import PlayIcon from "@/Elements/Icons/PlayIcon";
import VideoCamera from "@/Elements/Icons/VideoCamera";
import route from "ziggy-js";
import SidebarComponent, { SidebarProps } from "./SidebarComponent";
import Cog6Tooth from "@/Elements/Icons/Cog6Tooth";
import Group from "@/Elements/Icons/Group";
import Newspaper from "@/Elements/Icons/Newspaper";
import UserIcon from "@/Elements/Icons/UserIcon";

export default function DashboardSidebar({ canManageCurriculum = false }: { canManageCurriculum?: boolean }) {
    let sidebarListItems: SidebarProps["listItems"] = [
        {
            routeString: route('assembly.index'),
            isActive: !route().current('assembly.bonus.*') && route().current('assembly.*'),
            Icon: PlayIcon,
            name: "Assembly Videos"
        },
        {
            routeString: route('assembly.bonus.index'),
            isActive: route().current('assembly.bonus.*'),
            Icon: VideoCamera,
            name: "Bonus Videos"
        },
    ];
    let bottomSideListItems: SidebarProps["bottomListItems"] = [];
    if (canManageCurriculum) {
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
    } else {
        bottomSideListItems = [
            {
                routeString: route('profile'),
                isActive: route().current('profile'),
                Icon: UserIcon,
                name: "Profile"
            }
        ]
    }
    return (
        <SidebarComponent title="Resources" Icon={Cog6Tooth} listItems={sidebarListItems} bottomListItems={bottomSideListItems} />
    )
}