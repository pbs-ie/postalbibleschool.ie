export default function AnchorNavLink({ href, isResponsive = false, newTab = false, isDropdown = false, children }: { href: string, isResponsive?: boolean, newTab?: boolean, isDropdown?: boolean, children?: React.ReactNode }) {
    const getClassNames = () => {
        if (isResponsive) {
            return "w-full flex items-start pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-200 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 text-base font-medium focus:outline-none transition duration-150 ease-in-out";
        } else if (isDropdown) {
            return "inline-flex items-center whitespace-nowrap bg-clip-padding py-4 px-8 w-full text-sm font-medium leading-5 focus:outline-none focus:border-black focus:bg-slate-200 transition duration-150 ease-in-out";
        } else {
            return "inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-200 uppercase transition duration-150 ease-in-out border-b-2 border-transparent hover:text-white hover:border-gray-50 focus:outline-none focus:text-gray-100 focus:border-gray-50";
        }
    }
    return (
        <a href={href} className={getClassNames()} target={newTab ? "_blank" : "_self"}>
            {children ?? href}
        </a>
    )
}