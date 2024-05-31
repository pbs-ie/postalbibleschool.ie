import Group from "@/Elements/Icons/Group";
import ResourceCard from "@/Components/Cards/ResourceCard";
import Calendar from "@/Elements/Icons/Calendar";
import UserIcon from "@/Elements/Icons/UserIcon";
import Newspaper from "@/Elements/Icons/Newspaper";

export default function DashboardResourceSection({ canViewCurriculum = false }) {
    return (
        <div className="flex flex-wrap gap-2 justify-center mb-4">
            {/* TODO: Revealed route with Digital lessons features */}
            {/* <ResourceCard Icon={UserIcon} href={route('students.index')} title="My Students" /> */}
            {canViewCurriculum &&
                <>
                    <ResourceCard Icon={Group} href={route('curriculum.index')} title="Curriculum" />
                    <ResourceCard Icon={Newspaper} href={route('orders.index')} title="All Orders" />
                </>
            }
        </div>
    )
}