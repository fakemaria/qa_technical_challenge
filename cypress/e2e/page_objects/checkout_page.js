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
  
  checkInformationCheckOut(){
    this.componentsCheckOutPage.firstName().should('exist').should('be.visible').should('be.empty');
    this.componentsCheckOutPage.lastName().should('exist').should('be.visible').should('be.empty');
    this.componentsCheckOutPage.postalCode().should('exist').should('be.visible').should('be.empty');
    this.componentsCheckOutPage.continue().click();
    this.componentsCheckOutPage.error().should('exist').should('equal',constants.nameRequired);
    this.componentsCheckOutPage.firstName().type(this.generateRandomString(10));
    this.componentsCheckOutPage.continue().click();
    this.componentsCheckOutPage.error().should('exist').should('equal',constants.lastNameRequired);
    this.componentsCheckOutPage.lastName().type(this.generateRandomString(10));
    this.componentsCheckOutPage.continue().click();
    this.componentsCheckOutPage.error().should('exist').should('equal', constants.postalCodeRequired);
    this.componentsCheckOutPage.postalCode().type(this.generateRandomString(5));
    this.componentsCheckOutPage.continue().click();
  }

  checkTotalPricesAndInformation(totalSum,tax,totalSumAndTaxes){
    this.componentsOrderPage.subTotal().should('contain',totalSum);
    this.componentsOrderPage.tax().should('contain',tax);
    this.componentsOrderPage.totalPrice().should('contain',totalSumAndTaxes);
    this.componentsOrderPage.paymentInformationLabel().should('exist').should('be.visible').should('contain',constants.paymentInformationLabel);
    this.componentsOrderPage.paymentInformation().should('contain',constants.cardDetails);
    this.componentsOrderPage.shippingInformationLabel().should('exist').should('be.visible').should('contain',constants.shippingInformationLabel);
    this.componentsOrderPage.shippingInformation().should('contain',constants.shippingInformationService);
    this.componentsOrderPage.totalPriceLabel().should('exist').should('be.visible').should('contain',constants.priceTotalLabel);
    this.componentsOrderPage.finish().click();
    this.componentsCheckOutPage.checkoutComplete();
    this.componentsOrderPage.completeOrder().should('exist').should('be.visible').should('contain', constants.orderSuccessMsg1);
    this.componentsOrderPage.completeOrderText().should('exist').should('be.visible').should('contain',constants.orderSuccessMsg2);
    this.componentsOrderPage.backHome().click();
  }
  
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