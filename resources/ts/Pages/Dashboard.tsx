import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { Link, usePage } from "@inertiajs/inertia-react";

export default function ContactUs() {
    const { auth } = usePage<PassedProps>().props;

    return (
        <WrapperLayout>
            <ContentWrapper title="Dashboard">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-2 w-fit">
                        <img className="w-8" src={auth?.user?.picture} alt={`${auth?.user?.nickname} Picture`} />
                        Welcome {auth?.user?.nickname}
                    </div>
                    <div className="flex justify-center w-full gap-2">
                        <Link href={"/assembly"}>
                            <PrimaryButton>Assembly Videos</PrimaryButton>
                        </Link>
                        <Link href={"/order/edit"}>
                            <PrimaryButton>Order Form</PrimaryButton>
                        </Link>
                    </div>
                </div>
            </ContentWrapper>
        </WrapperLayout>
    )
}