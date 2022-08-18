/// <reference types="cypress" />

export default class FashionStorePage {
  public getCartQuantity() {
    return cy.get('[data-cy="cart-quantity"]');
  }

  public getTotalItem() {
    return cy.get('[data-cy="total-product"]');
  }

  public getAllSizeCheckbox() {
    return cy.get('.checkmark');
  }

  public getSizeCheckbox(size: string) {
    return cy.get(`[data-cy=size-${size}]`);
  }

  public getProductItems() {
    return cy.get(`[data-cy="product-item"]`);
  }

  public getCartButton() {
    return cy.get(`[data-cy="cart-button"]`);
  }

  public getCartPageContent() {
    return cy.get(`[data-cy="cart-page-content"]`);
  }

  public getCartPageItemQuantity() {
    return cy.get(`[data-cy="cart-page-quantity"]`);
  }

  public getCartProductItems() {
    return cy.get(`[data-cy="cart-product-item"]`);
  }

  public getCartTotalPrice() {
    return cy.get(`[data-cy="cart-total-price"]`);
  }
}
