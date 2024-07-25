import NavLink from "@/Components/Navigation/NavLink";
import { CampSettingProps } from "@/Pages/Settings/Camp";
import { usePage } from "@inertiajs/react";
import route from "ziggy-js";

export default function CampNavbar() {
    const campSettings = usePage().props.campSettings as CampSettingProps;
    return (
        <div role="navigation" className="w-full text-blue-900 bg-sky-300">
            <ul className="flex items-stretch justify-center h-12 gap-6 px-4 md:gap-8 md:px-8">
                <li className="flex -my-px">
                    <NavLink isSecondary={true} active={route().current('events.camp.index')} href={route('events.camp.index')}>Home</NavLink>
                </li>
                {campSettings?.isActive &&
                    <li className="flex -my-px">
                        <NavLink isSecondary={true} active={route().current('events.camp.signup')} href={route('events.camp.signup')}>Register</NavLink>
                    </li>
                }
                {campSettings?.reunionIsActive &&
                    <li className="flex -my-px">
                        <NavLink isSecondary={true} active={route().current('events.camp.reunion')} href={route('events.camp.reunion')}>Reunion</NavLink>
                    </li>
                }
                {/* TODO: Create page */}
                {/* <li className="flex -my-px">
                    <NavLink isSecondary={true} active={route().current('events.camp.schedule')} href={route('events.camp.schedule')}>Schedule</NavLink>
                </li> */}
                <li className="flex -my-px">
                    <NavLink isSecondary={true} active={route().current('payment.camp')} href={route('payment.camp')}>Payment</NavLink>
                </li>

            </ul>
        </div>
    )
}