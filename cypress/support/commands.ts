
// https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul
import { isTablet } from "./utils";

declare global {
    namespace Cypress {
        interface Chainable {
            loginSession(email: string, password: string): Chainable<void>
            getBySel(selector: string, args?: any): Chainable<void>
            getBySelLike(selector: string, args?: any): Chainable<void>
            login(email: string, password: string): Chainable<void>
            createBonusVideoEntry(videoTitle: string): Chainable<void>
            navigateToBonusVideos(goToAdmin: boolean): Chainable<void>
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
    cy.origin(Cypress.env('auth0Domain'), { args: { email, password } }, ({ email, password }) => {
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
        cy.origin(Cypress.env('auth0Domain'), { args: { email, password } }, ({ email, password }) => {
            cy.get("input#username").type(email);
            cy.get("input#password").type(password);
            cy.get("button[type='submit']").click();
        });
        cy.get('h1').should('contain', 'Hub');
    })
})

// Bonus Videos
Cypress.Commands.add('createBonusVideoEntry', (videoTitle) => {
    cy.navigateToBonusVideos(false);
    // Create a bonus video
    cy.getBySel('add_new_bonus_button').click();

    cy.get('h1').contains('create new bonus assembly video', { matchCase: false });

    // Act
    cy.get("input[id='title']").type(videoTitle);
    cy.get("select[id='category'").select("bbooks");
    cy.get('input[type=file]').selectFile('cypress/images/bbcover.png');

    cy.get("input[id='externalUrl']").type("https://vimeo.com/868838499?share=copy");
    cy.get("input[id='videoTitle']").type(videoTitle);
    cy.get("input[id='duration']").type("1 min");

    cy.get('form').submit();

    // Assert
    cy.get('h1').contains('admin - bonus videos', { matchCase: false });
    cy.get('table tbody tr td').contains(videoTitle, { matchCase: false });

})

Cypress.Commands.add('navigateToBonusVideos', (goToAdmin) => {
    // Navigate to bonus videos section
    cy.visit('/');
    cy.getBySel("menubutton").should('be.visible').click();
    cy.get("nav a[href*='assembly']").should('be.visible').should('contain.text', 'Assembly').filter(":visible").click();
    cy.get('h1').contains('school assembly videos', { matchCase: false });
    cy.getBySel('link_bonus_gallery').should('be.visible').click();
    cy.get('h1').contains('bonus videos', { matchCase: false });
    cy.get('h2').contains('big bible words', { matchCase: false });
    cy.get('h2').contains('bible books explained', { matchCase: false });

    cy.get('h1').contains('bonus videos', { matchCase: false });
    if (goToAdmin) {
        cy.getBySel('bonus_admin_button').should('be.visible').click();
    }
})
