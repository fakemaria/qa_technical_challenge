import loginPage from "../page_objects/login_page.js"
import productsPage from "../page_objects/products_page.js"
import cartPage from "../page_objects/cart_page.js"

describe('Cart page logic', () => {
    
    beforeEach(() => {
      loginPage.login("standard_user", "secret_sauce");
    });

    it('US 8, TC 13: Compare that shopping cart has the products', () => {
      productsPage.addToCartFromHomePage();
      cartPage.checkNumberOfItemsAddedToBasket();
    });

    it('US 9, TC 14: As a Swag Labs standard_user, I need to see all the product added to the shopping cart', () => {
        cartPage.compareItemsFromHomepageCartPage();
        cartPage.checkAllCartItems();
    });
    
    afterEach(() => {
       productsPage.logOut();
    });
  });