import loginPage from "../page_objects/login_page.js"
import products_page from "../page_objects/products_page.js";

describe("As a Swag Labs admin, I need to access/logout the platform with the 4 different user types.", () => {
  
 
    loginPage.users.forEach((user, index) => 
    {
      const scenarioType = user.isValid ? 'valid' : 'invalid';
  
      it(`Log in/Log out to Swag Labs  ${index + 1} ${user.username} (${scenarioType})`, () => 
      {
        loginPage.login(user.username, user.password);
  
        if (user.isValid) {
          cy.location("pathname").should("equal", "/inventory.html");
          products_page.logOut();
        } 
        
        else cy.get('[data-test="error"]').should("exist"); 

      });

    });

  });