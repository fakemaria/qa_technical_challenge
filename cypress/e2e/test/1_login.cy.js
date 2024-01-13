import loginPage from "../page_objects/login_page.js"
import productsPage from "../page_objects/products_page.js";

describe("As a Swag Labs admin, I need to access/logout the platform with the 4 different user types.", () => {
  
 
    loginPage.users.forEach((user, index) => 
    {
      const scenarioType = user.isValid ? 'valid' : 'invalid';
  
      it(`US1, TC ${index + 1} ${user.username} (${scenarioType})`, () => 
      {
        loginPage.login(user.username, user.password);
        if (user.isValid) {
          productsPage.componentsProductsPage.inventoryLocationUrl();
          productsPage.logOut();
        } 
        else loginPage.componentsLoginPage.error().should('equal','Epic sadface: Sorry, this user has been locked out.');
      });
    });
  });