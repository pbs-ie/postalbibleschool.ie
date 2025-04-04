import NavLink from "@/Components/Navigation/NavLink";
import LogoWhite from "@images/step/step_logo.png";
import { usePage } from "@inertiajs/react";
import route from "ziggy-js";

export default function StepNavbar() {
    const stepSettings = usePage().props.stepSettings as StepSettingsProps;
    return (
        <div role="navigation" className="z-10 w-full text-blue-900 bg-sky-300">
            {LogoWhite && (
                <div className="relative hidden md:block">
                    <img src={LogoWhite} alt="STEP Logo" className="absolute h-10 my-1 left-20" />
                </div>

            )
            }
            <ul className="flex items-stretch h-12 gap-6 px-4 overflow-x-auto overflow-y-hidden lg:justify-center md:gap-8 md:px-8">
                <li className="flex -my-px">
                    <NavLink isSecondary={true} active={route().current('events.step.index')} href={route('events.step.index')}>About</NavLink>
                </li>
                <li className="flex -my-px">
                    <NavLink isSecondary={true} active={route().current('events.step.past.*')} href={route('events.step.past.gallery')}>Videos</NavLink>
                </li>
                <li className="flex -my-px">
                    <NavLink isSecondary={true} active={route().current('events.step.podcast')} href={route('events.step.podcast')}>Podcasts</NavLink>
                </li>
                {stepSettings.isRegistrationActive &&
                    <>
                        <li className="flex -my-px">
                            <NavLink isSecondary={true} active={route().current('events.step.signup')} href={route('events.step.signup')}>Sign Up</NavLink>
                        </li>
                        {stepSettings.isRegistrationActive && stepSettings.scheduleFileLink &&
                            <li className="flex -my-px">
                                <NavLink isSecondary={true} active={route().current('events.step.schedule')} href={route('events.step.schedule')}>Schedule</NavLink>
                            </li>
                        }
                        <li className="flex -my-px">
                            <NavLink isSecondary={true} active={route().current('payment.step')} href={route('payment.step')}>Payment</NavLink>
                        </li>
                    </>
                }

            </ul>
        </div>
    )
}