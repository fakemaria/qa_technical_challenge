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
    
    checkAllCartItems(){
      this.componentsCartPage.cartItems().then(products => {
          this.componentsCartPage.cartQuantity();
          this.componentsCartPage.name();
          this.componentsCartPage.description();
          this.componentsCartPage.price();
      });
    }

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

    compareItemsFromHomepageCartPage() {
      cy.get('.inventory_item').then(products => {
        const productDetailsArray = products.map((product) => {
          const name = Cypress.$(product).find('.inventory_item_name').text();
          const description = Cypress.$(product).find('.inventory_item_desc').text();
          const price = Cypress.$(product).find('.inventory_item_price').text();
          return {name,description,price};
        });
        productsPage.addToCartFromHomePage();
        productsPage.navigateToShoppingCart();
        cy.get('.cart_item').then(products => {
          const cartDetailsArray = products.map((product) => {
            const name = Cypress.$(product).find('.inventory_item_name').text();
            const description = Cypress.$(product).find('.inventory_item_desc').text();
            const price = Cypress.$(product).find('.inventory_item_price').text();
            return {name,description,price};
          });
          cy.wrap(Cypress.$.makeArray(cartDetailsArray)).should('deep.equal', Cypress.$.makeArray(productDetailsArray));
        });
      });
    }
   
  }
module.exports = new CartPage();