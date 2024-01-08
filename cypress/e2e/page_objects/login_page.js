class LoginPage {
    visit() {
      
      cy.clearAllCookies();
      cy.visit('https://www.saucedemo.com/'); 
    }
  
    fillUsername(username) {
      cy.get('[data-test="username"]').type(username);
    }
  
    fillPassword(password) {
      cy.get('[data-test="password"]').type(password);
    }
  
    clickLoginButton() {
      cy.get('[data-test="login-button"]').click();
    }
  
    login(username, password) {
      //cy.session(username, ()=> {
        this.visit();
        
        this.fillUsername(username);
        this.fillPassword(password);
        this.clickLoginButton();
      //})
    }
    
   
  }
 module.exports = new LoginPage();