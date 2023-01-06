// Imports
import { render, screen } from "@testing-library/react";
import { setBesLinksOnce } from "@/helper";

// To Test
import LessonDownloadList from "@/Components/Lesson/LessonDownloadList";

let windowMock: jest.Mock<(query: string) => MediaQueryList>;

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
test('should render Lesson download list correctly', () => {
    //Setup
    const passedClass = "bg-bibletime-pink";
    setBesLinksOnce({
        "level0": [{
            link: 'test',
            dateModified: "123",
            size: "123",
            series: "A",
            monthNumber: 2,

        }]
    });

    const list = render(<LessonDownloadList tagClass="" tagCode="" />);

    // Pre Expectations
    expect(list.queryAllByText(/^A\d/, { exact: false }).length).toBe(12);

    // Init


    // Post Expectations



});