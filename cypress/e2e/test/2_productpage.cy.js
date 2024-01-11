
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
             
        //productsPage.compareCart(allproducts);
    });

    it('User Story 4: standard_user can review previously added items to the cart and remove them', () => {
        let remove = true;
        productsPage.addToCartFromHomePage(remove);
        productsPage.addToCartFromProduct(remove);
        productsPage.addToCartFromHomePage();
        productsPage.navigateToShoppingCart();
        productsPage.removeFromCart();
        

    });

    ////////////////////
      
    it('User Story 5: standard_user can sort products', () => {
        productsPage.sortProducts();
    });
    
    it('User Story 6: standard_user can reset app status' , () => {
        productsPage.addToCartFromHomePage();
        productsPage.resetAppStatus();
    });

    it.only('User Story 7', () => {
        const allproducts = [];
        const eachproduct = [];
        cy.get('.inventory_item').then(($products) => {
            $products.each((index, product) => {
                //const producName = Cypress.$(element).text().trim();
                allproducts.push(Cypress.$(product).find('.inventory_item_name').text().trim());
                allproducts.push(Cypress.$(product).find('.inventory_item_desc').text());
                allproducts.push(Cypress.$(product).find('.inventory_item_price').text());
                //allproducts.push(Cypress.$(product).find('.inventory_item_img').attr('src'));
                Cypress.$(product).find('.inventory_item_name').click();
            })    
                cy.get('.inventory_details_name').should('contain.text',allproducts[0]);
                cy.get('.inventory_details_desc').should('contain.text',allproducts[1]);
                cy.get('.inventory_details_price').should('contain.text',allproducts[2]);
                productsPage.componentsProductsPage.backToProducts().click();
        })
    // Get details for all products on the landing page
    // productsPage.getAllProducts().then(allProductsDetails => {
    //     // Iterate through each product and click on it
    //     allProductsDetails.forEach(product => {
    //       cy.contains('.inventory_item_name', product.title).click();
  
    //       // Capture product details from the opened product page
    //       const openedProductDetails = {
    //         title: cy.get('.inventory_details_name').text(),
    //         description: cy.get('.inventory_details_desc').text(),
    //         price: cy.get('.inventory_details_price').text(),
    //         imageUrl: cy.get('.inventory_details_img').attr('src'),
    //       };
  
    //       // Compare details
    //       expect(openedProductDetails).to.deep.equal(product);
  
    //       // Navigate back to the products page
    //       cy.go('back');
    //     });
    //   });
          
    });

    afterEach(() => {
        productsPage.logOut();
    });
});


// ## User Story 7
// As a Swag Labs standard_user, I need to see the product information in the product page and product details page in the Swag Labs ordering platform so that I can know what I'm buying

// ## Acceptance Criterias 7
// Ensure the Swag Labs standard_user are able to:
// 1. Log in to Swag Labs
// 2. Navigate in the Products page
// 3. Able to see all the product information (image, title, description, price)
// 4. Navigate into the Products details page
// 5. Able to see all the product information (image, title, description, price)