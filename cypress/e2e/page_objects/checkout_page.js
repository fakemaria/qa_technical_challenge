class CheckoutPage {
    getCheckoutItemPrice(productName) {
      return cy.contains('.summary_item_label', productName)
        .siblings('.summary_item_label')
        .find('.inventory_item_price')
        .text();
    }
  }
  module.exports = new CheckoutPage();