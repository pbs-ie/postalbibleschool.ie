import ClassroomListSection from "@/Components/Sections/ClassroomListSection";
import { render, screen } from "test-utils";


jest.mock("@inertiajs/react", () => ({
    ...jest.requireActual('@inertiajs/react'),
    useForm: () => ({
        data: {
            name: ""
        }
    }),
    router: () => ({}),
    usePage: () => ({
        props: {
            errors: {
            },
        }
    })
}));

describe("Classroom List Section in Dashboard", () => {
    it("shows a text string by default for no classrooms created", () => {

        render(<ClassroomListSection classrooms={[]} curriculumList={[]} />);


        expect(screen.getByText('No classroom found. Create a new one by clicking the button below.')).toBeInTheDocument();
    })
})