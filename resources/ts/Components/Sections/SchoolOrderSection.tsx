import ProjectedOrdersSection, { ProjectedOrders } from "@/Components/Sections/ProjectedOrdersSection";
import CurriculumListSection from "@/Components/Sections/CurriculumListSection";
import ClassroomListSection from "./ClassroomListSection";

interface SchoolOrderProps {
    classrooms: ClassroomProps[];
    projectedOrders: ProjectedOrders[];
    curricula: CurriculumProps[];
    schoolEmail?: string;
}

export default function SchoolOrderSection({ classrooms, projectedOrders, curricula, schoolEmail }: SchoolOrderProps) {
    return (
        <div className="flex flex-col w-full p-2 mx-auto lg:p-4 lg:max-w-7xl">
            <ClassroomListSection schoolEmail={schoolEmail} classrooms={classrooms} curriculumList={curricula} />
            <CurriculumListSection curriculumList={curricula} />
            <ProjectedOrdersSection projectedOrders={projectedOrders} hasClassrooms={classrooms.length !== 0} />
        </div>
    )
}