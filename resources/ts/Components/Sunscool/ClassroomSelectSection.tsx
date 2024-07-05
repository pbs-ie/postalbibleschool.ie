import { SunscoolClassProps } from "@/Pages/Settings/Sunscool/Index";

export default function ClassroomSelectSection({ classrooms, currentClass, setCurrentClass }: { classrooms: SunscoolClassProps[], currentClass: SunscoolClassProps, setCurrentClass: React.Dispatch<React.SetStateAction<SunscoolClassProps>> }) {
    const isActiveClassNames = (classroom: SunscoolClassProps) => {
        if (classroom.id === currentClass.id) {
            return "font-bold after:absolute after:h-0.5 after:rounded-t after:bg-pbsblue after:-bottom-0 after:left-0 after:right-0"
        }
        return "";
    };
    return (
        <div className="mb-4">
            <ul className="flex gap-2 border-b border-gray-200">
                {classrooms.map((classroom) => (
                    <li className="w-fit hover:bg-gray-100" key={classroom.id}>
                        <button className={"w-full p-3 cursor-pointer relative " + isActiveClassNames(classroom)} onClick={() => setCurrentClass(classroom)}>
                            {classroom.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}