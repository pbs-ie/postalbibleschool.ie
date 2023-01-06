// Imports
import { render, screen } from "@testing-library/react";

// To Test
import LessonDownloadButton from "@/Components/Lesson/LessonDownloadButton";

const passedClass = "bg-bibletime-pink";

// Tests
describe('Lesson download button render', () => {
    test('should render Lesson download button WITHOUT infotext correctly', () => {
        //Setup
        const downloadButtonRender = render(<LessonDownloadButton title={"Jacob"} infoText={null} infoClass={passedClass} downloadLink={"abcde"} />);

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
        const downloadButton = render(<LessonDownloadButton title={"Jacob"} infoText={null} infoClass={passedClass} downloadLink={""} />);

        expect(downloadButton.getByRole('button')).not.toBeEmptyDOMElement();
        expect(downloadButton.getByRole('button')).toBeDisabled();

    })

    test('should render button with no values passed', () => {
        const downloadButton = render(<LessonDownloadButton title={"Test title"} infoText={null} infoClass={passedClass} downloadLink={null} />);

        expect(downloadButton.getByRole('button')).not.toBeEmptyDOMElement();
    })
})