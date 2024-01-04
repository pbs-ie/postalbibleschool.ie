// Imports
import { render, screen } from "@testing-library/react";

// To Test
import LessonDownloadButton from "@/Elements/Buttons/LessonDownloadButton";

const passedClass = "bg-bibletime-pink";

// Tests
describe('Lesson download button render', () => {
    test('should render Lesson download button WITHOUT infotext correctly', () => {
        //Setup
        const downloadButtonRender = render(<LessonDownloadButton title={"Jacob"} infoClass={passedClass} downloadLink={"abcde"} />);

        const buttonElement = downloadButtonRender.getByRole('button');

        // Pre Expectations
        expect(buttonElement).not.toBeEmptyDOMElement();
        expect(buttonElement.classList.contains(`hover:${passedClass}`)).toBeTruthy();

    });
    test('should render Lesson download button WITH infotext correctly', () => {
        //Setup
        const infoText = "Level 0";
        const downloadButtonRender = render(<LessonDownloadButton title={"Jacob"} infoText={infoText} infoClass={passedClass} downloadLink={"abcde"} />);

        const buttonElement = downloadButtonRender.getByRole('button');

        // Pre Expectations
        expect(buttonElement).not.toBeEmptyDOMElement();
        expect(buttonElement.classList.contains(`hover:${passedClass}`)).toBeTruthy();
        expect(downloadButtonRender.getByText(infoText)).not.toBeEmptyDOMElement();

    });

    test('should render disabled button component correctly', () => {
        const downloadButtonRender = render(<LessonDownloadButton title={"Jacob"} infoClass={passedClass} downloadLink={""} />);

        const downloadButton = downloadButtonRender.getByRole('button');

        expect(downloadButton).not.toBeEmptyDOMElement();
        expect(downloadButton).toBeDisabled();
        expect(downloadButton.classList).not.toContain(`hover:${passedClass}`);
        expect(downloadButton.classList).toContain('text-gray-500');

    })

    test('should render button with no values passed', () => {
        const downloadButton = render(<LessonDownloadButton title={"Test title"} infoClass={passedClass} />);

        expect(downloadButton.getByRole('button')).not.toBeEmptyDOMElement();
    })
})