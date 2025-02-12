/* eslint-disable no-undef */
// This is a support file for Cypress tests.
// You can add custom commands and global configurations here.
/// <reference types="cypress" />
// Example: Custom command to log in
Cypress.Commands.add('login', (email, password) => {
  cy.request('POST', `${Cypress.env('apiUrl')}/login`, {
    email,
    password,
  }).then((response) => {
    window.localStorage.setItem('authToken', response.body.token);
  });
});

Cypress.Commands.add('cleanup', () => {
  // Retrieve the authentication token from local storage
  const authToken = window.localStorage.getItem('authToken');

  // Example: Delete all contact books
  cy.request({
    method: 'GET',
    url: `${Cypress.env('apiUrl')}/contact-books`,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    response.body.forEach((contactBook) => {
      cy.request({
        method: 'DELETE',
        url: `${Cypress.env('apiUrl')}/contact-books/${contactBook.id}`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        failOnStatusCode: false,
      });
    });
  });
});
