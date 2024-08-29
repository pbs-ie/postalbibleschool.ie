import { MonthKeys, monthMap } from "@/constants";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import Heading2Nospace from "@/Components/Typography/Heading2Nospace";
import { getIconForLessonType } from "@/helper";
import { usePage } from "@inertiajs/react";

interface ClassroomCurriculumCardProps {
    classCurriculum?: CurriculumProps;
    showCurriculumModal: () => void;
}

export default function ClassroomCurriculumCard({ classCurriculum, showCurriculumModal }: ClassroomCurriculumCardProps) {
    const { currentMonthToSeries } = usePage<PassedProps>().props;

    return (
        <div className="flex flex-col gap-2 p-5 mx-2 mb-3 border border-gray-200 rounded-lg shadow-md lg:mb-5">
            <Heading2Nospace className="capitalize">{`Current Curriculum - "${classCurriculum?.name}"`}</Heading2Nospace>
            <div>
                {classCurriculum && Object.keys(monthMap).map((value) => {
                    const month = value as MonthKeys;
                    return (

                        <div key={month} className="grid grid-cols-[2fr_1fr] items-center gap-2">
                            <div className="inline-block p-2 mb-px text-base font-medium capitalize rounded bg-sky-100 text-slate-700">
                                {`${monthMap[month as MonthKeys]} (${currentMonthToSeries[month as MonthKeys]})`}
                            </div>
                            <div className="mx-auto text-gray-700 transition ease-in-out border-gray-400 rounded-md shadow-sm bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 focus-within:text-inherit">
                                {getIconForLessonType(classCurriculum[month as MonthKeys])}
                            </div>
                        </div>
                    )
                })}
            </div>
            <PrimaryButton dataTest="add_curriculum_btn" onClick={() => showCurriculumModal()}>Change Curriculum</PrimaryButton>
        </div>
    )
}