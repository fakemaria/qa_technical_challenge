import loginPage from "../page_objects/login_page.js"
import productsPage from "../page_objects/products_page.js"
import cartPage from "../page_objects/cart_page.js"
import checkoutPage from "../page_objects/checkout_page.js";
import constants from "../constants/constants.js";

describe('Checkout page logic', () => {
    
    beforeEach(() => {
      loginPage.login(constants.standardUser, constants.password);
    });

    it('US 10, TC 15: standard_user can navigate to checkout and check that values are correct', () => {
      
       productsPage.addToCartFromHomePage();
       productsPage.navigateToShoppingCart();
       checkoutPage.navigateToCheckOut();
       checkoutPage.checkInformationCheckOut();
       cartPage.checkAllCartItems();
       productsPage.getAllProductsPrices().then(allProductPrices => {
        const totalPrice = allProductPrices.reduce((acc, price) => acc + price, 0);
        const taxes = Math.ceil(totalPrice*0.08*100)/100;
        const finalPrice = Math.ceil(totalPrice*1.08*100)/100;
        checkoutPage.checkTotalPricesAndInformation(totalPrice,taxes,finalPrice);
      });
    });

    afterEach(() => {
       productsPage.logOut();
    });
  });