import { Link } from "@inertiajs/inertia-react";
import SecondaryButton from "./SecondaryButton";

export default function RequestLessonBanner() {
    return (
        <div className="bg-pbsblue max-w-screen">
            <div className="flex flex-col items-center w-full gap-2 p-6 mx-auto md:gap-8 md:py-10 md:max-w-4xl">
                <p className="text-xl text-center text-white md:text-4xl">Request a lesson for your School or an Individual</p>
                <div className="flex gap-6 w-fit">
                    <Link type="button" href={route('request.group')}><SecondaryButton>School or Group</SecondaryButton></Link>
                    <Link type="button" href={route('request.individual')}><SecondaryButton>Individual or Family</SecondaryButton></Link>
                </div>
            </div>
        </div>
    )
}