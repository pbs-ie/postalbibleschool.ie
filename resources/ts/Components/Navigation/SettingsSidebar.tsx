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
                        <SidebarLink href={route('settings.step')} isActive={route().current('settings.step')}>
                            STEP
                        </SidebarLink>
                    </ListItem>
                    <ListItem>
                        <SidebarLink href={'#'} isActive={false}>
                            Camp
                        </SidebarLink>
                    </ListItem>
                </List>
            </nav>
        </SidebarLayout>
    )
}