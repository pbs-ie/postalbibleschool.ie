describe("Classroom Page tests", () => {
    before(() => {
        cy.refreshDatabase();
    })
    beforeEach(() => {
        cy.intercept('GET', '**paypal**', (req) => { });
        cy.login(Cypress.env("loginUser"), Cypress.env("loginPass"));
        cy.visit('/');

    });

    describe("Navigate to the classroom page", { testIsolation: false }, () => {
        it('Opens, closes and reopens create new class dialog', () => {
            cy.get("h2").should('contain.text', "My Classes");
            cy.getBySel("classroom_create_button").click();
            cy.contains(/create a new classroom/i);
            cy.getBySel("classroom_cancel_button").should('be.visible').click();
            cy.get("h2").should('contain.text', "My Classes");
            cy.getBySel("classroom_create_button").click();
            cy.contains(/create a new classroom/i);
        })
    })

    describe.only("Classroom creation actions", () => {
        it('Creates a new classroom', () => {
            const classroomName = "New #Test Classroom";
            cy.get("h2").should('contain.text', "My Classes");

            cy.getBySel("classroom_create_button").click();
            cy.contains(/create a new classroom/i);

            // Fill in the form and submit
            cy.get('input#classroomName').type(classroomName);
            cy.intercept('/*').as('classroom');
            cy.get('button[type="submit"]').contains('Create').click();

            // Wait for page load
            cy.wait('@classroom');

            // Dialog is closed on submission and classroom list updated
            cy.get('button[type="submit"]').contains('Create').should('not.be.visible');
            cy.get('form#classroom_form').contains(classroomName, { matchCase: false });
        })
        it('Does not create duplicate classroom', () => {
            cy.get("h2").should('contain.text', "My Classes");
            cy.getBySel("classroom_create_button").click();
            cy.contains(/create a new classroom/i);

            // Fill in the form and submit
            const classroomName = "Duplicate Classroom";
            cy.get('input[id="classroomName"]').type(classroomName);
            cy.intercept('/*').as('classroom');

            cy.get('button[type="submit"]').contains('Create').click();

            cy.wait('@classroom');

            // Dialog is closed on submission and redirect to the classroom
            cy.get('button[type="submit"]').contains('Create').should('not.be.visible');
            cy.get('form#classroom_form').contains(classroomName, { matchCase: false });

            // Remake a classroom with the same name
            cy.getBySel("classroom_create_button").click();
            cy.contains(/create a new classroom/i);
            cy.get('input[id="classroomName"]').type(classroomName);
            cy.intercept('/*').as('classroom');
            cy.get('button[type="submit"]').contains('Create').click();

            cy.wait('@classroom');
            // Dialog is closed on submission and no page redirect
            cy.get('button[type="submit"]').contains('Create').should('not.be.visible');
            cy.get("h2").should('contain.text', "My Classes");
            cy.get('form#classroom_form').contains(classroomName, { matchCase: false });

        })
    })
})