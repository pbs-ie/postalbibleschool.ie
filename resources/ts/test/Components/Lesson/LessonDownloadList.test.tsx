// Imports
import { render, screen } from "@testing-library/react";
import { responseLinks, setBesLinksOnce } from "@/helper";

// To Test
import LessonDownloadList from "@/Components/Lesson/LessonDownloadList";


const passedClass = "bg-bibletime-pink";
const tagCode = "level0";
let mockLinksObject: responseLinks = {};

beforeAll(() => {

    mockLinksObject[tagCode] = [{
        link: 'test',
        dateModified: "123",
        size: "123",
        series: "A",
        monthNumber: 2,

    },
    {
        link: 'test',
        dateModified: "123",
        size: "123",
        series: "A",
        monthNumber: 3,

    },
    {
        link: 'test',
        dateModified: "123",
        size: "123",
        series: "B",
        monthNumber: 4,

    },
    {
        link: 'test',
        dateModified: "123",
        size: "123",
        series: "A",
        monthNumber: 4,

    }];

    setBesLinksOnce(mockLinksObject);
})
beforeEach(() => {
    // Component makes use of window.matchMedia listener to adjust for responsive elements. This definition Mocks the matchMedia function for Jest
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
})

// Test
describe("Lesson Downloads list tests", () => {
    test('should render Lesson download list correctly', () => {
        //Setup
        const list = render(<LessonDownloadList tagClass={passedClass} tagCode={tagCode} />);

        const allButtons = list.queryAllByRole("button");
        const enabledButtons = allButtons.filter((el) => !(el as HTMLButtonElement).disabled);


        // Pre Expectations
        expect(list.queryAllByText(/^A\d/, { exact: false }).length).toBe(12);
        expect(list.queryAllByText(/^B\d/, { exact: false }).length).toBe(12);
        expect(list.queryAllByText(/^C\d/, { exact: false }).length).toBe(12);

        expect(allButtons.length).toBe(36);


        expect(enabledButtons.length).toBe(mockLinksObject[tagCode].length);

        enabledButtons.map((buttonElement) => {
            expect(buttonElement).not.toBeDisabled();
        })

    });

    test('should set correct number of enabled buttons for the corresponding series', () => {
        //Setup
        const list = render(<LessonDownloadList tagClass={passedClass} tagCode={tagCode} />);

        const AButtons = list.queryAllByRole("button", { name: /^A/ });
        const BButtons = list.queryAllByRole("button", { name: /^B/ });
        const CButtons = list.queryAllByRole("button", { name: /^C/ });

        const enabledAButtons = AButtons.filter((el) => !(el as HTMLButtonElement).disabled);
        const enabledBButtons = BButtons.filter((el) => !(el as HTMLButtonElement).disabled);
        const enabledCButtons = CButtons.filter((el) => !(el as HTMLButtonElement).disabled);

        const countAEnabled = mockLinksObject[tagCode].filter((el) => el.series === 'A');
        const countBEnabled = mockLinksObject[tagCode].filter((el) => el.series === 'B');
        const countCEnabled = mockLinksObject[tagCode].filter((el) => el.series === 'C');

        // Pre Expectations
        expect(enabledAButtons.length).toBe(countAEnabled.length);
        expect(enabledBButtons.length).toBe(countBEnabled.length);
        expect(enabledCButtons.length).toBe(countCEnabled.length);

    })
})