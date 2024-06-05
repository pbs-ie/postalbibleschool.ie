export const isMobile = () => {
    return (
        Cypress.config("viewportWidth") <
        Cypress.env("mobileViewportWidthBreakpoint")
    )
}

export const isTablet = () => {
    return (
        Cypress.config("viewportWidth") <
        Cypress.env("tabletViewportWidthBreakpoint")
    )
}