const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "8bqc3b",
  e2e: {
    chromeWebSecurity: false, 
    video : false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  watchForFileChanges: false
});
