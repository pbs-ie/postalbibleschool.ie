describe('Testing the dashboard page', () => {
  beforeEach(() => {
    cy.loginSession(Cypress.env("loginUser"), Cypress.env("loginPass"));
    cy.visit('/');
  })
  it('Loads 3 options', () => {
    cy.get("article").should("have.length", 3);
  })
  it('Selects Assembly videos', () => {
    cy.get('a[href$="/assembly"] > article').click();
    cy.url().should('eq', Cypress.config("baseUrl") + "/assembly");
    cy.get('main h1:first-child').should('contain.text', "School Assembly Video");
  });
  it('Selects bonus videos', () => {
    cy.get('a[href$="/bonus"]').click();
    cy.url().should('eq', Cypress.config("baseUrl") + "/assembly/bonus");
    cy.get('main h1:first-child').should('contain.text', "Bonus Video");
  })
  it('Selects order form page', () => {
    cy.get('a[href$="/orders"] > article').click();
    cy.url().should('eq', Cypress.config("baseUrl") + "/orders");
    cy.get('main h1:first-child').should('contain.text', "Monthly Lesson Order");
  })
})