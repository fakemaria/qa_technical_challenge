class ProductsPage {
    
    componentsProductsPage = {
      menu: ()  => cy.get('[id="react-burger-menu-btn"]'),
      logOut: ()  => cy.get('[id="logout_sidebar_link"]'),
      buttonAddToCart: () => cy.get ('.btn_primary'),
      shoppingCartBadge: () => cy.get('.shopping_cart_badge'),
      backToProducts: () => cy.get('[data-test="back-to-products"]'),
      //product: () => cy.contains(productName).parent().find('a')
    }
    
    logOut() {
      this.componentsProductsPage.menu().click();
      this.componentsProductsPage.logOut().click();
    }

    addToCartFromProduct() {
      this.getProducts().then(($products) => {
          $products.each((index, element) => {
            const productName = Cypress.$(element).text().trim();
            this.getProducts().contains(productName).click();
            this.componentsProductsPage.buttonAddToCart().click();
            this.componentsProductsPage.shoppingCartBadge().should('exist');
            this.componentsProductsPage.backToProducts().click();
            cy.location("pathname").should("equal", "/inventory.html");
          })
      })
    }
    
    addToCartFromHomePage() {
      const allproducts = [];
        this.getProducts().then(($products) => {
            $products.each((index, element) => {
              const productName = Cypress.$(element).text().trim();
              cy.contains(productName).parentsUntil("[class='inventory_item']").find('.btn_primary').click();
              cy.location("pathname").should("equal", "/inventory.html");
              allproducts.push(productName);
            })
        })
    }

    navigateToProduct() {
      this.getProducts().then(($products) => {
          $products.each((index, element) => {
            const productName = Cypress.$(element).text().trim();
            cy.contains(productName).parent().find('a').click();
            this.componentsProductsPage.backToProducts().click();
            cy.location("pathname").should("equal", "/inventory.html");
        })
      })
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
  
    
  }
  module.exports = new ProductsPage();