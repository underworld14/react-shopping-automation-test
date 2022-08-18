declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable;
      // login(email: string, password: string): Chainable<void>;
      // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
      // dismiss(
      //   subject: string,
      //   options?: Partial<TypeOptions>
      // ): Chainable<Element>;
      // visit(
      //   originalFn: CommandOriginalFn,
      //   url: string,
      //   options: Partial<VisitOptions>
      // ): Chainable<Element>;
    }
  }
}
