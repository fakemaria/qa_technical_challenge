class ProductsPage {
    
    componentsProductsPage = {
      menu: ()  => cy.get('[id="react-burger-menu-btn"]'),
      resetApp: ()  => cy.get('[id="reset_sidebar_link"]'),
      logOut: ()  => cy.get('[id="logout_sidebar_link"]'),
      closeSidebar: () => cy.get('[id="react-burger-cross-btn"]'),
      buttonAddToCart: () => cy.get('[data-test^=add-to-cart]'),
      buttonRemoveFromCart: () => cy.get('[data-test^=remove]'),
      shoppingCartBadge: () => cy.get('.shopping_cart_badge'),
      shoppingCart: () => cy.get('[class="shopping_cart_link"]'),
      backToProducts: () => cy.get('[data-test="back-to-products"]'),
      //product: () => cy.contains(productName).parent().find('a')
    }
    
    logOut() {
      this.componentsProductsPage.menu().click();
      this.componentsProductsPage.logOut().click();
    }

    resetAppStatus(){
      this.componentsProductsPage.menu().click();
      this.componentsProductsPage.shoppingCartBadge().should('exist');
      this.componentsProductsPage.resetApp().click();
      this.componentsProductsPage.shoppingCartBadge().should('not.exist');
      this.componentsProductsPage.closeSidebar().click();
    }

    addToCartFromProduct(remove) {
      this.getProducts().then(($products) => {
          $products.each((index, element) => {
            const productName = Cypress.$(element).text().trim();
            this.getProducts().contains(productName).click();
            this.componentsProductsPage.buttonAddToCart().click();
            this.componentsProductsPage.shoppingCartBadge().should('exist');
            this.componentsProductsPage.backToProducts().click();
            cy.location("pathname").should("equal", "/inventory.html");
          })
          if (remove){
            $products.each((index, element) => {
              const productName = Cypress.$(element).text().trim();
              this.getProducts().contains(productName).click();
              this.componentsProductsPage.buttonRemoveFromCart().click();
              this.componentsProductsPage.backToProducts().click();
            })
            this.componentsProductsPage.shoppingCartBadge().should('not.exist');
          }
      })
    }
    //review constant allproducts
    addToCartFromHomePage(remove) {
      const allproducts = [];
        this.getProducts().then(($products) => {
            $products.each((index, element) => {
              const productName = Cypress.$(element).text().trim();
              cy.contains(productName).parentsUntil("[class='inventory_item']").find('.btn_primary').click();
              cy.location("pathname").should("equal", "/inventory.html");
              allproducts.push(productName);
              if (remove)  cy.contains(productName).parentsUntil("[class='inventory_item']").find('.btn_secondary').click();
            })
            if (remove) this.componentsProductsPage.shoppingCartBadge().should('not.exist');
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

    sortProducts(){
      const sortOptionsByName = ['az', 'za'];
      const sortOptionsByPrice= ['lohi', 'hilo'];
      
      sortOptionsByName.forEach(sortOptionsByName => {
        this.selectSortOption(sortOptionsByName);
        this.getSortedProductNames().then(sortedProductNames => {
          const sortedCopy = [...sortedProductNames];
          sortedCopy.sort();
          if (sortOptionsByName === 'za') sortedCopy.reverse();  
          expect(sortedProductNames).to.have.ordered.members(sortedCopy);
        });
      });
      let price = true;
      sortOptionsByPrice.forEach(sortOptionsByPrice => {
        this.selectSortOption(sortOptionsByPrice);
        this.getSortedProductNames(price).then(sortedProductNames => {
          const sortedCopy = [...sortedProductNames];
          sortedCopy.sort();
          if (sortOptionsByPrice === 'hilo') sortedCopy.reverse();  
          expect(sortedProductNames).to.have.ordered.members(sortedCopy);
        });
      });
    }

    navigateToShoppingCart(){
      this.componentsProductsPage.shoppingCart().click();
      cy.location("pathname").should("equal", "/cart.html");
    }

    //refactor into the method
    selectSortOption(option) {
      cy.get('.product_sort_container').select(option);
    }
  
    getSortedProductNames(price) {
      if (price) return cy.get('.inventory_item_price').invoke('text').then(text => text.split('\n'))
      else return cy.get('.inventory_item_name').invoke('text').then(text => text.split('\n'));
    }

    getProducts() {
      return cy.get('.inventory_item_name'); 
    }

    //move to cart_page 
    removeFromCart() {
      this.getProducts().then(($products) => {
        $products.each((index, element) => {
          const productName = Cypress.$(element).text().trim();
          cy.contains(productName).parent().find('.btn_secondary').click();
        })
      })
    }
    //move to cart_page
    compareCart(items) {
      cy.get('.shopping_cart_badge').click();
  
      items.forEach(item => {
        cy.get('.cart_item').should('contain.text', item);
      });
  
      cy.get('.cart_footer .btn_secondary').click(); 
    }
    
    getAllProducts() {
      // Get all product elements on the page
      
      return cy.get('.inventory_item').then(products => {
        // Extract details for each product
        const productDetailsArray = products.map((index, product) => {
          const title = Cypress.$(product).find('.inventory_item_name').text();
          const description = Cypress.$(product).find('.inventory_item_desc').text();
          const price = Cypress.$(product).find('.inventory_item_price').text();
          const imageUrl = Cypress.$(product).find('a > .inventory_item_img').attr("src");
  
          return {
            title,
            description,
            price,
            imageUrl,
          };
        });
        // Convert the array-like object to a standard array
        console.log(Cypress.$.makeArray(productDetailsArray));
        return Cypress.$.makeArray(productDetailsArray);
      });
    }
  
    
  }
  module.exports = new ProductsPage();