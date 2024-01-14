import productsPage from "./products_page.js"

class CartPage {
    componentsCartPage = {
      shoppingCartBadge: () => cy.get('.shopping_cart_badge').invoke('text'),
      cartQuantity: () => cy.get('.cart_quantity').should('exist').should('be.visible').should('not.be.empty'),
      name: () => cy.get('.inventory_item_name').should('exist').should('be.visible').should('not.be.empty'),
      description: () => cy.get('.inventory_item_desc').should('exist').should('be.visible').should('not.be.empty'),
      price: () => cy.get('.inventory_item_price').should('exist').should('be.visible').should('not.be.empty'),
      cartItems:() => cy.get('.cart_item'),
    }

    // Check if all cart items are displayed with necessary information
    checkAllCartItems(){
      this.componentsCartPage.cartItems().then(products => {
          this.componentsCartPage.cartQuantity();
          this.componentsCartPage.name();
          this.componentsCartPage.description();
          this.componentsCartPage.price();
      });
    }

    // Check the number of items added to the basket
    checkNumberOfItemsAddedToBasket(){
      const first = true;
      cy.get('.inventory_item_name')
        .then(items => {
          const itemsCount = Cypress.$(items).length;
          expect(items).to.have.length(itemsCount);
          this.componentsCartPage.shoppingCartBadge().then((text) => {expect( parseInt(text)).to.eq(itemsCount);})
          productsPage.navigateToProduct(first);    
          this.componentsCartPage.shoppingCartBadge().then((text) => {expect( parseInt(text)).to.eq(itemsCount);})
          productsPage.navigateToShoppingCart();
          
      });
      cy.get('.inventory_item_name')
        .then(items => {
          const cartCount = Cypress.$(items).length;
          this.componentsCartPage.shoppingCartBadge().then((text) => {expect( parseInt(text)).to.eq(cartCount);})
      })
    }

    // Compare items from the homepage and the cart page
    compareItemsFromHomepageCartPage() {
      cy.get('.inventory_item').then(products => {
        const productDetailsArray = products.map((product) => {
          return this.getProductDetails(product);
        });
        productsPage.addToCartFromHomePage();
        productsPage.navigateToShoppingCart();
        cy.get('.cart_item').then(products2 => {
          const cartDetailsArray = products2.map((product2) => {
            return this.getProductDetails(product2)
          });
          cy.wrap(Cypress.$.makeArray(cartDetailsArray)).should('deep.equal', Cypress.$.makeArray(productDetailsArray));
        });
      });
    }

    // Helper method to extract product details from an element
    getProductDetails(element) {
      const name = Cypress.$(element).find('.inventory_item_name').text();
      const description = Cypress.$(element).find('.inventory_item_desc').text();
      const price = Cypress.$(element).find('.inventory_item_price').text();
  
      return { name, description, price };
    }
   
  }
module.exports = new CartPage();