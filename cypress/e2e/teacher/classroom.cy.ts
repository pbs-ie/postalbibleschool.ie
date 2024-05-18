describe("Classroom Page tests", () => {
    const headingText = "Participant numbers";
    before(() => {
        cy.refreshDatabase();
        Cypress.session.clearAllSavedSessions();
    })
    beforeEach(() => {
        cy.intercept('GET', '**paypal**', (req) => { });
        cy.loginSession(Cypress.env("loginUser"), Cypress.env("loginPass"));
        cy.visit('/');
    });

    describe("Navigate to the classroom page", () => {
        it('Opens, closes and reopens create new class dialog', () => {
            cy.get("h2").contains(headingText, { matchCase: false });
            cy.getBySel("classroom_create_button").click();
            cy.contains(/create a new classroom/i);
            cy.getBySel("classroom_cancel_button").should('be.visible').click();
            cy.get("h2").contains(headingText, { matchCase: false });
            cy.getBySel("classroom_create_button").click();
            cy.contains(/create a new classroom/i);
        })
    })

    describe('Perform actions in the Dashboard', () => {
        it('Creates a new classroom', () => {
            const classroomName = "New #Test Classroom";
            cy.get("h2").contains(headingText, { matchCase: false });

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
        });
        describe('Changes to an existing classroom', () => {
            const classroomName = "New #Test Classroom";
            beforeEach(() => {
                // Truncates classroom tables


                //Creates a classroom
                cy.get("h2").contains(headingText, { matchCase: false });
                cy.getBySel("classroom_create_button").click();
                cy.contains(/create a new classroom/i);
                cy.get('input#classroomName').type(classroomName);
                cy.intercept('/dashboard').as('classroom');
                cy.get('button[type="submit"]').contains('Create').click();
                cy.wait('@classroom');
                cy.get('button[type="submit"]').contains('Create').should('not.be.visible');
                cy.get('form#classroom_form').contains(classroomName, { matchCase: false });

            });
            it('Changes the number of students for existing classroom', () => {
                cy.get("h2").contains(headingText, { matchCase: false });

                cy.get('form#classroom_form tbody tr').eq(0).within(() => {
                    cy.get('td').eq(1).should('include.text', classroomName);
                    cy.getBySelLike("classroom_edit_icon").click();

                    cy.get("[id^=level_0_order]").should('be.visible').clear().type("11");
                    cy.get("[id^=level_1_order]").should('be.visible').clear().type("22");
                    cy.get("[id^=level_2_order]").should('be.visible').clear().type("33");
                    cy.get("[id^=level_3_order]").should('be.visible').clear().type("44");
                    cy.get("[id^=level_4_order]").should('be.visible').clear().type("55");
                    cy.get("[id^=tlp_order]").should('be.visible').clear().type("99");

                    cy.getBySel('classroom_save_icon').should('be.visible').click();

                    // assertions
                    cy.get("td").eq(3).should('contain.text', "11");
                    cy.get("td").eq(4).should('contain.text', "22");
                    cy.get("td").eq(5).should('contain.text', "33");
                    cy.get("td").eq(6).should('contain.text', "44");
                    cy.get("td").eq(7).should('contain.text', "55");
                    cy.get("td").eq(8).should('contain.text', "99");
                });

            });
            it('Adds and removes student name to classroom', () => {

                // Open classroom details
                cy.get('form#classroom_form tbody tr').eq(0).within(() => {
                    cy.get('td').eq(1).should('include.text', classroomName)
                    cy.intercept('/classroom/*').as('details');
                    cy.getBySelLike("classroom_open_icon").click();
                });

                // Load new page of classroom details
                cy.wait('@details');

                cy.get('h2').should('include.text', classroomName);

                // Click add students button and confirm addition of students from list
                cy.getBySel('classroom_add_students_button').click();
                cy.get('h2').contains("add students", { matchCase: false }).should('be.visible');

                let studentName = '';
                cy.get("form#add_classroom_students_form tbody tr").should('have.length.at.least', 1);
                cy.get("form#add_classroom_students_form tbody tr").eq(0).within(() => {

                    cy.get('td div').eq(1).invoke('text').as('name');

                    cy.get('@name').then((name) => {
                        cy.log("Student name " + name);
                        // @ts-expect-error name is text not jQuery object
                        studentName = name;
                    })
                });
                cy.get("form#add_classroom_students_form").within(() => {
                    cy.get("button[type='submit']").should('be.disabled');
                    cy.get("td input[type='checkbox']").first().check();
                    cy.get("button[type='submit']").should('not.be.disabled');
                    cy.get("button[type='submit']").click();
                });

                // Assert student is added to the classroom list
                cy.get("form#classroom_student_list tbody tr td").should('contain', studentName);
                cy.get("form#classroom_student_list tbody tr").should('have.length.at.least', 1);

                // Remove student from classroom

                cy.getBySel('classroom_remove_students_button').should('be.disabled');
                cy.get("form#classroom_student_list").within(() => {
                    cy.get("td input[type='checkbox']").first().check();
                });
                cy.getBySel('classroom_remove_students_button').should('not.be.disabled');
                cy.getBySel('classroom_remove_students_button').click();

                // Assert student has been removed
                cy.get("form#classroom_student_list table").should('not.exist');
                cy.get("form#classroom_student_list div p").contains(/no students added. Add students by clicking the button below/i);

            });
            it('Changes curriculum for classroom', () => {
                // TODO: Can't test this till curriculum is seeded with multiple values
            });
            it('Clicks the delete button to remove classroom', () => {
                // Arrange
                cy.get('form#classroom_form tbody tr').should('have.length', 1);

                // Act
                cy.get('form#classroom_form tbody tr').eq(0).within(() => {
                    cy.get('td').eq(1).should('include.text', classroomName)
                    cy.getBySelLike("classroom_delete_icon").click();
                });
                cy.get('h2').contains(/delete classroom/i).should('be.visible');
                cy.getBySel('confirm_delete_button').should('be.visible');
                cy.get('dialog').contains(classroomName, { matchCase: false });
                cy.getBySel('confirm_delete_button').click();

                // Assert classroom has been deleted
                cy.get('form#classroom_form tbody').should('not.exist');
                cy.get("form#classroom_form div p").contains(/no classroom found. Create a new one by clicking the button below/i);

            });
        });
        describe.only("Duplication check", () => {
            const classroomName = "Duplicate Classroom";
            it('Does not create duplicate classroom', () => {
                cy.get("h2").contains(headingText, { matchCase: false });
                cy.getBySel("classroom_create_button").click();
                cy.contains(/create a new classroom/i);

                // Fill in the form and submit
                cy.get('input[id="classroomName"]').type(classroomName);
                cy.intercept('/*').as('duplicateclassroom');

                cy.get('button[type="submit"]').contains('Create').click();

                cy.wait('@duplicateclassroom');

                // Dialog is closed on submission and redirect to the classroom
                cy.get('button[type="submit"]').contains('Create').should('not.be.visible');
                cy.get('form#classroom_form').contains(classroomName, { matchCase: false });

                // Remake a classroom with the same name
                cy.getBySel("classroom_create_button").click();
                cy.contains(/create a new classroom/i);
                cy.get('input[id="classroomName"]').type(classroomName);
                cy.intercept('/*').as('classroom');
                cy.get('button[type="submit"]').contains('Create').click();

                cy.wait('@duplicateclassroom');
                // Dialog is closed on submission and no page redirect
                cy.get('button[type="submit"]').contains('Create').should('not.be.visible');
                cy.get("h2").contains(headingText, { matchCase: false });
                cy.get('form#classroom_form').contains(classroomName, { matchCase: false });

            })
        });
    });
})