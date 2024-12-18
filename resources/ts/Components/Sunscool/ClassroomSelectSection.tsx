import InputLabel from "@/Elements/Forms/InputLabel";
import SelectInput from "@/Elements/Forms/SelectInput";
import { SunscoolClassProps } from "@/Pages/Settings/Sunscool/Index";
import { router } from "@inertiajs/react";
import route from "ziggy-js";

interface ClassroomSelectSectionProps {
    schoolId: number,
    activeClassroomId: number,
    classrooms: SunscoolClassProps[],
    showProcessed: number,
    setShowProcessed: React.Dispatch<React.SetStateAction<number>>
}
export default function ClassroomSelectSection({ schoolId, classrooms, activeClassroomId, showProcessed, setShowProcessed }: ClassroomSelectSectionProps) {
    const isActiveClassNames = (classroom: SunscoolClassProps) => {
        if (classroom.id === activeClassroomId) {
            return "font-bold after:absolute after:h-0.5 after:rounded-t after:bg-pbsblue after:-bottom-0 after:left-0 after:right-0"
        }
        return "";
    };
    const handleClassroomChange = (classroomId: number) => {
        router.get(route('settings.sunscool.classroom', { schoolId: schoolId, classroomId: classroomId }))
    }
    return (
        <div className="flex justify-between">
            <ul className="flex gap-2 border-b border-gray-200">
                {classrooms.map((classroom) => (
                    <li className="w-fit hover:bg-gray-100" key={classroom.id}>
                        <button className={"w-full p-3 cursor-pointer relative " + isActiveClassNames(classroom)} onClick={() => handleClassroomChange(classroom.id)}>
                            {classroom.name}
                        </button>
                    </li>
                ))}
            </ul>
            <div>
                <div>
                    <InputLabel forInput="showProcessed" value={"Show Processed"} />
                    <SelectInput
                        id="showProcessed"
                        name="showProcessed"
                        value={showProcessed + ""}
                        handleChange={(e) => setShowProcessed(+e.target.value)}
                    >
                        <option value={1}>Show</option>
                        <option value={0}>Hide</option>
                    </SelectInput>
                </div>
            </div>
        </div>
    )
}