import { SunscoolStudentProps } from "@/Pages/Settings/Sunscool/Index";

export default function StudentMarksSection({ students }: { students: SunscoolStudentProps[] }) {
    return (
        <div className="overflow-auto max-h-96">
            <pre>{JSON.stringify(students, null, 2)}</pre>
        </div>
    )
}