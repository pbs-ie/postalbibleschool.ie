import { Link } from "@inertiajs/inertia-react";
import NavLink from "./NavLink";

export default function SecondaryNavigation() {
    return (
        <nav className="w-full text-blue-900 bg-sky-300">
            <ul className="flex items-stretch justify-center h-10 gap-6 px-4 md:gap-8 md:px-8">
                <li className="flex -my-px">
                    <NavLink isSecondary={true} active={route().current('events.step')} href={route('events.step')}>About</NavLink>
                </li>
                <li className="flex -my-px">
                    <NavLink isSecondary={true} active={route().current('events.step.past')} href={route('events.step.past')}>Past Events</NavLink>
                </li>
                <li className="flex -my-px">
                    <NavLink isSecondary={true} active={route().current('events.step.signup')} href={route('events.step.signup')}>Sign Up</NavLink>
                </li>
                <li className="flex -my-px">
                    <NavLink isSecondary={true} active={route().current('events.step.schedule')} href={route('events.step.schedule')}>Schedule</NavLink>
                </li>
            </ul>
        </nav>
    )
}