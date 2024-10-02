describe('Testing curriculum actions', () => {
    beforeEach(() => {
        cy.intercept('GET', '**paypal**', (req) => { });
        cy.loginSession(Cypress.env("adminUser"), Cypress.env("adminPass"));
        cy.visit('/');
    })
    describe.skip('Creates a new Curriculum', () => {
        beforeEach(() => {
            cy.visit('/');
            cy.get('section h2').contains(/curriculum/i).click();
            cy.getBySel('manage_curriculum_btn').click();
            cy.get('h1').contains(/manage curricula/i);
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
            cy.get('select[name*="sep_lesson"]').select('digital');
            cy.getBySel('form_submit_btn').click();

            cy.get('h1').contains(/manage curricula/i);
            cy.get('table tbody tr').contains(curriculumName);
        });
        it("Creates with no email input", () => {
            let curriculumName = "Cypress Test Curriculum #3";
            cy.get('input[id*="name"]').type(curriculumName);
            cy.get('select[id*="curriculum_type"]').select('digital');
            cy.getBySel('curriculum_calender_block').should('be.visible');

            cy.get('select[name*="jan_lesson"]').select('digital');
            cy.get('select[name*="jun_lesson"]').select('digital');
            cy.get('select[name*="sep_lesson"]').select('digital');
            cy.getBySel('form_submit_btn').click();

            cy.get('h1').contains(/manage curricula/i);
            cy.get('table tbody tr').contains(curriculumName);
        })
        it("Creates a second curriculum with no email input", () => {
            let curriculumName = "Cypress Test Curriculum #4";
            cy.get('input[id*="name"]').type(curriculumName);
            cy.get('select[id*="curriculum_type"]').select('digital');
            cy.getBySel('curriculum_calender_block').should('be.visible');

            cy.get('select[name*="jan_lesson"]').select('digital');
            cy.get('select[name*="jun_lesson"]').select('digital');
            cy.get('select[name*="sep_lesson"]').select('digital');
            cy.getBySel('form_submit_btn').click();

            cy.get('h1').contains(/manage curricula/i);
            cy.get('table tbody tr').contains(curriculumName);
        })
    })
    describe('Edits existing curriculum', () => {
        beforeEach(() => {
            cy.visit('/');
            cy.get('section h2').contains(/curriculum/i).click();
            cy.getBySel('manage_curriculum_btn').click();
            cy.get('h1').contains(/manage curricula/i);
            cy.getBySel('create_curriculum_btn').click();
        });
        it('With an email input, change paper to digital', () => {
            let newCurriculumName = "Cypress Test Curriculum Edited #1";
            cy.get('table tbody tr').contains(/Cypress Test Curriculum #1/i).then(($el) => {
                cy.wrap($el).parent('td').parent('tr').within(() => {
                    cy.getBySel('edit_icon').click()
                })
            });
            cy.get('input[id*="name"]').clear().type(newCurriculumName);
            cy.get('select[id*="curriculum_type"]').select('digital');
            cy.getBySel('curriculum_calender_block').should('be.visible');

            cy.get('select[name*="jan_lesson"]').select('digital');
            cy.get('select[name*="jun_lesson"]').select('digital');
            cy.get('select[name*="sep_lesson"]').select('digital');
            cy.getBySel('form_submit_btn').click();

            cy.get('h1').contains(/manage curricula/i);
            cy.get('table tbody tr').contains(newCurriculumName);
        });
        it('With no email input, change digital to paper', () => {
            let newCurriculumName = "Cypress Test Curriculum Edited #3";
            cy.get('table tbody tr').contains(/Cypress Test Curriculum #3/i).then(($el) => {
                cy.wrap($el).parent('td').parent('tr').within(() => {
                    cy.getBySel('edit_icon').click()
                })
            });
            cy.get('input[id*="name"]').clear().type(newCurriculumName);
            cy.get('select[id*="curriculum_type"]').select('paper');
            cy.getBySel('curriculum_calender_block').should('not.exist');

            cy.getBySel('form_submit_btn').click();

            cy.get('h1').contains(/manage curricula/i);
            cy.get('table tbody tr').contains(newCurriculumName);
        });
    });

    describe.only('Deleting curriculum', () => {
        beforeEach(() => {
            cy.visit('/');
            cy.get('section h2').contains(/curriculum/i).click();
            cy.getBySel('manage_curriculum_btn').click();
            cy.get('h1').contains(/manage curricula/i);
            cy.getBySel('create_curriculum_btn').click();
        });
        afterEach(() => {
            cy.get('h1').contains(/manage curricula/i);
        });
        it('Deletes curriculum by name', () => {
            let curriculumName = "Cypress Test Curriculum";
            //Create a dummy curriculum
            cy.get('input[id*="name"]').type(curriculumName);
            cy.get('select[id*="curriculum_type"]').select('digital');
            cy.getBySel('curriculum_calender_block').should('be.visible');

            cy.get('select[name*="feb_lesson"]').select('digital');
            cy.get('select[name*="mar_lesson"]').select('digital');
            cy.get('select[name*="apr_lesson"]').select('digital');
            cy.get('select[name*="may_lesson"]').select('digital');
            cy.get('select[name*="jun_lesson"]').select('digital');
            cy.getBySel('form_submit_btn').click();

            //Delete dummy curriculum by searching for the name
            cy.get('h1').contains(/manage curricula/i);
            cy.get('table tbody tr').should('contain', curriculumName);

            cy.get('table tbody tr').contains(curriculumName).then(($el) => {
                cy.wrap($el).parent('td').parent('tr').within(() => {
                    cy.getBySel('delete_icon').click()
                })
            });
            cy.contains(/delete curriculum?/i);
            cy.getBySel('confirm_delete_btn').click();

            // List does not contain dummy curriculum
            cy.get('h1').contains(/manage curricula/i);
            cy.get('table tbody tr').should('not.contain', curriculumName);

        })
    })
})