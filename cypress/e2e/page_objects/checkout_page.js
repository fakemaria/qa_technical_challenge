import constants from "../constants/constants.js";

class CheckoutPage {
  componentsCheckOutPage = {
    checkOut: () => cy.get('[data-test="checkout"]'),
    checkOutPage: () => cy.location('pathname').should('equal', constants.checkOutOne),
    checkoutComplete: () => cy.location("pathname").should('equal', constants.checkOutComplete),
    firstName: () => cy.get('[data-test="firstName"]'),
    lastName: () => cy.get('[data-test="lastName"]'),
    postalCode: () => cy.get('[data-test="postalCode"]'),
    continue: () => cy.get('[data-test="continue"]'),
    error: () => cy.get('[data-test="error"]').invoke('text'),

  }
  componentsOrderPage = {
    subTotal: () => cy.get('.summary_subtotal_label'),
    tax: () => cy.get('.summary_tax_label'),
    paymentInformationLabel: () => cy.get('.summary_info_label:nth-child(1)'),
    paymentInformation: () => cy.get('.summary_value_label:nth-child(2)'),
    shippingInformationLabel: () => cy.get('.summary_info_label:nth-child(3)'),
    shippingInformation: () => cy.get('.summary_value_label:nth-child(4)'),
    totalPriceLabel: () => cy.get('.summary_info_label:nth-child(5)'),
    totalPrice: () => cy.get('[class="summary_info_label summary_total_label"]'),
    finish: () => cy.get('[data-test="finish"]'),
    completeOrder: () => cy.get('.complete-header'),
    completeOrderText: () => cy.get('.complete-text'),
    backHome: () => cy.get('[data-test="back-to-products"]')
  }
  
  getCheckoutItemPrice(productName) {
      return cy.contains('.summary_item_label', productName)
        .siblings('.summary_item_label')
        .find('.inventory_item_price')
        .text();
  }

  navigateToCheckOut(){
      this.componentsCheckOutPage.checkOut().click();
      this.componentsCheckOutPage.checkOutPage();
  }
  
  // Check information during checkout
  checkInformationCheckOut(){
    this.checkVisibilityAndEmpty(this.componentsCheckOutPage.firstName());
    this.checkVisibilityAndEmpty(this.componentsCheckOutPage.lastName());
    this.checkVisibilityAndEmpty(this.componentsCheckOutPage.postalCode());
    this.componentsCheckOutPage.continue().click();
    this.checkError(constants.nameRequired);
    this.componentsCheckOutPage.firstName().type(this.generateRandomString(10));
    this.componentsCheckOutPage.continue().click();
    this.checkError(constants.lastNameRequired);
    this.componentsCheckOutPage.lastName().type(this.generateRandomString(10));
    this.componentsCheckOutPage.continue().click();
    this.checkError(constants.postalCodeRequired);
    this.componentsCheckOutPage.postalCode().type(this.generateRandomString(5));
    this.componentsCheckOutPage.continue().click();
  }

  // Check total prices and information on the order page
  checkTotalPricesAndInformation(totalSum,tax,totalSumAndTaxes){
    this.componentsOrderPage.subTotal().should('contain',totalSum);
    this.componentsOrderPage.tax().should('contain',tax);
    this.componentsOrderPage.totalPrice().should('contain',totalSumAndTaxes);
    this.checkLabelVisibilityAndContent(this.componentsOrderPage.paymentInformationLabel(),constants.paymentInformationLabel);
    this.componentsOrderPage.paymentInformation().should('contain',constants.cardDetails);
    this.checkLabelVisibilityAndContent(this.componentsOrderPage.shippingInformationLabel(),constants.shippingInformationLabel);
    this.componentsOrderPage.shippingInformation().should('contain',constants.shippingInformationService);
    this.checkLabelVisibilityAndContent(this.componentsOrderPage.totalPriceLabel(),constants.priceTotalLabel);
    this.componentsOrderPage.finish().click();
    this.componentsCheckOutPage.checkoutComplete();
    this.componentsOrderPage.completeOrder().should('exist').should('be.visible').should('contain', constants.orderSuccessMsg1);
    this.componentsOrderPage.completeOrderText().should('exist').should('be.visible').should('contain',constants.orderSuccessMsg2);
    this.componentsOrderPage.backHome().click();
  }

  // Helper method to check visibility and emptiness
  checkVisibilityAndEmpty(element) {
    element.should('exist').should('be.visible').should('be.empty');
  }

  // Helper method to check for errors
  checkError(errorMessage) {
    this.componentsCheckOutPage.error().should('exist').should('contain', errorMessage);
  }

  // Helper method to check label visibility and content
  checkLabelVisibilityAndContent(labelElement, content) {
    labelElement.should('exist').should('be.visible').should('contain', content);
  }
  // Helper method to generate a random string
  generateRandomString(length){
      const characters = constants.randomCharacters;
      let result = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }
      return result;
  }

}
module.exports = new CheckoutPage();