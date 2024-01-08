
import loginPage from "../page_objects/login_page.js"
import productsPage from "../page_objects/products_page.js"

describe('Shopping Logic', () => {
    beforeEach(() => {
        loginPage.login("standard_user", "secret_sauce");
    });
    
    it(" Add all products - shopping Logic", () => {
        productsPage.getProducts().then(($products) => {
            $products.each((index, element) => {
              const productName = Cypress.$(element).text().trim();
              productsPage.addProductToCart(productName);
            })
        })})
    it("Compare items in the checkout cart - shopping Logic", () => {
        productsPage.addToCart('Sauce Labs Backpack');
        productsPage.addToCart('Sauce Labs Bike Light');
        productsPage.compareCart(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
    })

});