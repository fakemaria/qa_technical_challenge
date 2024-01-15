import loginPage from "../page_objects/login_page.js"
import productsPage from "../page_objects/products_page.js"
import constants from "../constants/constants.js";

describe('Product page logic', () => {
    beforeEach(() => {
        loginPage.login(constants.standardUser, constants.password);
    });

    it("US 2, TC 5: standard_user can log in and navigate through all products", () => {
        productsPage.navigateToProduct();
    });

    it("US 3, TC 6: standard_user can add to cart products from each description", () => {
        productsPage.addToCartFromProduct();
    });

    it("US 3, TC 7: standard_user can add to cart products from landing page", () => {
        productsPage.addToCartFromHomePage();
    });

    it('US 4, TC 8: standard_user can add items to the cart from products page and remove them', () => {
        let remove = true;
        productsPage.addToCartFromHomePage(remove);
    });

    it('US 4, TC 9: standard_user can add items to the cart from each item page and remove them', () => {
        let remove = true;
        productsPage.addToCartFromProduct(remove);
    });

    it('US 4, TC 10: standard_user can add items from products page to the cart and remove them from the basket', () => {
        productsPage.addToCartFromHomePage();
        productsPage.navigateToShoppingCart();
        productsPage.removeFromCart();
    });
      
    it('US 5, TC 11: standard_user can sort products', () => {
        productsPage.sortProducts();
    });
    
    it('US 6, TC 12: standard_user can reset app status' , () => {
        productsPage.addToCartFromHomePage();
        productsPage.resetAppStatus();
    });

    it('US 7, TC 13: standard_user can see the product information in the product page and product details page', () => {
        productsPage.compareAllProducts();
    });

    afterEach(() => {
        productsPage.logOut();
    });
});