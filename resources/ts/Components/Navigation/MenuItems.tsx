import NavItem from "@/Components/Navigation/NavItem";
import { MenuItemsProps } from "@/Components/Navigation/Navbar";

export default function MenuItems({ menuItems }: { menuItems: MenuItemsProps[] }) {

    return (
        menuItems.map((item) => {
            return (
                <NavItem key={item.name} name={item.name} href={item.href} active={item.active} submenu={item.submenu} />
            )
        })
    )
}