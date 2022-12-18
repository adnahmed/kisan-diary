import { defineConfig } from "cypress";
const env = process.env;
export default defineConfig({
  e2e: {
    setupNodeEvents: (on, config) => {
      const isDev = config.watchForFileChanges;
      const configOverrides: Partial<Cypress.PluginConfigOptions> = {
        baseUrl: `${env.APP_URL}:${env.APP_PORT}`,
        video: !process.env.CI,
        screenshotOnRunFailure: !process.env.CI,
      };

      // To use this:
      // cy.task('log', whateverYouWantInTheTerminal)
      on("task", {
        log: (message) => {
          console.log(message);

          return null;
        },
      });

      return { ...config, ...configOverrides };
    },
  },
});
