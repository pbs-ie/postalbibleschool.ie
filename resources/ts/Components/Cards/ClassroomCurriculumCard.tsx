import { monthMap, monthNames } from "@/constants";
import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import Heading2Nospace from "@/Components/Typography/Heading2Nospace";

interface ClassroomCurriculumCardProps {
    classCurriculum?: CurriculumProps;
    showCurriculumModal: () => void;
}

export default function ClassroomCurriculumCard({ classCurriculum, showCurriculumModal }: ClassroomCurriculumCardProps) {

    return (
        <div className="flex flex-col gap-2 mb-3 lg:mb-5 mx-2 border border-gray-200 rounded-lg shadow-md p-5">
            <Heading2Nospace>{classCurriculum?.name}</Heading2Nospace>
            <div>
                {classCurriculum && [...monthMap.keys()].map((month) => (
                    <div key={month} className="grid grid-cols-[1fr_2fr] items-center gap-2">
                        <div className="inline-block capitalize p-2 text-base rounded bg-sky-100 font-medium md:text-base mb-px text-slate-700">
                            {monthNames[monthMap.get(month) ?? 0]}
                        </div>
                        <div className="border-gray-400 bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm transition ease-in-out text-gray-700 focus-within:text-inherit">
                            {classCurriculum[month]}
                        </div>
                    </div>
                ))}
            </div>
            <PrimaryButton dataTest="add_curriculum_btn" onClick={() => showCurriculumModal()}>Select Curriculum for classroom</PrimaryButton>
        </div>
    )
}