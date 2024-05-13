import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 5000,
  retries: 1,
  watchForFileChanges: true,
  videosFolder: "cypress/videos",
  screenshotsFolder: "cypress/screenshots",
  fixturesFolder: "cypress/fixture",

  e2e: {
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.ts")(on, config);
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    baseUrl: "http://localhost:8000",
    viewportHeight: 800,
    viewportWidth: 1020,
    supportFile: "cypress/support/index.ts",
    env: {
      mobileViewportWidthBreakpoint: 640,
      tabletViewportWidthBreakpoint: 1024,
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
