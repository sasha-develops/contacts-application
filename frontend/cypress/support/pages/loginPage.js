/* eslint-disable no-undef */
const emailInput = '#email';
const passInput = '#password';
const loginBtn = 'button[type="submit"]';
const landingPageTitle = 'Login';

export function verifyLoginPageTitle() {
  cy.contains(landingPageTitle).should('be.visible');
}

export function login(email, password) {
  cy.get(emailInput).type(email);
  cy.get(passInput).type(password);
  cy.get(loginBtn)
    .click()
    .then(() => {
      // Store the authentication token in local storage
      cy.window().then((win) => {
        const authToken = win.localStorage.getItem('authToken');
        if (!authToken) {
          // Retrieve the token from the response and store it
          cy.request('POST', `${Cypress.env('apiUrl')}/login`, {
            email,
            password,
          }).then((response) => {
            win.localStorage.setItem('authToken', response.body.token);
          });
        }
      });
    });
}

export function sessionLogin(email, password) {
  cy.session([email, password], () => {
    cy.visit('/login');
    login(email, password);
    cy.url().should('not.include', '/login');
  });
}
