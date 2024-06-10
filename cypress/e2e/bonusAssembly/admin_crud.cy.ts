describe('Bonus videos - Read, Update, Delete', () => {
    beforeEach(() => {
        cy.loginSession(Cypress.env("adminUser"), Cypress.env("adminPass"));
        cy.intercept('GET', '**paypal**', (req) => { });
    });

    it('View existing from list', () => {
        const videoTitle = "Cypress Test #1";

        cy.createBonusVideoEntry(videoTitle);

        cy.get('table tbody tr').should('contain', videoTitle).last().within(() => {
            cy.get('td').eq(1).should('include.text', videoTitle);
            cy.getBySel('bonus_assembly_view_icon').click();
        });

        cy.get('h2').contains(videoTitle, { matchCase: false });
    });

    it('Updates existing bonus video', () => {
        const videoTitle = "Cypress Test #2";
        cy.createBonusVideoEntry(videoTitle);

        const newVideoTitle = "New Cypress Test Video #2";
        cy.get('table tbody tr').should('contain', videoTitle).last().within(() => {
            cy.get('td').eq(1).should('include.text', videoTitle);
            cy.getBySel('bonus_assembly_edit_icon').click();
        });

        // Assert
        cy.get('h1').contains('edit - bonus assembly video', { matchCase: false });
        cy.get("input[id='title']").should('contain.value', videoTitle);

        // Act
        cy.get("input[id='title']").clear().type(newVideoTitle);
        cy.get("select[id='category'").select("bbw");
        cy.get('input[type=file]').selectFile('cypress/images/bbcover.png');

        cy.get("input[id='externalUrl']").clear().type("https://vimeo.com/868838499?share=copy");
        cy.get("input[id='videoTitle']").clear().type(newVideoTitle);
        cy.get("input[id='duration']").clear().type("10 min");

        cy.get('form').submit();

        // Assert
        cy.get('h1').contains('admin - bonus videos', { matchCase: false });
        // cy.get('table tbody tr td').contains(newVideoTitle, { matchCase: false });
        cy.document().contains(newVideoTitle, { matchCase: false });

    });

    it('Deletes bonus assembly from list', () => {
        const videoTitle = "Cypress Test #3";
        cy.createBonusVideoEntry(videoTitle);
        cy.get('table tbody tr').should('contain', videoTitle).last().within(() => {
            cy.get('td').eq(1).should('include.text', videoTitle);
            cy.getBySelLike('bonus_video_delete_icon').click();
        });

        // Act
        cy.get('h2').contains('delete bonus video?', { matchCase: false });
        cy.get('p').contains(videoTitle, { matchCase: false });
        cy.getBySel('confirm_delete_button').should('be.visible').click();

        //Assert
        cy.get('table tbody').should('not.contain', videoTitle, { matchCase: false });
    })

})