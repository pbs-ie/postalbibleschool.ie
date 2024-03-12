describe('Testing curriculum actions', () => {
    beforeEach(() => {
        cy.intercept('GET', '**paypal**', (req) => { });
        cy.loginSession(Cypress.env("loginUser"), Cypress.env("loginPass"));
        cy.visit('/');
    })
    describe('Creates a new Curriculum', () => {
        beforeEach(() => {
            cy.visit('/');
            cy.get('article>h1').contains(/curriculum/i).click();
            cy.getBySel('create_curriculum_btn').click();
        });
        afterEach(() => {
            cy.get('h1').contains(/manage curricula/i);
        })
        it('Default: paper only option selected', () => {
            cy.get('input[id*="name"]').type("Cypress Test Curriculum #1");
            cy.get('input[id*="email"]').type('test@test.com');
            // cy.getBySel('curriculum_type').select('paper');
            cy.getBySel('curriculum_calender_block').should('not.exist');
            cy.getBySel('form_submit_btn').click();
        })
        it("Digital & Paper type selected", () => {
            let curriculumName = "Cypress Test Curriculum #2";
            cy.get('input[id*="name"]').type("Cypress Test Curriculum #2");
            cy.get('input[id*="email"]').type('test@test.com');
            cy.get('select[id*="curriculum_type"]').select('digital');
            cy.getBySel('curriculum_calender_block').should('be.visible');

            cy.get('select[name*="jan_lesson"]').select('digital');
            cy.get('select[name*="jun_lesson"]').select('digital');
            cy.get('select[name*="aug_lesson"]').select('digital');
            cy.getBySel('form_submit_btn').click();

            cy.get('h1').contains(/manage curricula/i);
            cy.get('table tbody tr').contains(curriculumName);
        })
    })

    describe('Deleting curriculum', () => {
        beforeEach(() => {
            cy.visit('/');
            cy.get('article>h1').contains(/curriculum/i).click();
        });
        afterEach(() => {
            cy.get('h1').contains(/manage curricula/i);
        });
        it('Deletes curriculum by name', () => {
            let curriculumName = "Cypress Test Curriculum #2";

            cy.get('h1').contains(/manage curricula/i);
            cy.get('table tbody tr').should('contain', curriculumName);

            cy.contains(curriculumName).parent('td').parent('tr').within(() => {
                cy.getBySel('delete_icon').click()
            })
            cy.contains(/delete curriculum?/i);
            cy.getBySel('confirm_delete_btn').click();

            cy.get('table tbody tr').should('not.contain', curriculumName);
        })
    })
})