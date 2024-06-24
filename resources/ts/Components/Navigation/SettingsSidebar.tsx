import List from "@/Elements/Lists/List";
import ListItem from "@/Elements/Lists/ListItem";
import SidebarLink from "@/Elements/Links/SidebarLink";
import route from "ziggy-js";

export default function SettingsSidebar() {
    return (
        <nav className="w-full">
            <List>
                <ListItem>
                    <SidebarLink href={route('settings.step.index')} isActive={route().current('settings.step.*')}>
                        STEP
                    </SidebarLink>
                </ListItem>
                <ListItem>
                    <SidebarLink href={route('settings.iteam.index')} isActive={route().current('settings.iteam.*')}>
                        iTeam
                    </SidebarLink>
                </ListItem>
                <ListItem>
                    <SidebarLink href={route('settings.sunscool.index')} isActive={route().current('settings.sunscool.*')}>
                        Sunscool
                    </SidebarLink>
                </ListItem>
            </List>
        </nav>
    )
}