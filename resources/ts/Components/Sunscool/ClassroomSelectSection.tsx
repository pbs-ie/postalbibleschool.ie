import List from "@/Elements/Lists/List";
import ListItem from "@/Elements/Lists/ListItem";
import { SunscoolClassProps } from "@/Pages/Settings/Sunscool/Index";

export default function ClassroomSelectSection({ classrooms, currentClass, setCurrentClass }: { classrooms: SunscoolClassProps[], currentClass: SunscoolClassProps, setCurrentClass: React.Dispatch<React.SetStateAction<SunscoolClassProps>> }) {
    return (
        <div>
            <List>
                {classrooms.map((classroom) => (
                    <ListItem key={classroom.id} isActive={currentClass.id === classroom.id}>
                        <div className="w-full cursor-pointer" onClick={() => setCurrentClass(classroom)}>
                            {classroom.name}
                        </div>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}