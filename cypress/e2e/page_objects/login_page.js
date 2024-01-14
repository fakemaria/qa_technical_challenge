class LoginPage {
    
    componentsLoginPage = {
      username: ()  => cy.get('[data-test="username"]'),
      password: ()  => cy.get('[data-test="password"]'),
      loginButton: () => cy.get('[data-test="login-button"]'),
      error: () => cy.get('[data-test="error"]').invoke('text').should('exist'),
      
    }

    users = [
      { username: 'standard_user', password: 'secret_sauce', isValid: true },
      { username: 'locked_out_user', password: 'secret_sauce', isValid: false },
      { username: 'problem_user', password: 'secret_sauce', isValid: true },
      { username: 'performance_glitch_user', password: 'secret_sauce', isValid: true },
    ]

    visit() {
      cy.clearAllCookies();
      cy.visit('https://www.saucedemo.com/'); 
    }

    login(username, password) {
      //cy.session(username, ()=> {
        this.visit();
        this.componentsLoginPage.username().type(username);
        this.componentsLoginPage.password().type(password);
        this.componentsLoginPage.loginButton().click();
      //})
    }
    
  }
 
  module.exports = new LoginPage();