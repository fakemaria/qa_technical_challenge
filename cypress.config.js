const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false, 
    video : false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  watchForFileChanges: false
});
