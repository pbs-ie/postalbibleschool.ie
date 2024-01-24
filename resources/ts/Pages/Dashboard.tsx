import ResourceCard from "@/Components/Cards/ResourceCard";
import Group from "@/Elements/Icons/Group";
import School from "@/Elements/Icons/SchoolIcon";
import Video from "@/Elements/Icons/VideoCamera";
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
                    <div className="flex flex-wrap gap-4">
                        <ResourceCard Icon={Group} href={route('assembly.index')} title="Assembly Videos" />
                        <ResourceCard Icon={Video} href={route('assembly.bonus.index')} title="Bonus Videos" />
                        <ResourceCard Icon={School} href={route('orders.index')} title="Monthly Orders" />
                    </div>
                </div>
            </ContentWrapper>
        </WrapperLayout>
    )
}