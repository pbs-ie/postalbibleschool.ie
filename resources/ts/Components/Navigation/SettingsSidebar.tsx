import List from "@/Elements/Lists/List";
import ListItem from "@/Elements/Lists/ListItem";
import SidebarLayout from "@/Layouts/SidebarLayout";
import SidebarLink from "@/Elements/Links/SidebarLink";

export default function SettingsSidebar() {
    return (
        <SidebarLayout>
            <nav>
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
                </List>
            </nav>
        </SidebarLayout>
    )
}