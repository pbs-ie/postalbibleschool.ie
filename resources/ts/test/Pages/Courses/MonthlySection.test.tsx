// Imports
import { render, screen, waitFor, within } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";

import { responseLinks, setBesLinksOnce } from "@/helper";
import LessonSelectorComponent from "@/Pages/Courses/MonthlySection";
import { monthNames, seriesNames } from "@/constants";
import { mockLinksObject, passedClass } from "@/test/__mocks__/constants";

// To Test

beforeAll(() => {

    setBesLinksOnce(mockLinksObject);
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

        expect(section.getByText(defaultMsg)).toBeInTheDocument();

        //Act
        await user.click(monthButtons[0]);
        await user.click(seriesButtons[0]);

        //Post Expectations
        await waitFor(() => {
            expect(section.queryByText(defaultMsg)).toBeNull();
            const getL0Button = section.getByRole('button', { name: /Level 0/i });
            const getL1Button = section.getByRole('button', { name: /Level 1/i });
            const getL2Button = section.getByRole('button', { name: /Level 2/i });
            const getL3Button = section.getByRole('button', { name: /Level 3/i });
            const getL4Button = section.getByRole('button', { name: /Level 4/i });
            const getLOPButton = section.getByRole('button', { name: /Online Presentation/i });

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