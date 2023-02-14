import { Link } from "@inertiajs/inertia-react";
import SecondaryButton from "./SecondaryButton";

export default function RequestLessonBanner() {
    return (
        <div className="bg-pbsblue max-w-screen">
            <div className="flex flex-col items-center w-full gap-2 p-6 mx-auto md:gap-8 md:py-10 md:max-w-4xl">
                <p className="text-xl font-semibold text-center text-white md:text-3xl">Request a Lesson for your School or an Individual</p>
                <div className="flex gap-6 w-fit">
                    <Link type="button" href={route('request.group')}><SecondaryButton className="text-sm">School or Group</SecondaryButton></Link>
                    <Link type="button" href={route('request.individual')}><SecondaryButton className="text-sm">Individual or Family</SecondaryButton></Link>
                </div>
            </div>
        </div>
    )
}