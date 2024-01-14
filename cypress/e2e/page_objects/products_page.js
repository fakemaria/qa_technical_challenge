import constants from "../constants/constants.js";

class ProductsPage {
    
    componentsProductsPage = {
      menu: ()  => cy.get('[id="react-burger-menu-btn"]'),
      resetApp: ()  => cy.get('[id="reset_sidebar_link"]'),
      logOut: ()  => cy.get('[id="logout_sidebar_link"]'),
      closeSidebar: () => cy.get('[id="react-burger-cross-btn"]'),
      buttonAddToCart: () => cy.get('[data-test^=add-to-cart]'),
      buttonRemoveFromCart: () => cy.get('[data-test^=remove]'),
      shoppingCartBadge: () => cy.get('.shopping_cart_badge'),
      sortContainer: () => cy.get('.product_sort_container'),
      shoppingCart: () => cy.get('[class="shopping_cart_link"]'),
      shoppingCartUrl: () => cy.location("pathname").should('equal', constants.cartUrl),
      backToProducts: () => cy.get('[data-test="back-to-products"]'),
      inventoryDetailsName: () => cy.get('.inventory_details_name').invoke('text'),
      inventoryDetailsDescription: () => cy.get('.inventory_details_desc').invoke('text'),
      inventoryDetailsPrice: () => cy.get('.inventory_details_price').invoke('text'),
      inventoryDetailsImageUrl: () => cy.get('.inventory_details_img').invoke('attr','src'),
      inventoryLocationUrl: () => cy.location("pathname").should('equal', constants.inventoryUrl),
    }
    
    logOut() {
      this.componentsProductsPage.menu().click();
      this.componentsProductsPage.resetApp().click();
      this.componentsProductsPage.logOut().click();
    }

    // Resets the application status, checking for changes in the shopping cart badge
    resetAppStatus(){
      this.componentsProductsPage.menu().click();
      this.componentsProductsPage.shoppingCartBadge().should('exist');
      this.componentsProductsPage.resetApp().click();
      this.componentsProductsPage.shoppingCartBadge().should('not.exist');
      this.componentsProductsPage.closeSidebar().click();
    }

    // Adds producst from each product or removes products from the cart, based on the 'remove' parameter
    addToCartFromProduct(remove) {
      this.getProducts().then(($products) => {
          $products.each((index, element) => {
            const productName = Cypress.$(element).text().trim();
            this.getProducts().contains(productName).click();
            this.componentsProductsPage.buttonAddToCart().click();
            this.componentsProductsPage.shoppingCartBadge().should('exist');
            this.componentsProductsPage.buttonRemoveFromCart().should('exist');
            this.componentsProductsPage.backToProducts().click();
            this.componentsProductsPage.inventoryLocationUrl();
          })
          if (remove){
            $products.each((index, element) => {
              const productName = Cypress.$(element).text().trim();
              this.getProducts().contains(productName).click();
              this.componentsProductsPage.buttonRemoveFromCart().click();
              this.componentsProductsPage.buttonAddToCart().should('exist');
              this.componentsProductsPage.backToProducts().click();
            })
            this.componentsProductsPage.shoppingCartBadge().should('not.exist');
          }
      })
    }
    
    // Adds or removes products from the cart on the homepage, based on the 'remove' parameter
    addToCartFromHomePage(remove) {
      const allproducts = [];
      
        this.getProducts().then(($products) => {
            $products.each((index, element) => {
              const productName = Cypress.$(element).text().trim();
              cy.contains(productName).parentsUntil("[class='inventory_item']").find('.btn_primary').click();
              this.componentsProductsPage.inventoryLocationUrl();
              allproducts.push(productName);
              if (remove)  cy.contains(productName).parentsUntil("[class='inventory_item']").find('.btn_secondary').click();
            })
            if (remove) this.componentsProductsPage.shoppingCartBadge().should('not.exist');
        })
    }

    // Navigates to a specific product or the first product
    navigateToProduct(first) {
      this.getProducts().then(($products) => {
          
        if (first) cy.get(Cypress.$.makeArray($products)[0]).click();
        else {
          $products.each((index, element) => {
            const productName = Cypress.$(element).text().trim();
            cy.contains(productName).parent().find('a').click();
            this.componentsProductsPage.backToProducts().click();
            this.componentsProductsPage.inventoryLocationUrl();
          })
        }
      })
    }

    // Sort products by name and price, then compares them to the sorted list
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
      this.componentsProductsPage.shoppingCartUrl();
    }
    
    // Selects a sorting option from the dropdown
    selectSortOption(option) {
      this.componentsProductsPage.sortContainer().select(option);
    }
    
    // Retrieves sorted product names based on the sorting option
    getSortedProductNames(price) {
      if (price) return cy.get('.inventory_item_price').invoke('text').then(text => text.split('\n'))
      else return cy.get('.inventory_item_name').invoke('text').then(text => text.split('\n'));
    }

    getProducts() {
      return cy.get('.inventory_item_name'); 
    }

    // Retrieves prices of all products in the cart
    getAllProductsPrices() {
      return cy.get('.cart_item').then(products => {
        const productPricesArray = products.map((index, product) => {
          const price = Cypress.$(product).find('.inventory_item_price').text();
          return parseFloat(price.replace('$', ''));
        });
        return Cypress.$.makeArray(productPricesArray);
        });
      }

    removeFromCart() {
      this.getProducts().then(($products) => {
        $products.each((index, element) => {
          const productName = Cypress.$(element).text().trim();
          cy.contains(productName).parent().find('.btn_secondary').click();
        })
      })
    }
    
    // Retrieve details of all products on the page
    getAllProducts() {
      return cy.get('.inventory_item').then(products => {
        const productDetailsArray = products.map((index, product) => {
          const title = Cypress.$(product).find('.inventory_item_name').text();
          const description = Cypress.$(product).find('.inventory_item_desc').text();
          const price = Cypress.$(product).find('.inventory_item_price').text();
          const imageUrl = Cypress.$(product).find('a > .inventory_item_img').attr("src");
          
          return {title,description,price,imageUrl};
        });
        return Cypress.$.makeArray(productDetailsArray);
      });
    }
    
    // Compares details of all products on the page with their individual pages
    compareAllProducts(){
      this.getAllProducts().then(allProductsDetails => {
          allProductsDetails.forEach(product => {
            cy.contains('.inventory_item_name', product.title).click();
            const openedProductDetails = {title:'',description: '',price: '',imageUrl:''};
            this.componentsProductsPage.inventoryDetailsName().then(text => {openedProductDetails.title = text.trim();});
            this.componentsProductsPage.inventoryDetailsDescription().then(text => {openedProductDetails.description = text.trim();});
            this.componentsProductsPage.inventoryDetailsPrice().then(text => {openedProductDetails.price = text.trim();});
            this.componentsProductsPage.inventoryDetailsImageUrl().then(src => {openedProductDetails.imageUrl = src.trim();});
            cy.wrap(openedProductDetails).should('deep.equal', product);
            cy.go('back');
        });
      });
    }
    
  }
  module.exports = new ProductsPage();