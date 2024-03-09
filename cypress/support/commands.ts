
/// <reference types="cypress" />

// https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul
export { }
import { isTablet } from "./utils";

declare global {
    namespace Cypress {
        interface Chainable {
            loginSession(email: string, password: string): Chainable<void>
            getBySel(selector: string, args?: any): Chainable<void>
            getBySelLike(selector: string, args?: any): Chainable<void>
            login(email: string, password: string): Chainable<void>
            //   drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
            //   dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
            //   visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
        }
    }
}
Cypress.Commands.add('getBySel', (selector, ...args) => {
    cy.get(`[data-test=${selector}]`, ...args);
})
Cypress.Commands.add('getBySelLike', (selector, ...args) => {
    cy.get(`[data-test*=${selector}]`, ...args);
})

Cypress.Commands.add('login', (email, password) => {
    cy.visit('/');
    if (isTablet()) {
        cy.getBySel("menubutton").should('be.visible').click();
        cy.get("a[href*='login']").should('contain.text', 'Login').filter(":visible").click();

    } else {
        cy.getBySel("menubutton").should('not.be.visible');
        cy.get("a[href*='login']").should('contain.text', 'Login').first().click();

    }
    cy.origin(Cypress.env('auth0Domain'), { args: [email, password] }, ([email, password]) => {
        cy.get("input#username").type(email);
        cy.get("input#password").type(password);
        cy.get("button[type='submit']").click();
    });
    cy.get('h1').should('contain', 'Hub');
});

Cypress.Commands.add('loginSession', (email, password) => {
    cy.session([email, password], () => {
        cy.visit('/');
        if (isTablet()) {
            cy.getBySel("menubutton").should('be.visible').click();
            cy.get("a[href*='login']").should('contain.text', 'Login').filter(":visible").click();

        } else {
            cy.getBySel("menubutton").should('not.be.visible');
            cy.get("a[href*='login']").should('contain.text', 'Login').first().click();

        }
        cy.origin(Cypress.env('auth0Domain'), { args: [email, password] }, ([email, password]) => {
            cy.get("input#username").type(email);
            cy.get("input#password").type(password);
            cy.get("button[type='submit']").click();
        });
        cy.get('h1').should('contain', 'Hub');
    })
})

