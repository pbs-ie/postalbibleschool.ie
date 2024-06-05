/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {

        /**
         * Log out the current user.
         *
         * @example
         * cy.logout()
         */
        logout(): Chainable<any>;

        /**
         * Fetch the currently authenticated user.
         *
         * @example
         * cy.currentUser()
         */
        currentUser(): Chainable<any>;

        /**
         * Fetch a CSRF token from the server.
         *
         * @example
         * cy.logout()
         */
        csrfToken(): Chainable<any>;

        /**
         * Fetch a fresh list of URI routes from the server.
         *
         * @example
         * cy.logout()
         */
        refreshRoutes(): Chainable<any>;

        /**
         * Create and persist a new Eloquent record using Laravel model factories.
         *
         * @example
         * cy.create('App\\User');
         * cy.create('App\\User', 2);
         * cy.create('App\\User', 2, { active: false });
         * cy.create({ model: 'App\\User', state: ['guest'], relations: ['profile'], count: 2 }
         */
        create(): Chainable<any>;

        /**
         * Refresh the database state using Laravel's migrate:fresh command.
         *
         * @example
         * cy.refreshDatabase()
         * cy.refreshDatabase({ '--drop-views': true }
         */
        refreshDatabase(options?: object): Chainable<any>;

        /**
         * Run Artisan's db:seed command.
         *
         * @example
         * cy.seed()
         * cy.seed('PlansTableSeeder')
         */
        seed(seederClass?: string): Chainable<any>;

        /**
         * Run an Artisan command.
         *
         * @example
         * cy.artisan()
         */
        artisan(command: string, parameters?: object, options?: object): Chainable<any>;

        /**
         * Execute arbitrary PHP on the server.
         *
         * @example
         * cy.php('2 + 2')
         * cy.php('App\\User::count()')
         */
        php(command: string): Chainable<any>;

        // Custom Commands
        loginSession(email: string, password: string): Chainable<void>
        getBySel(selector: string, args?: any): Chainable<void>
        getBySelLike(selector: string, args?: any): Chainable<void>
        login(email: string, password: string): Chainable<void>
    }
}
