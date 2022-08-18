/// <reference types="cypress" />

import FashionStorePage from '../page-object/fashion-store';

const fashionStorePage = new FashionStorePage();

describe('fashion stores', () => {
  const availableSizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];

  beforeEach(() => {
    cy.visit('/');
  });

  it('should card is empty at the beginning', () => {
    fashionStorePage.getCartQuantity().should('have.text', '0');
  });

  it('should have the 7 type of sizes', () => {
    fashionStorePage.getAllSizeCheckbox().should('have.length', 7);
  });

  it('should able to select and select multiple sizes', () => {
    availableSizes.forEach((size) => {
      fashionStorePage.getSizeCheckbox(size).click();
      cy.wait(200);
    });
  });

  it('should able to uncheck size', () => {
    availableSizes.forEach((size) => {
      fashionStorePage.getSizeCheckbox(size).click();
      cy.wait(200);
    });

    availableSizes.reverse().forEach((size) => {
      fashionStorePage.getSizeCheckbox(size).click();
      cy.wait(200);
    });
  });

  it('should product total info match with total actual list', () => {
    fashionStorePage.getProductItems().should('be.visible');
    fashionStorePage
      .getTotalItem()
      .invoke('text')
      .then((text) => {
        fashionStorePage.getProductItems().should('have.length', Number(text));
      });
  });

  it('open the checkout page at the beginning and alert user that should add item to the cart', () => {
    fashionStorePage.getCartButton().click();
    fashionStorePage.getCartPageContent().should('be.visible');
    fashionStorePage
      .getCartPageContent()
      .contains('Add some products in the cart')
      .should('be.visible');
    fashionStorePage.getCartPageContent().contains('Checkout').click();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('Add some product in the cart!');
    });

    cy.wait(200);
    fashionStorePage.getCartButton().click();
  });

  it('should can add product to the cart', () => {
    fashionStorePage.getProductItems().first().contains('Add to cart').click();
    fashionStorePage.getCartPageContent().should('be.visible');
    fashionStorePage.getCartPageItemQuantity().should('have.text', 1);
    fashionStorePage.getCartButton().click();
    fashionStorePage.getCartPageContent().should('not.exist');
    fashionStorePage.getCartQuantity().should('have.text', '1');
  });

  it('should can increase and decrease item in the cart and do checkout', () => {
    // add 3 items to card
    fashionStorePage.getProductItems().eq(1).contains('Add to cart').click();
    fashionStorePage.getCartButton().click();
    fashionStorePage.getProductItems().eq(2).contains('Add to cart').click();
    fashionStorePage.getCartButton().click();
    fashionStorePage.getProductItems().eq(3).contains('Add to cart').click();

    fashionStorePage.getCartPageItemQuantity().should('have.text', 3);
    fashionStorePage.getCartProductItems().should('have.length', 3);

    // // increase total on first item
    fashionStorePage
      .getCartProductItems()
      .eq(0)
      .find('[data-cy="increase-quantity"]')
      .click()
      .click();
    fashionStorePage.getCartPageItemQuantity().should('have.text', 5);

    // decrease on first item
    fashionStorePage
      .getCartProductItems()
      .eq(0)
      .find('[data-cy="decrease-quantity"]')
      .click();
    fashionStorePage.getCartPageItemQuantity().should('have.text', 4);

    // remove second product
    fashionStorePage
      .getCartProductItems()
      .eq(1)
      .find('[data-cy="remove-item"]')
      .click();
    fashionStorePage.getCartProductItems().should('have.length', 2);
    fashionStorePage.getCartPageItemQuantity().should('have.text', 3);

    // sum price of all product items an assert it with subtotal
    // let totalPrice: number = 0;
    // fashionStorePage.getCartProductItems().each((el) => {
    //   let quantity: number;
    //   cy.wrap(el)
    //     .find(`[data-cy="cart-item-quantity"]`)
    //     .invoke('text')
    //     .then((qty) => {
    //       quantity = Number(qty);
    //     });
    //   cy.wrap(el)
    //     .find(`[data-cy="cart-item-price"]`)
    //     .invoke('text')
    //     .then((value) => {
    //       totalPrice += Number(value) * quantity;
    //       cy.log(totalPrice.toString());
    //     });
    // });
    // cy.wait(500);
    // cy.log(totalPrice.toString());
    // fashionStorePage.getCartTotalPrice().should('have.text', totalPrice);

    // cy.log(totalPrice);

    // get the total checkout amount and make sure the checkout alert have same price
    fashionStorePage
      .getCartTotalPrice()
      .invoke('text')
      .then((total) => {
        fashionStorePage.getCartPageContent().contains('Checkout').click();
        cy.on('window:alert', (alertCheckout) => {
          expect(alertCheckout).to.contain(total);
        });
        cy.wait(100);
        fashionStorePage.getCartButton().click();
      });
  });
});
