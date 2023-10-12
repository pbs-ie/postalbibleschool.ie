import NavLink from "@/Components/Navigation/NavLink";
import LogoWhite from "@images/step/step_logo.png";


export default function StepNavbar() {
    return (
        <div role="navigation" className="w-full text-blue-900 bg-sky-300">
            {LogoWhite && (
                <div className="relative hidden md:block">
                    <img src={LogoWhite} alt="STEP Logo" className="absolute h-10 my-1 left-20" />
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
                <li className="flex -my-px">
                    <NavLink isSecondary={true} active={route().current('payment.step')} href={route('payment.step')}>Payment</NavLink>
                </li>

            </ul>
        </div>
    )
}