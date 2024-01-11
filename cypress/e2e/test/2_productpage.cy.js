
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

    it('User Story 7', () => {
        // Get details for all products on the landing page
        productsPage.getAllProducts().then(allProductsDetails => {
        // Iterate through each product and click on it
        allProductsDetails.forEach(product => {
          cy.contains('.inventory_item_name', product.title).click();
  
        // Capture product details from the opened product page
        const openedProductDetails = {
            title: '',
            description: '',
            price: '',
            imageUrl:''
          };
  
          // Use cy.get().invoke() to handle the promise and retrieve the text (otherwise is not working properly)
          cy.get('.inventory_details_name').invoke('text').then(text => {
            openedProductDetails.title = text.trim();
          });
  
          cy.get('.inventory_details_desc').invoke('text').then(text => {
            openedProductDetails.description = text.trim();
          });
  
          cy.get('.inventory_details_price').invoke('text').then(text => {
            openedProductDetails.price = text.trim();
          });
          cy.get('.inventory_details_img').invoke('attr','src').then(src => {
            openedProductDetails.imageUrl = src.trim();
          });
          // Compare objects
          cy.wrap(openedProductDetails).should('deep.equal', product);
          
  
          cy.go('back');
        });
      });
    });

    afterEach(() => {
        productsPage.logOut();
    });
});


// ## User Story 8
// As a Swag Labs standard_user, I need to see the shopping cart with the number of products added in the Swag Labs ordering platform so that I can to know the status of the same

// ## Acceptance Criterias 8
// Ensure the Swag Labs standard_user are able to:
// 1. Log in to Swag Labs
// 2. Navigate in the Products page
// 3. Able to see the shopping cart with the number of products added
// 4. Navigate into the Products details page
// 5. Able to see the shopping cart with the number of products added
// 6. Navigate into the shopping cart
// 7. Able to see the shopping cart with the number of products added