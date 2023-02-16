// Imports
import { render, screen } from "@testing-library/react";

// To Test
import LessonSelectorList from "@/Components/LessonSelectorList";
import { setAllBesLinks } from "@/helper";

import { mockLinksObject } from "@/tests/__mocks__/constants";
import { route } from "@/tests/__mocks__/ziggy";

const passedClass = "bg-bibletime-pink";

beforeAll(() => {
    window.route = route;
    setAllBesLinks(mockLinksObject);
})

// Tests
describe('Monthly overview component tests', () => {
    test('should render the overview', () => {
        //Setup
        const downloadButtonRender = render(<LessonSelectorList selectedMonth={0} selectedSeriesAlphabet={'A'} />);

        const allButtonElements = downloadButtonRender.getAllByRole('button');
        const getL0Button = downloadButtonRender.getByRole('button', { name: /Level 0/i });
        const getL1Button = downloadButtonRender.getByRole('button', { name: /Level 1/i });
        const getL2Button = downloadButtonRender.getByRole('button', { name: /Level 2/i });
        const getL3Button = downloadButtonRender.getByRole('button', { name: /Level 3/i });
        const getL4Button = downloadButtonRender.getByRole('button', { name: /Level 4/i });
        const getLOPButton = downloadButtonRender.getByRole('button', { name: /Online Presentation/i });

        // Pre Expectations
        expect(allButtonElements.length).toBe(6);

        expect((getL0Button).classList).toContain(`hover:${passedClass}`);
        expect((getL0Button as HTMLButtonElement).disabled).toBeFalsy();;
        expect((getL1Button as HTMLButtonElement).disabled).toBeTruthy();
        expect((getL2Button as HTMLButtonElement).disabled).toBeTruthy();
        expect((getL3Button as HTMLButtonElement).disabled).toBeTruthy();
        expect((getL4Button as HTMLButtonElement).disabled).toBeTruthy();
        expect((getLOPButton as HTMLButtonElement).disabled).toBeTruthy();

    })

})