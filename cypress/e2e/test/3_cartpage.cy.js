import loginPage from "../page_objects/login_page.js"
import productsPage from "../page_objects/products_page.js"
import cartPage from "../page_objects/cart_page.js"

describe('Cart page logic', () => {
    
    beforeEach(() => {
      loginPage.login("standard_user", "secret_sauce");
    });

    it('User Story 8: Compare that shopping cart has the products', () => {
      productsPage.addToCartFromHomePage();
      cartPage.checkNumberOfItemsAddedToBasket();
      //cartPage.getAllCartItems();
    });

    it('User Story 9: As a Swag Labs standard_user, I need to see all the product added to the shopping cart', () => {

        cartPage.compareItemsFromHomepageCartPage();
        cartPage.checkAllCartItems();
    });
    
    afterEach(() => {
       productsPage.logOut();
    });
  });

  // ## User Story 9
  // As a Swag Labs standard_user, I need to see all the product added to the shopping cart in the Swag Labs ordering platform so that I can to know what I am going to buy
  
  // ## Acceptance Criterias 9
  // Ensure the Swag Labs standard_user are able to:
  // 1. Log in to Swag Labs
  // 2. Navigate into the shopping cart
  // 3. Able to see all the products information what I am going to buy (qty, name, description, price)


  // it('Listar, Añadir a Carrito y Verificar Precios en Checkout', () => {
    //   // Obtén la lista de productos
    //   const productList = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];
      
    //   productList.forEach(product => {
    //     productsPage.addProductToCart(product);
    //     productList.forEach(product => {
    //         const cartItemPrice = this.getCartItemPrice(product);
    //         const checkoutItemPrice = checkoutPage.getCheckoutItemPrice(product);
      
    //         expect(cartItemPrice).to.equal(checkoutItemPrice);})
    //   });
  
    //   // Verifica que los precios en el carrito coincidan con los precios en la página de checkout
      
    // });