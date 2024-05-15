// Imports
import { act, render, screen, waitFor, within } from "test-utils";
import UserEvent from "@testing-library/user-event";

import { responseLinks, setAllBesLinks } from "@/helper";
import LessonSelectorComponent from "@/Pages/Courses/LessonSelectorComponent";
import { monthNames, seriesNames } from "@/constants";
import { mockLinksObject, passedClass } from "@/tests/__mocks__/constants";

// To Test

beforeAll(() => {

    setAllBesLinks(mockLinksObject);
})

// Test
describe("Test for full monthly downloads section", () => {
    test('should render month and series buttons', () => {
        //Setup
        const section = render(<LessonSelectorComponent />);

        const allLists = section.getAllByRole('list');

        const monthList = allLists[0];
        const seriesList = allLists[1];

        const monthButtons = within(monthList).getAllByRole('button');
        const seriesButtons = within(seriesList).getAllByRole('button');


        // Pre Expectations
        monthButtons.map((btn, idx) => {
            expect(btn.textContent).toBe(monthNames[idx]);
        });

        seriesButtons.map((btn, idx) => {
            expect(btn.textContent).toBe(seriesNames[idx].name);
        });

    });

    test('should show default message and update on selection of buttons', async () => {
        const section = render(<LessonSelectorComponent />);

        const defaultMsg = "Select a month and series to see the available download links here."

        const allButtons = section.getAllByRole('button');
        const allLists = section.getAllByRole('list');

        const monthList = allLists[0];
        const seriesList = allLists[1];

        const monthButtons = within(monthList).getAllByRole('button');
        const seriesButtons = within(seriesList).getAllByRole('button');
        let user = UserEvent.setup();


        //Pre expectations
        allButtons.map((btn) => {
            expect(btn).not.toHaveAttribute('active');
        })

        // expect(section.getByText(defaultMsg)).toBeInTheDocument();

        //Act
        act(() => {
            user.click(monthButtons[0]);
            user.click(seriesButtons[0]);
        })



        //Post Expectations
        await waitFor(() => {
            expect(section.queryByText(defaultMsg)).toBeNull();
            const getL0Button = section.getByRole('link', { name: /Level 0/i });
            const getL1Button = section.getByRole('link', { name: /Level 1/i });
            const getL2Button = section.getByRole('link', { name: /Level 2/i });
            const getL3Button = section.getByRole('link', { name: /Level 3/i });
            const getL4Button = section.getByRole('link', { name: /Level 4/i });
            const getLOPButton = section.getByRole('link', { name: /Online Presentation/i });

            expect((getL0Button).classList).toContain(`hover:${passedClass}`);
            expect((getL0Button as HTMLButtonElement).disabled).toBeFalsy();;
            expect((getL1Button as HTMLButtonElement).disabled).toBeTruthy();
            expect((getL2Button as HTMLButtonElement).disabled).toBeTruthy();
            expect((getL3Button as HTMLButtonElement).disabled).toBeTruthy();
            expect((getL4Button as HTMLButtonElement).disabled).toBeTruthy();
            expect((getLOPButton as HTMLButtonElement).disabled).toBeTruthy();
        })

    })

})