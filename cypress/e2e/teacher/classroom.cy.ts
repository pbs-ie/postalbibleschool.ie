describe("Classroom Page tests", () => {
    beforeEach(() => {
        cy.intercept('GET', '**paypal**', (req) => { });
        cy.loginSession(Cypress.env("loginUser"), Cypress.env("loginPass"));
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

    describe.only('Perform actions in the Dashboard', () => {
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
        });
        describe.skip("Duplication check", () => {
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
        });
        it('Changes the number of students', () => {
            const classroomName = "New #Test Classroom";
            cy.get("h2").should('contain.text', "My Classes");

            cy.get('form#classroom_form tbody tr').eq(0).within(() => {
                cy.get('td').eq(1).should('contain.text', classroomName)
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

        })
    });
})