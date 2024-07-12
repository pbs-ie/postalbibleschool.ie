import _ from "lodash";

import OrderInfoCard from "@/Components/Cards/OrderInfoCard";
import ClassroomListSection from "@/Components/Sections/ClassroomListSection";

interface SchoolOrderProps {
    lessonOrder: LessonOrder;
    classrooms: ClassroomProps[];
    curriculumList?: CurriculumProps[],
}

export default function SchoolOrderSection({ lessonOrder, classrooms, curriculumList }: SchoolOrderProps) {
    return (
        <>
            <div className="w-full gap-2 p-4 space-y-4">
                <div className="shrink-0">
                    <OrderInfoCard contactName={lessonOrder.contactName} schoolName={lessonOrder.schoolName} email={lessonOrder.email} level0Order={lessonOrder.level0Order} level1Order={lessonOrder.level1Order} level2Order={lessonOrder.level2Order} level3Order={lessonOrder.level3Order} level4Order={lessonOrder.level4Order} tlpOrder={lessonOrder.tlpOrder}></OrderInfoCard>
                </div>
                {classrooms.length === 0 ?
                    <p className="w-full text-red-800 bg-red-200 lg:w-1/2">No classrooms created for this school</p>
                    :
                    <ClassroomListSection viewOnly classrooms={classrooms} curriculumList={curriculumList ?? []} />
                }
            </div>
        </>
    )
}