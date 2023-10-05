import { Link } from "@inertiajs/react";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";

export default function PaymentSuccessComponent() {
    return (
        <div className="flex flex-col gap-4 my-6">
            <p>Your transaction has been successful.</p>
            <Link href={route('home')}><SecondaryButton>Go Home</SecondaryButton></Link>
        </div>
    )
}