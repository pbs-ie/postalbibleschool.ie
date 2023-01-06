// Imports
import { render, screen } from "@testing-library/react";

// To Test
import TagGroupPill from "@/Components/TagGroupPill";

// Test
test('should render Tag group pill component correctly', () => {
    //Setup
    const content = "Check this text";
    const pillRender = render(<TagGroupPill addClass={"bg-bibletime-pink"} children={<h1>{content}</h1>}></TagGroupPill>)

    const pillElement = pillRender.getByText(content);

    // Pre Expectations
    expect(pillElement).not.toBeEmptyDOMElement();
    expect(pillElement).toHaveTextContent(content);


});