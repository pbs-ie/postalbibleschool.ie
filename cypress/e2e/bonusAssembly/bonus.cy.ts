describe('Assembly bonus event', () => {
    // before(() => {
    //     cy.refreshDatabase();
    //     Cypress.session.clearAllSavedSessions();
    // })
    beforeEach(() => {
        cy.intercept('GET', '**paypal**', (req) => { });
        cy.loginSession(Cypress.env("adminUser"), Cypress.env("adminPass"));
        cy.visit('/');
    });

    context.skip('Create a new bonus assembly', () => {
        before(() => {
            // Navigate to bonus assembly section
            cy.getBySel("menubutton").should('be.visible').click();
            cy.get("nav a[href*='assembly']").should('be.visible').should('contain.text', 'Assembly').filter(":visible").click();
            cy.get('h1').contains('school assembly videos', { matchCase: false });
            cy.getBySel('link_bonus_gallery').should('be.visible').click();
            cy.get('h1').contains('bonus videos', { matchCase: false });
            cy.get('h2').contains('big bible words', { matchCase: false });
            cy.get('h2').contains('bible books explained', { matchCase: false });
        })
        it('Creates a new bonus assembly event', () => {
            const videoTitle = "Cypress Test";
            cy.get('h1').contains('bonus videos', { matchCase: false });
            cy.getBySel('add_new_bonus_button').click();

            cy.get('h1').contains('create new bonus assembly video', { matchCase: false });

            // Act
            cy.get("input[id='monthTitle']").type(videoTitle);
            cy.get("select[id='category'").select("bbooks");
            cy.get('input[type=file]').selectFile('cypress/images/bbcover.png');

            cy.get("input[id='externalUrl']").type("https://vimeo.com/868838499?share=copy");
            cy.get("input[id='videoTitle']").type(videoTitle);
            cy.get("input[id='duration']").type("1 min");

            cy.get('form').submit();

            // Assert
            cy.get('h1').contains('admin - bonus videos', { matchCase: false });

            cy.get('table tbody tr td').contains(videoTitle, { matchCase: false });
        });
    });

    context('Admin panel for bonus assembly', () => {
        const videoTitle = "Cypress Test #2";
        beforeEach(() => {
            // Navigate to admin page
            cy.visit('/assembly/bonus/admin');
            cy.get('h1').contains('admin - bonus videos', { matchCase: false });
            // });
            // before(() => {
            cy.visit('/assembly/bonus/admin');
            cy.get('h1').contains('admin - bonus videos', { matchCase: false });
            // Create a bonus assembly
            cy.get('h1').contains('bonus videos', { matchCase: false });
            cy.getBySel('add_new_bonus_button').click();

            cy.get('h1').contains('create new bonus assembly video', { matchCase: false });
            cy.get("input[id='monthTitle']").type(videoTitle);
            cy.get("select[id='category'").select("bbooks");
            cy.get('input[type=file]').selectFile('cypress/images/bbcover.png');

            cy.get("input[id='externalUrl']").type("https://vimeo.com/868838499?share=copy");
            cy.get("input[id='videoTitle']").type(videoTitle);
            cy.get("input[id='duration']").type("1 min");

            cy.get('form').submit();
        });

        it('View existing from list', () => {
            cy.get('table tbody tr').contains(videoTitle, { matchCase: false }).within(() => {
                cy.get('td').eq(1).should('include.text', videoTitle);
                cy.getBySel('bonus_assembly_view_icon').click();
            });

            cy.get('h2').contains(videoTitle, { matchCase: false });
        });

        it.skip('Edits existing bonus assembly', () => {
            cy.get('table tbody tr').contains(videoTitle, { matchCase: false }).within(() => {
                cy.get('td').eq(1).should('include.text', videoTitle);
                cy.getBySel('bonus_assembly_edit_icon').click();
            });

            // Assert
            cy.get('h1').contains('edit - bonus assembly video', { matchCase: false });
            cy.get("input[id='monthTitle']").should('contain.text', videoTitle);

        });

        it('Deletes bonus assembly from list', () => {
            cy.get('table tbody tr').contains(videoTitle, { matchCase: false }).within(() => {
                cy.get('td').eq(1).should('include.text', videoTitle);
                cy.getBySel('bonus_assembly_delete_icon').click();
            });

            // Act
            cy.get('h2').contains('delete bonus video?', { matchCase: false });
            cy.get('p').contains(videoTitle, { matchCase: false });
            cy.getBySel('confirm_delete_button').should('be.visible').click();

            //Assert
            cy.get('table tbody tr td').should('not.contain', videoTitle);
        })


    });
});