export default function AnchorNavLink({ href, isResponsive = false, newTab = false, isDropdown = false, children }: { href: string, isResponsive?: boolean, newTab?: boolean, isDropdown?: boolean, children?: React.ReactNode }) {
    const getClassNames = () => {
        if (isResponsive) {
            return "w-full flex items-start mx-2 rounded px-2 pr-4 py-2 text-base font-medium transition duration-150 ease-in-out hover:text-gray-800 hover:bg-gray-300 focus:text-gray-800 focus:bg-gray-50 dark:hover:text-gray-100 dark:hover:bg-gray-700";
        } else if (isDropdown) {
            return "inline-flex items-center whitespace-nowrap bg-clip-padding py-4 px-8 w-full text-sm font-medium leading-5  focus:bg-slate-200 transition duration-150 ease-in-out";
        } else {
            return "inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-200 uppercase transition duration-150 ease-in-out hover:text-white  focus:text-gray-100 ";
        }
    }
    return (
        <a href={href} className={getClassNames()} target={newTab ? "_blank" : "_self"}>
            {children ?? href}
        </a>
    )
}