import ResourceCard from "@/Components/Cards/ResourceCard";
import Group from "@/Elements/Icons/Group";
import School from "@/Elements/Icons/SchoolIcon";
import Video from "@/Elements/Icons/VideoCamera";
import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";
import { usePage } from "@inertiajs/react";
import ClassroomComponent from "@/Components/ClassroomComponent";
import Heading2Alt from "@/Components/Typography/Heading2Alt";

export default function Dashboard({ classrooms }: { classrooms: any }) {
    const { auth } = usePage<PassedProps>().props;


    return (
        <WrapperLayout>
            <ContentWrapper title="Teachers Hub">
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 lg:gap-2">
                    <ClassroomComponent classrooms={classrooms} />
                    <div className="flex flex-col items-start">
                        <Heading2Alt>Additional Resources</Heading2Alt>
                        <div className="flex flex-wrap gap-2">
                            <ResourceCard Icon={Group} href={route('assembly.index')} title="Assembly Videos" />
                            <ResourceCard Icon={Video} href={route('assembly.bonus.index')} title="Bonus Videos" />
                            <ResourceCard Icon={School} href={route('orders.index')} title="Monthly Orders" />
                        </div>
                    </div>
                </div>
            </ContentWrapper>
        </WrapperLayout>
    )
}