const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://p53/mdl45',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    env: {
      MOODLE_ADMIN_PASSWORD: process.env.CYPRESS_MOODLE_ADMIN_PASSWORD || 'Password1!',
      MOODLE_STUDENT_USERNAME: process.env.CYPRESS_MOODLE_STUDENT_USERNAME || 'student1',
      MOODLE_STUDENT_PASSWORD: process.env.CYPRESS_MOODLE_STUDENT_PASSWORD || 'Password1!',
      MOODLE_TEACHER_USERNAME: process.env.CYPRESS_MOODLE_TEACHER_USERNAME || 'teacher1',
      MOODLE_TEACHER_PASSWORD: process.env.CYPRESS_MOODLE_TEACHER_PASSWORD || 'Password1!'
    }
  },
});
