/// <reference types="cypress" />

describe('fashion sizes', () => {
  const availableSizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];

  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('https://react-shopping-cart-67954.firebaseapp.com/');
  });

  it('should card is empty at the beginning', () => {
    cy.get('[title="Products in cart quantity"]').should('have.text', '0');
  });

  it('should have the 7 type of sizes', () => {
    cy.get('.checkmark').should('have.length', 7);
  });

  it('should able to select and select multiple sizes', () => {
    availableSizes.forEach((size) => {
      cy.get(`[data-testid=checkbox][value=${size}]`).next().click();
      cy.wait(500);
    });
  });

  it('should able to uncheck size', () => {
    availableSizes.forEach((size) => {
      cy.get(`[data-testid=checkbox][value=${size}]`).next().click();
      cy.wait(500);
    });

    availableSizes.reverse().forEach((size) => {
      cy.get(`[data-testid=checkbox][value=${size}]`).next().click();
      cy.wait(500);
    });
  });

  it('should product total info match with total actual list', () => {
    cy.get('.sc-124al1g-2').should('be.visible');
    cy.get('.sc-ebmerl-4 > p')
      .invoke('text')
      .then((text) => {
        const value = text.split(' ')[0];
        cy.get('.sc-124al1g-2').should('have.length', Number(value));
      });
  });

  it('open the checkout page at the beginning and alert user that should add item to the cart', () => {
    cy.get('.sc-1h98xa9-2').click();
    cy.contains('Add some products in the cart').should('be.visible');
    cy.contains('Checkout').click();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('Add some product in the cart!');
    });

    cy.wait(200);
    cy.get('.sc-1h98xa9-0').click();
  });

  it('should can add product to the cart', () => {
    cy.get('.sc-124al1g-2:first').contains('Add to cart').click();
    cy.get('.sc-1h98xa9-1').should('be.visible');
    cy.get('.sc-1h98xa9-3').should('have.text', '1');
    cy.get('.sc-1h98xa9-0').click();
    cy.get('.sc-1h98xa9-1').should('not.be.visible');
    cy.get('[title="Products in cart quantity"]').should('have.text', '1');
  });

  it('should can increase and decrease item in the cart and do checkout', () => {
    // add 2 items to card
    cy.get('.sc-124al1g-2:first').contains('Add to cart').click();
    cy.get('.sc-124al1g-2:nth-child(2)').contains('Add to cart').click();

    cy.get('.sc-1h98xa9-1').should('be.visible');
    cy.get('.sc-11uohgb-0').should('have.length', 2);

    // make sure the decrease button is disabled at first
    cy.get('.sc-11uohgb-0')
      .find('.sc-11uohgb-6')
      .each((el) => {
        if (el.text() === '-') {
          cy.wrap(el).contains('-').should('be.disabled');
        }
      });

    // increase total on first item
    cy.get('.sc-11uohgb-0:first').as('firstItemCheckout');
    cy.get('@firstItemCheckout').find('button').contains('+').click();
    cy.get('@firstItemCheckout').find('button').contains('+').click();
    cy.get('.sc-1h98xa9-3').should('have.text', '4');

    // decrease on first item
    cy.get('@firstItemCheckout').find('button').contains('-').click();
    cy.get('.sc-1h98xa9-3').should('have.text', '3');

    // remove second product
    cy.get('.sc-11uohgb-0:nth-child(2)')
      .find("[title='remove product from cart']")
      .click();
    cy.get('.sc-1h98xa9-3').should('have.text', '2');

    // get the total checkout amount and make sure the checkout alert have same price
    cy.get('.sc-1h98xa9-9')
      .invoke('text')
      .then((totalAmount) => {
        cy.get('.sc-1h98xa9-1').contains('Checkout').click();
        cy.on('window:alert', (alertCheckout) => {
          expect(alertCheckout).to.contain(totalAmount);
        });
        cy.wait(100);
        cy.get('.sc-1h98xa9-0').as('close-chekcout').click();
      });
  });
});
