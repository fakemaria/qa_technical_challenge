class ProductsPage {
    addToCart(productName) {
      //cy.contains(productName).find('.inventory_item_description').find('.btn_primary').click();
        cy.contains(productName).parent().find('a').click();
        cy.get('.btn_primary').click();
        cy.get('.shopping_cart_badge').should('exist')
        cy.get('[data-test="back-to-products"]').click();
        cy.location("pathname").should("equal", "/inventory.html");
    }
  
    removeFromCart(productName) {
      cy.contains(productName).parent().find('.btn_secondary').click();
    }
  
    compareCart(items) {
      cy.get('.shopping_cart_badge').click();
  
      items.forEach(item => {
        cy.get('.cart_item').should('contain.text', item);
      });
  
      cy.get('.cart_footer .btn_secondary').click(); 
    }
    getProducts() {
      return cy.get('.inventory_item_name'); 
    }
  
    addProductToCart(productName) {
      this.getProducts().contains(productName).click();
        cy.get('.btn_primary').click();
        cy.get('.shopping_cart_badge').should('exist')
        cy.get('[data-test="back-to-products"]').click();
        cy.location("pathname").should("equal", "/inventory.html");
    }
  }
  module.exports = new ProductsPage();