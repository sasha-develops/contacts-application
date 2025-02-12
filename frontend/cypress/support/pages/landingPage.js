/* eslint-disable no-undef */
const loginBtn = 'Login';
const registerBtn = 'Register';
const landingPageTitle = 'Welcome to the Contacts App';

export function clickLoginBtn() {
  cy.contains(loginBtn).click();
}

export function clickRegisterBtn() {
  cy.contains(registerBtn).click();
}

export function verifyLandingPageTitle() {
  cy.contains(landingPageTitle).should('be.visible');
}
