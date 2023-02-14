// Imports
import { render, screen } from "@testing-library/react";

// To Test
import MonthlyOverview from "@/Components/MonthlyOverview";
import { responseLinks, setBesLinksOnce } from "@/helper";

const passedClass = "bg-bibletime-pink";
const mockLinksObject: responseLinks = {};

beforeAll(() => {

    mockLinksObject["level0"] = [{
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

// Tests
describe('Monthly overview component tests', () => {
    test('should render the overview', () => {
        //Setup
        const downloadButtonRender = render(<MonthlyOverview selectedMonth={0} selectedSeries={0} />);

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