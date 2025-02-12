/* eslint-disable no-undef */
const createNewContactBookBtn = 'Create New Contact Book';
const contactBookNameInput = '#contact-book-name';
const createContactBookBtn = 'Create Contact Book';

export function createNewContactBook(contactBookName) {
  cy.contains('button', createNewContactBookBtn).click();
  cy.get(contactBookNameInput).type(contactBookName);
  cy.contains('button', createContactBookBtn).click();

  cy.contains('h2', contactBookName).should('be.visible');
}

export function clickViewDetails(contactBookName) {
  cy.get('li > div')
    .find('h2')
    .contains(contactBookName)
    .parent()
    .next()
    .find('button')
    .contains('View Details')
    .click();

  cy.url().should('include', '/contacts');
}

export function deleteContactBook(contactBookName) {
  cy.get('li > div')
    .find('h2')
    .contains(contactBookName)
    .parent()
    .next()
    .find('button')
    .contains('Delete')
    .click();

  cy.contains('h2', contactBookName).should('not.exist');
}
