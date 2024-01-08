import loginPage from "../page_objects/login_page.js"

describe("Saucedemo.com - Login Logic", () => {
  
    const users = [
      { username: 'standard_user', password: 'secret_sauce', isValid: true },
      { username: 'locked_out_user', password: 'secret_sauce', isValid: false },
      { username: 'problem_user', password: 'secret_sauce', isValid: true },
      { username: 'performance_glitch_user', password: 'secret_sauce', isValid: true },
    ];
  
    users.forEach((user, index) => 
    {
      const scenarioType = user.isValid ? 'valid' : 'invalid';
  
      it(`Login and Shopping Logic - Usuario ${index + 1} ${user.username} (${scenarioType})`, () => 
      {
        loginPage.login(user.username, user.password);
  
        if (user.isValid) cy.location("pathname").should("equal", "/inventory.html");
        else cy.get('[data-test="error"]').should("exist"); 
        
      });
    });
  });