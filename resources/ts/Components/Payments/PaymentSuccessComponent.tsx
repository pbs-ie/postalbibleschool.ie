import { Link } from "@inertiajs/react";
import SecondaryButton from "@/Elements/Buttons/SecondaryButton";
import CheckBadge from "@/Elements/Icons/CheckBadge";
import route from "ziggy-js";

export default function PaymentSuccessComponent() {
    return (
        <div className="flex flex-col items-center gap-4 my-6">
            <CheckBadge className="w-40 h-40 text-green-600" />
            <p>Your transaction has been successful!</p>
            <Link href={route('home')}><SecondaryButton>Return Home</SecondaryButton></Link>
        </div>
    )
}