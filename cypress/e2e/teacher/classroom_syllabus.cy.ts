describe("To add syllabus to a classroom", () => {
    beforeEach(() => {
        cy.intercept('GET', '**paypal**', (req) => { });
        cy.loginSession(Cypress.env("loginUser"), Cypress.env("loginPass"));
        cy.visit('/');

    });
    const classroomName = "Cypress Test Classroom #1";
    it('Creates a new classroom', () => {
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
        cy.intercept('/*').as('classroom');

        cy.wait('classroom');
        cy.getBySel('classroom_list').contains(classroomName, { matchCase: false });
    })
    it.only('Navigates to classroom and add default curriculum for classroom', () => {
        const curriculumName = "Cypress Test Curriculum #1";
        cy.visit('/');
        cy.getBySel('classroom_list').contains(classroomName, { matchCase: false }).first().click();

        cy.getBySel('add_curriculum_btn').click();
        cy.get('table tbody tr').contains(curriculumName).parent('td').parent('tr').within(() => {
            cy.get('input[type="radio"]').click();
        });
        cy.getBySel('submit_btn').click();

        cy.get('h2 + p').contains(curriculumName);
    });
})