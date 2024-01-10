class CartPage {
    componentsCartPage = {
      menu: ()  => cy.get('[id="react-burger-menu-btn"]'),
      logOut: ()  => cy.get('[id="logout_sidebar_link"]'),
      buttonAddToCart: () => cy.get('[data-test^=add-to-cart]'),
      buttonRemoveFromCart: () => cy.get('[data-test^=remove]'),
      shoppingCartBadge: () => cy.get('.shopping_cart_badge'),
      backToProducts: () => cy.get('[data-test="back-to-products"]'),
      //product: () => cy.contains(productName).parent().find('a')
    }
  
    getCartItemPrice(productName) {
      return cy.contains('.cart_item_label', productName)
        .siblings('.cart_item_price')
        .text();
    }
  
    compareCartItemsWithCheckoutPrices(items) {
      items.forEach(item => {
        const cartItemPrice = this.getCartItemPrice(item);
        const checkoutItemPrice = checkoutPage.getCheckoutItemPrice(item);
  
        expect(cartItemPrice).to.equal(checkoutItemPrice);
      });
    }
  }
module.exports = new CartPage();