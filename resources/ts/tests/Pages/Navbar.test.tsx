// Imports
import { render, screen } from "@testing-library/react";


import Navbar from "@/Components/Navigation/Navbar";

import { Ziggy } from "@/ziggy";
import route from "@ziggy/dist";

beforeAll(() => {
    globalThis.route = (name?: string | undefined, params?: any) => {
        if (name === undefined) {
            return route(undefined, params, undefined, Ziggy);
        } else {
            return route(name, params, undefined, Ziggy);
        }
    };
})

// Test
describe("Home page", () => {
    describe("Navbar links", () => {
        test('Should render the landing cards correctly', () => {
            //Setup
            render(<Navbar />);

            screen.debug();
            //Pre expectations

            //Act

            //Post Expectations

        })
    })

})