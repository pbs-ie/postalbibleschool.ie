describe('Testing syllabus actions', () => {
    beforeEach(() => {
        cy.intercept('GET', '**paypal**', (req) => { });
        cy.loginSession(Cypress.env("loginUser"), Cypress.env("loginPass"));
        cy.visit('/');
    })
    it('Creates a new syllabus', () => {

    })
})