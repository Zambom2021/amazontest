const { defineConfig } = require("cypress");

module.exports = {
  e2e: {
    baseUrl: 'https://www.amazon.com.br',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
  },
};

