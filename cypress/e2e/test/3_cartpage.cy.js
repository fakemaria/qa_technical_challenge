import loginPage from "../page_objects/login_page.js"
import productsPage from "../page_objects/products_page.js"
import cartPage from "../page_objects/cart_page.js"
import constants from "../constants/constants.js";

describe('Cart page logic', () => {
    
    beforeEach(() => {
      loginPage.login(constants.standardUser, constants.password);
    });

    it('US 8, TC 13: standard_user can compare that shopping cart has the products', () => {
      productsPage.addToCartFromHomePage();
      cartPage.checkNumberOfItemsAddedToBasket();
    });

    it('US 9, TC 14: standard_user Check that all the product are added to the shopping cart', () => {
        cartPage.compareItemsFromHomepageCartPage();
        cartPage.checkAllCartItems();
    });
    
    afterEach(() => {
       productsPage.logOut();
    });
  });