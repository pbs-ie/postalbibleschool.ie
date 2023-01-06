// Imports
import { render, screen } from "@testing-library/react";

// To Test
import LessonDownloadButton from "@/Components/Lesson/LessonDownloadButton";


// Test
test('should render Lesson download button component correctly', () => {
    //Setup\
    const passedClass = "bg-bibletime-pink";
    render(<LessonDownloadButton title={"Jacob"} infoText={null} infoClass={passedClass} getDownloadLink={"abcde"} />);

    // Pre Expectations
    expect(screen.getByRole('button')).not.toBeEmptyDOMElement();
    expect(screen.getByRole("button").classList.contains(`hover:${passedClass}`)).toBeTruthy();


    // Init

    // Post Expectations



});