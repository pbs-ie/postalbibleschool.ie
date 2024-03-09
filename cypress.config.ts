import { defineConfig } from "cypress";
import 'dotenv/config';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:8000",
    viewportHeight: 800,
    viewportWidth: 1020,
    env: {
      "auth0Domain": process.env.AUTH0_DOMAIN,
      "loginUser": process.env.LOGIN_USER,
      "loginPass": process.env.LOGIN_PASS,
      "mobileViewportWidthBreakpoint": 640,
      "tabletViewportWidthBreakpoint": 1024
    }
  },
});
