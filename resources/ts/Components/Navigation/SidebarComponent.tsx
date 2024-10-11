import List from "@/Elements/Lists/List";
import ListItem from "@/Elements/Lists/ListItem";
import SidebarLink from "@/Elements/Links/SidebarLink";

export interface SidebarProps {
    Icon: Icon["props"];
    title: string;
    listItems: {
        routeString: string;
        name: string;
        isActive: boolean;
        Icon: Icon["props"];
    }[],
    bottomListItems?: SidebarProps["listItems"]
}
export default function SidebarComponent({ Icon, title, listItems, bottomListItems = [] }: SidebarProps) {
    return (
        <div className="px-4 z-10 text-white lg:h-dvh sticky top-0 lg:min-w-[20dvw] bg-pbsblue">
            <div className="flex items-center">
                <span className="p-1 rounded-full bg-pbsblue/20">
                    <Icon className="w-8 h-8 text-white" />
                </span>
                <h1 className="p-4 py-6 text-3xl font-bold leading-relaxed text-center text-white uppercase">{title}</h1>
            </div>
            <nav className="flex w-full gap-4 text-white lg:flex-col">
                <List>
                    {listItems.map(({ routeString, name, isActive, Icon }) => (
                        <SidebarLink key={routeString} href={routeString} isActive={isActive}>
                            <ListItem Icon={Icon}>
                                {name}
                            </ListItem>
                        </SidebarLink>
                    ))}
                </List>
                {bottomListItems.length > 0 &&
                    <>
                        <hr />
                        <List>
                            {bottomListItems.map(({ routeString, name, isActive, Icon }) => (
                                <SidebarLink key={routeString} href={routeString} isActive={isActive}>
                                    <ListItem Icon={Icon}>
                                        {name}
                                    </ListItem>
                                </SidebarLink>
                            ))}
                        </List>
                    </>
                }
            </nav>
        </div>
    )
}