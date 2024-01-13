import loginPage from "../page_objects/login_page.js"
import productsPage from "../page_objects/products_page.js"
import cartPage from "../page_objects/cart_page.js"
import checkoutPage from "../page_objects/checkout_page.js";

describe('Cart page logic', () => {
    
    beforeEach(() => {
      loginPage.login("standard_user", "secret_sauce");
    });

    it('User Story 10: Navigate to checkout ', () => {
      
       productsPage.addToCartFromHomePage();
       productsPage.navigateToShoppingCart();
       checkoutPage.navigateToCheckOut();
       checkoutPage.checkInformationCheckOut();
       cartPage.checkAllCartItems();
       productsPage.getAllProductsPrices().then(allProductPrices => {
        const totalPrice = allProductPrices.reduce((acc, price) => acc + price, 0);
        console.log(totalPrice);
        const taxes = Math.ceil(totalPrice*0.08*100)/100;
        const finalPrice = Math.ceil(totalPrice*1.08*100)/100;
        console.log(taxes)
        checkoutPage.checkTotalPricesAndInformation(totalPrice,taxes,finalPrice);
      });
    });

    afterEach(() => {
       productsPage.logOut();
    });
  });