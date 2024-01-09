
import loginPage from "../page_objects/login_page.js"
import productsPage from "../page_objects/products_page.js"

describe('As a Swag Labs standard_user, I need to open the products detail page in the Swag Labs ordering platform so that get more information about the products', () => {
    beforeEach(() => {
        loginPage.login("standard_user", "secret_sauce");
    });

    it("User Story 2: standard_userr can log in and navigate through all products", () => {
        productsPage.navigateToProduct();
    });

    it("User Story 3_1: standard_user can add to cart products from each description", () => {
        productsPage.addToCartFromProduct();
    });

    it("User Story 3_2: standard_user can add to cart products from landing page", () => {
        productsPage.addToCartFromHomePage();
             
        //productsPage.compareCart(allproducts);
    });

    it('User Story 4: standard_user can review previously added items to the cart and remove them', () => {
        
    });

    afterEach(() => {
        productsPage.logOut();
    });
});

// ## User Story 4
// As a Swag Labs standard_user, I need to review my previous added to cart products in the Swag Labs ordering platform so that I can remove it

// ## Acceptance Criterias 4
// Ensure the Swag Labs standard_user are able to:
// 1. Log in to Swag Labs
// 2. Navigate in the Products page
// 3. Able to add to cart product(s) to buy
// 3. Able to remove product(s)
// 4. Navigate into the Products details page
// 5. Able to remove product(s)
// 6. Navigate into the shopping cart
// 7. Able to remove product(s)