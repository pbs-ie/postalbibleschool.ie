describe("Classroom Page tests", () => {
    beforeEach(() => {
        cy.intercept('GET', '**paypal**', (req) => { });
        cy.loginSession(Cypress.env("loginUser"), Cypress.env("loginPass"));
        cy.visit('/');

    });

    describe("Navigate to the classroom page", { testIsolation: false }, () => {

        it('Opens, closes and reopens create new class dialog', () => {
            cy.get("h2").eq(0).should('contain.text', "My Classes");
            cy.getBySel("classroom_create_button").click();
            cy.contains(/create a new classroom/i);
            cy.getBySel("classroom_close_button").click();
            cy.get("h2").eq(0).should('contain.text', "My Classes");
            cy.getBySel("classroom_create_button").click();
            cy.contains(/create a new classroom/i);
        })
    })

    describe("Classroom creation actions", () => {
        after(() => {
            cy.getBySel('classroom_list').children('li').should('have.length.greaterThan', 0).then(() => {
                cy.getBySel('classroom-delete').each(($item) => {
                    cy.wrap($item).click();
                })
            })
        })
        it('Creates a new classroom', () => {
            const classroomName = "New Test Classroom";
            cy.get("h2").eq(0).should('contain.text', "My Classes");

            cy.getBySel("classroom_create_button").click();
            cy.contains(/create a new classroom/i);

            // Fill in the form and submit
            cy.get('input#classroomName').type(classroomName);
            cy.intercept('/*').as('classroom');
            cy.get('button[type="submit"]').contains('Confirm').click();

            // Wait for page load
            cy.wait('@classroom');

            // Dialog is closed on submission and redirect to the classroom
            cy.get('button[type="submit"]').contains('Confirm').should('not.be.visible');
            cy.get('h1').contains(classroomName, { matchCase: false });

            // New classroom is added to list of classes
            cy.get('button[type="button"').contains(/back to hub/i).click();
            cy.getBySel('classroom_list').contains(classroomName, { matchCase: false });
        })
        it('Does not create duplicate classroom', () => {
            cy.get("h2").eq(0).should('contain.text', "My Classes");
            cy.getBySel("classroom_create_button").click();
            cy.contains(/create a new classroom/i);

            // Fill in the form and submit
            const classroomName = "Duplicate Classroom";
            cy.get('input[id="classroomName"]').type(classroomName);
            cy.intercept('/*').as('classroom');

            cy.get('button[type="submit"]').contains('Confirm').click();

            cy.wait('@classroom');

            // Dialog is closed on submission and redirect to the classroom
            cy.get('button[type="submit"]').contains('Confirm').should('not.be.visible');
            cy.get('h1').contains(classroomName, { matchCase: false });

            // New classroom is added to list of classes
            cy.get('button[type="button"').contains(/back to hub/i).click();
            cy.getBySel('classroom_list').contains(classroomName, { matchCase: false });

            // Remake a classroom with the same name
            cy.getBySel("classroom_create_button").click();
            cy.contains(/create a new classroom/i);
            cy.get('input[id="classroomName"]').type(classroomName);
            cy.intercept('/*').as('classroom');
            cy.get('button[type="submit"]').contains('Confirm').click();

            cy.wait('@classroom');
            // Dialog is closed on submission and no page redirect
            cy.get('button[type="submit"]').contains('Confirm').should('not.be.visible');
            cy.get("h2").eq(0).should('contain.text', "My Classes");
            cy.getBySel('classroom_list').contains(classroomName, { matchCase: false });

        })
    })
})