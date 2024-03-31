import { MenuItemsProps } from "@/Components/Navigation/Navbar";
import ResponsiveNavLink from "@/Components/Navigation/ResponsiveNavLink";

export default function ResponsiveMenuItems({ menuItems }: { menuItems: MenuItemsProps[] }) {
    return (
        menuItems.map((item) => {
            if (item.submenu) {
                return (
                    <li key={item.name} >
                        <ResponsiveNavLink href={item.href} active={item.active}>{item.name}</ResponsiveNavLink>
                        <ul className='ml-6'>
                            {item.submenu.map((subitem) => (
                                <li className={`relative before:absolute before:text-inherit before:top-1/2 before:-translate-y-1/2  before:content-['—']`} key={subitem.name}>
                                    <ResponsiveNavLink key={subitem.name} href={subitem.href} active={subitem.active}>
                                        {subitem.name}
                                    </ResponsiveNavLink>
                                </li>
                            ))}
                        </ul>
                    </li>
                )
            }
            return (
                <li key={item.name}>
                    <ResponsiveNavLink href={item.href} active={item.active}>
                        {item.name}
                    </ResponsiveNavLink>
                </li>
            )
        }
        ))
}