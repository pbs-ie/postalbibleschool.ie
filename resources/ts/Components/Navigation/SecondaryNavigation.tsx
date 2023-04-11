import NavLink from "@/Components/Navigation/NavLink";

export default function SecondaryNavigation({ logo }: { logo?: string | undefined }) {
    return (
        <div role="navigation" className="w-full text-blue-900 bg-sky-300">
            {logo && (
                <div className="relative hidden md:block">
                    <img src={logo} alt="Logo" className="absolute h-10 my-1 left-20" />
                </div>

            )
            }
            <ul className="flex items-stretch justify-center h-12 gap-6 px-4 md:gap-8 md:px-8">
                <li className="flex -my-px">
                    <NavLink isSecondary={true} active={route().current('events.step')} href={route('events.step')}>About</NavLink>
                </li>
                {/* TODO: Create page */}
                {/* <li className="flex -my-px">
                    <NavLink isSecondary={true} active={route().current('events.step.past')} href={route('events.step.past')}>Past Events</NavLink>
                </li> */}
                <li className="flex -my-px">
                    <NavLink isSecondary={true} active={route().current('events.step.signup')} href={route('events.step.signup')}>Sign Up</NavLink>
                </li>
                {/* TODO: Create page */}
                {/* <li className="flex -my-px">
                    <NavLink isSecondary={true} active={route().current('events.step.schedule')} href={route('events.step.schedule')}>Schedule</NavLink>
                </li> */}

            </ul>
        </div>
    )
}