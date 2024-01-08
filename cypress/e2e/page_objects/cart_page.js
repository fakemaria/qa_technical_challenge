class CartPage {
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