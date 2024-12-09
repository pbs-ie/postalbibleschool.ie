import InputLabel from "@/Elements/Forms/InputLabel";
import SelectInput from "@/Elements/Forms/SelectInput";
import { SunscoolClassProps } from "@/Pages/Settings/Sunscool/Index";

interface ClassroomSelectSectionProps {
    classrooms: SunscoolClassProps[],
    currentClass: SunscoolClassProps,
    setCurrentClass: React.Dispatch<React.SetStateAction<SunscoolClassProps>>
    showProcessed: number,
    setShowProcessed: React.Dispatch<React.SetStateAction<number>>
}
export default function ClassroomSelectSection({ classrooms, currentClass, setCurrentClass, showProcessed, setShowProcessed }: ClassroomSelectSectionProps) {
    const isActiveClassNames = (classroom: SunscoolClassProps) => {
        if (classroom.id === currentClass.id) {
            return "font-bold after:absolute after:h-0.5 after:rounded-t after:bg-pbsblue after:-bottom-0 after:left-0 after:right-0"
        }
        return "";
    };
    return (
        <div className="flex justify-between">
            <ul className="flex gap-2 border-b border-gray-200">
                {classrooms.map((classroom) => (
                    <li className="w-fit hover:bg-gray-100" key={classroom.id}>
                        <button className={"w-full p-3 cursor-pointer relative " + isActiveClassNames(classroom)} onClick={() => setCurrentClass(classroom)}>
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