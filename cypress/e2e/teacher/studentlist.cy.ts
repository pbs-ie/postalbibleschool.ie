describe('Retrieve student list from FM', () => {
    beforeEach(() => {
        cy.intercept('GET', '**paypal**', (req) => { });
        cy.loginSession(Cypress.env("loginUser"), Cypress.env("loginPass"));
        cy.visit('/');

    });
    it('Retrieves student list in a classroom', () => {
        const classroomName = "New Test Classroom";

        // WHEN: User goes to a selected classroom
        cy.visit('/dashboard');
        cy.getBySel('classroom_list').get('article>h1').contains(classroomName).click();

        // THEN: User can click a button to retrieve students
        cy.getBySel('classroom_retrieve_students').click();
        cy.getBySel('classroom_students_list').should('not.be.empty');
    })
})