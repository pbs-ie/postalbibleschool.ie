export default function AnchorNavLink({ href, newTab = false, isDropdown = false, children }: { href: string, newTab?: boolean, isDropdown?: boolean, children?: React.ReactNode }) {
    return (
        <a href={href} className={isDropdown ? " inline-flex items-center whitespace-nowrap bg-clip-padding py-4 px-8 w-full text-sm font-medium leading-5 focus:outline-none focus:border-black focus:bg-slate-200 transition duration-150 ease-in-out" : "inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-200 uppercase transition duration-150 ease-in-out border-b-2 border-transparent hover:text-white hover:border-gray-50 focus:outline-none focus:text-gray-100 focus:border-gray-50"} target={newTab ? "_blank" : "_self"}>
            {children ?? href}
        </a>
    )
}