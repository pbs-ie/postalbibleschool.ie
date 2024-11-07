import ContentWrapper from "@/Layouts/ContentWrapper";
import WrapperLayout from "@/Layouts/WrapperLayout";

import SchoolOrderSection from "@/Components/Sections/SchoolOrderSection";
import { ProjectedOrders } from "@/Components/Sections/ProjectedOrdersSection";
import SchoolSelectDropdown, { SchoolsListProps } from "@/Components/SchoolOrders/SchoolSelectDropdown";
import ButtonLink from "@/Elements/Buttons/ButtonLink";
import ChevronLeft from "@/Elements/Icons/ChevronLeft";

import route from "ziggy-js";


export default function Show({ schoolDetails, schoolsList, classrooms, projectedOrders = [], curricula = [] }: { schoolDetails: SchoolDetailsProps, schoolsList: SchoolsListProps[], classrooms: ClassroomProps[], projectedOrders: ProjectedOrders[], curricula: CurriculumProps[] }) {
    console.log(schoolsList);
    return (
        <WrapperLayout>
            <ButtonLink hierarchy="transparent" href={route('orders.index')}><span className="flex items-center gap-2">
                <ChevronLeft />{"Back to List"}
            </span></ButtonLink>
            <ContentWrapper title="School Lesson Order">
                <div className="flex items-baseline gap-2 bg-gray-100 rounded">
                    <SchoolSelectDropdown currentSchoolId={schoolDetails.id} schoolsList={schoolsList} />
                </div>
                <SchoolOrderSection classrooms={classrooms} projectedOrders={projectedOrders} curricula={curricula} schoolEmail={schoolDetails.email} />

            </ContentWrapper>
        </WrapperLayout>
    )
}