import constants from "../constants/constants.js";

class LoginPage {
    
    componentsLoginPage = {
      username: ()  => cy.get('[data-test="username"]'),
      password: ()  => cy.get('[data-test="password"]'),
      loginButton: () => cy.get('[data-test="login-button"]'),
      error: () => cy.get('[data-test="error"]').invoke('text').should('exist'),
      
    }

    users = [
      { username: constants.standardUser , password: constants.password, isValid: true },
      { username: constants.lockedUser , password: constants.password, isValid: false },
      { username: constants.problemUser , password: constants.password , isValid: true },
      { username: constants.performanceGlitchUser , password: constants.password , isValid: true },
    ]

    visit() {
      cy.clearAllCookies();
      cy.visit(constants.swagLabs); 
    }

    login(username, password) {
        this.visit();
        this.componentsLoginPage.username().type(username);
        this.componentsLoginPage.password().type(password);
        this.componentsLoginPage.loginButton().click();
    }
    
  }
 
  module.exports = new LoginPage();