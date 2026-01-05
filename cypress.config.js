const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://p53/mdl45',
    specPattern: 'e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    env: {
      MOODLE_ADMIN_PASSWORD: process.env.CYPRESS_MOODLE_ADMIN_PASSWORD || 'Password1!'
    }
  },
});
