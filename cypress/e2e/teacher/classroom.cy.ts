describe("Navigate to the classroom page", { testIsolation: false }, () => {
    beforeEach(() => {
        cy.intercept('GET', '**paypal**', (req) => { });
        cy.loginSession(Cypress.env("loginUser"), Cypress.env("loginPass"));
        cy.visit('/');

    });
    it('Opens, closes and reopens create new class dialog', () => {
        cy.get("h2").eq(0).should('contain.text', "My Classes");
        cy.getBySel("classroom_create_button").click();
        cy.contains(/create a new classroom/i);
        cy.getBySel("classroom_close_button").click();
        cy.get("h2").eq(0).should('contain.text', "My Classes");
        cy.getBySel("classroom_create_button").click();
        cy.contains(/create a new classroom/i);
    })
    it('Creates a new classroom', () => {
        const classroomName = "New Test Classroom";
        cy.get("h2").eq(0).should('contain.text', "My Classes");

        cy.getBySel("classroom_create_button").click();
        cy.contains(/create a new classroom/i);

        // Fill in the form and submit
        cy.get('input#classroomName').type(classroomName);
        cy.get('button[type="submit"]').contains('Confirm').click();

        // Dialog is closed on submission and redirect to the classroom
        cy.get('button[type="submit"]').contains('Confirm').should('not.be.visible');
        cy.get('h1').should('contain.text', classroomName);

        // New classroom is added to list of classes
        cy.get('button[type="button"').contains(/back to hub/i).click();
        cy.getBySel('classroom_list').contains(classroomName).should('contain.text', classroomName);
    })
    it.only('Does not create duplicate classroom', () => {
        cy.get("h2").eq(0).should('contain.text', "My Classes");
        cy.getBySel("classroom_create_button").click();
        cy.contains(/create a new classroom/i);

        // Fill in the form and submit
        const classroomName = "Duplicate Classroom";
        cy.get('input[id="classroomName"]').type(classroomName);
        cy.get('button[type="submit"]').contains('Confirm').click();

        // Dialog is closed on submission and redirect to the classroom
        cy.get('button[type="submit"]').contains('Confirm').should('not.be.visible');
        cy.get('h1').should('contain.text', classroomName);

        // New classroom is added to list of classes
        cy.get('button[type="button"').contains(/back to hub/i).click();
        cy.getBySel('classroom_list').contains(classroomName).should('contain.text', classroomName);

        // Remake a classroom with the same name
        cy.getBySel("classroom_create_button").click();
        cy.contains(/create a new classroom/i);
        cy.get('input[id="classroomName"]').type(classroomName);
        cy.get('button[type="submit"]').contains('Confirm').click();

        // Dialog is closed on submission and no page redirect
        cy.get('button[type="submit"]').contains('Confirm').should('not.be.visible');
        cy.get("h2").eq(0).should('contain.text', "My Classes");
        cy.getBySel('classroom_list').contains(classroomName).should('contain.text', classroomName);

    })
})