import ResourceCard from "@/Components/Cards/ResourceCard";
import Group from "@/Components/Icons/Group";
import SchoolIcon from "@/Components/Icons/SchoolIcon";
import VideoCamera from "@/Components/Icons/VideoCamera";
import Heading2 from "@/Components/Typography/Heading2";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { auth } = usePage<PassedProps>().props;

    return (
        <WrapperLayout>
            <ContentWrapper title="The Hub">
                <div className="flex flex-col items-center gap-2">
                    <Heading2>Resources</Heading2>
                    <div className="flex gap-4">
                        <ResourceCard Icon={Group} href={route('assembly.index')} title="Assembly Videos" />
                        <ResourceCard Icon={VideoCamera} href={route('assembly.bonus.index')} title="Bonus Videos" />
                        <ResourceCard Icon={SchoolIcon} href={route('orders.index')} title="Monthly Orders" />
                    </div>
                </div>
            </ContentWrapper>
        </WrapperLayout>
    )
}