import loginPage from "../page_objects/login_page.js"
import productsPage from "../page_objects/products_page.js"

describe('As a Swag Labs standard_user, I need to open the products detail page in the Swag Labs ordering platform so that get more information about the products', () => {
    beforeEach(() => {
        loginPage.login("standard_user", "secret_sauce");
    });

    it("User Story 2: standard_user can log in and navigate through all products", () => {
        productsPage.navigateToProduct();
    });

    it("User Story 3_1: standard_user can add to cart products from each description", () => {
        productsPage.addToCartFromProduct();
    });

    it("User Story 3_2: standard_user can add to cart products from landing page", () => {
        productsPage.addToCartFromHomePage();
    });

    it('User Story 4: standard_user can review previously added items to the cart and remove them', () => {
        let remove = true;
        productsPage.addToCartFromHomePage(remove);
        productsPage.addToCartFromProduct(remove);
        productsPage.addToCartFromHomePage();
        productsPage.navigateToShoppingCart();
        productsPage.removeFromCart();
    });
      
    it('User Story 5: standard_user can sort products', () => {
        productsPage.sortProducts();
    });
    
    it('User Story 6: standard_user can reset app status' , () => {
        productsPage.addToCartFromHomePage();
        productsPage.resetAppStatus();
    });

    it('User Story 7: see the product information in the product page and product details page', () => {
        productsPage.compareAllProducts();
    });

    afterEach(() => {
        productsPage.logOut();
    });
});