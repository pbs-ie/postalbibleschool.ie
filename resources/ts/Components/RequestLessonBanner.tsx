import { Link } from "@inertiajs/inertia-react";
import SecondaryButton from "./SecondaryButton";

export default function RequestLessonBanner() {
    return (
        <div className="bg-pbsblue max-w-screen">
            <div className="w-full p-6 mx-auto space-y-2 md:max-w-2xl">
                <p className="text-xl font-bold text-center text-white md:text-3xl">Request a lesson for your School or an Individual</p>
                <div className="flex justify-around">
                    <Link type="button" href={route('request.school')}><SecondaryButton>School or Group</SecondaryButton></Link>
                    <Link type="button" href={route('request.home')}><SecondaryButton>Individual or Family</SecondaryButton></Link>
                </div>
            </div>
        </div>
    )
}