import loginPage from "../page_objects/login_page.js"
import productsPage from "../page_objects/products_page.js"
import cartPage from "../page_objects/cart_page.js"
import checkOutPage from "../page_objects/checkout_page.js"

describe('Saucedemo.com - Listar, Añadir a Carrito y Verificar Precios en Checkout', () => {
    beforeEach(() => {
        loginPage.login("standard_user", "secret_sauce");
    });
  
    it('Listar, Añadir a Carrito y Verificar Precios en Checkout', () => {
      // Obtén la lista de productos
      const productList = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];
      
      productList.forEach(product => {
        productsPage.addProductToCart(product);
        productList.forEach(product => {
            const cartItemPrice = this.getCartItemPrice(product);
            const checkoutItemPrice = checkoutPage.getCheckoutItemPrice(product);
      
            expect(cartItemPrice).to.equal(checkoutItemPrice);})
      });
  
      // Verifica que los precios en el carrito coincidan con los precios en la página de checkout
      
    });
  });