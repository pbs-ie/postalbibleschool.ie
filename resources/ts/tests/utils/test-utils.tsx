import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

import { Ziggy } from "@/ziggy";
import route from "@ziggy/dist";

const WrapperProviders = ({ children }: { children: React.ReactNode }) => {

    // globalThis.route = (name?: string | undefined, params?: any) => {
    //     if (name === undefined) {
    //         return route(undefined, params, undefined, Ziggy);
    //     } else {
    //         return route(name, params, undefined, Ziggy);
    //     }
    // };
    return (
        <>
            {children}
        </>
    )
}

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: WrapperProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }