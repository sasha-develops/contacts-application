/* eslint-disable no-undef */
const nameInput = '#name';
const emailInput = '#email';
const passwordInput = '#password';
const passwordConfirmationInput = '#passwordConfirmation';
const submitButton = 'button[type="submit"]';
const pageHeader = 'h1';

export function register(name, email, password) {
  cy.get(nameInput).type(name);
  cy.get(emailInput).type(email);
  cy.get(passwordInput).type(password);
  cy.get(passwordConfirmationInput).type(password);
  cy.get(submitButton).click();

  cy.get(pageHeader).contains('My Contact Books');
}
