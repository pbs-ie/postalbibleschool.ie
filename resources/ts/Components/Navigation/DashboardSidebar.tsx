import PlayIcon from "@/Elements/Icons/PlayIcon";
import VideoCamera from "@/Elements/Icons/VideoCamera";
import route from "ziggy-js";
import SidebarComponent, { SidebarProps } from "./SidebarComponent";
import Cog6Tooth from "@/Elements/Icons/Cog6Tooth";
import Group from "@/Elements/Icons/Group";
import Newspaper from "@/Elements/Icons/Newspaper";
import UserIcon from "@/Elements/Icons/UserIcon";
import { usePage } from "@inertiajs/react";

export default function DashboardSidebar({ canManageCurriculum = false }: { canManageCurriculum?: boolean }) {
    const { auth } = usePage<PassedProps>().props;
    let sidebarListItems: SidebarProps["listItems"] = [
        {
            routeString: route('assembly.index'),
            isActive: !route().current('assembly.bonus.*') && route().current('assembly.*'),
            Icon: PlayIcon,
            name: "Assembly Videos"
        }
    ];
    let bottomSideListItems: SidebarProps["bottomListItems"] = [];
    if (auth && auth.user) {
        sidebarListItems.push({
            routeString: route('assembly.bonus.index'),
            isActive: route().current('assembly.bonus.*'),
            Icon: VideoCamera,
            name: "Bonus Videos"
        })
        if (canManageCurriculum) {
            sidebarListItems.unshift(...[
                {
                    routeString: route('curriculum.index'),
                    isActive: route().current('curriculum.*'),
                    Icon: Group,
                    name: "Manage Curriculum"
                },
                {
                    routeString: route('schools.index'),
                    isActive: route().current('schools.index'),
                    Icon: Newspaper,
                    name: "Manage School Orders"
                }
            ]);
            bottomSideListItems = [
                {
                    routeString: route('settings.index'),
                    isActive: route().current('settings.*'),
                    Icon: Cog6Tooth,
                    name: "Settings"
                }
            ];
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
    }
    return (
        <SidebarComponent title="Resources" Icon={Cog6Tooth} listItems={sidebarListItems} bottomListItems={bottomSideListItems} />
    )
}