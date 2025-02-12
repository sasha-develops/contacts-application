/* eslint-disable no-undef */
// eslint-disable-next-line prettier/prettier

import * as registerPage from '../support/pages/registerPage';
import * as loginPage from '../support/pages/loginPage';
import * as landingPage from '../support/pages/landingPage';
import * as testData from '../support/utils/dataGenerator';
import * as myContactBooksPage from '../support/pages/myContactBooksPage';
import * as contactsPage from '../support/pages/contactsPage';

describe('UI tests for Contacts Application', () => {
  const user = testData.generateUser();
  const contactBookName = testData.generateContactBookName();
  const contact = testData.generateUser();
  const newContact = testData.generateUser();

  before(() => {
    cy.visit('/');
    landingPage.clickRegisterBtn();
    registerPage.register(user.name, user.email, user.password);
  });

  beforeEach(() => {
    loginPage.sessionLogin(user.email, user.password);
    cy.visit('/contact-books');
  });

  afterEach(() => {
    // Clean up test data after each test
    cy.cleanup();
  });

  it('Verify that contact book can be created', () => {
    myContactBooksPage.createNewContactBook(contactBookName);
  });

  it('Verify that contact book can be deleted', () => {
    myContactBooksPage.createNewContactBook(contactBookName);
    myContactBooksPage.deleteContactBook(contactBookName);
  });

  it('Verify that contact can be added to contact book', () => {
    myContactBooksPage.createNewContactBook(contactBookName);
    myContactBooksPage.clickViewDetails(contactBookName);
    contactsPage.addContact(contact.name, contact.email, contact.phone);

    cy.contains('h2', contact.name).should('be.visible');
  });

  it('Verify that contact can be edited in contact book', () => {
    myContactBooksPage.createNewContactBook(contactBookName);
    myContactBooksPage.clickViewDetails(contactBookName);
    contactsPage.addContact(contact.name, contact.email, contact.phone);

    cy.contains('h2', contact.name).should('be.visible');

    contactsPage.editContact(
      newContact.name,
      newContact.email,
      newContact.phone
    );

    cy.contains('h2', newContact.name).should('be.visible');
  });

  it('Verify that contact can be deleted from contact book', () => {
    myContactBooksPage.createNewContactBook(contactBookName);
    myContactBooksPage.clickViewDetails(contactBookName);
    contactsPage.addContact(contact.name, contact.email, contact.phone);
    contactsPage.deleteContact(contact.name);

    cy.contains('h2', contact.name).should('not.exist');
  });

  it('Verify that contact history can be viewed', () => {
    myContactBooksPage.createNewContactBook(contactBookName);
    myContactBooksPage.clickViewDetails(contactBookName);
    contactsPage.addContact(contact.name, contact.email, contact.phone);
    contactsPage.viewContactHistory(contact.name);

    cy.contains('h3', 'History').should('be.visible');
  });

  it('Verify validation for unique email', () => {
    myContactBooksPage.createNewContactBook(contactBookName);
    myContactBooksPage.clickViewDetails(contactBookName);
    contactsPage.addContact(contact.name, contact.email, contact.phone);

    cy.contains('h2', contact.name).should('be.visible');

    // Attempt to add a contact with the same email
    contactsPage.addContact(newContact.name, contact.email, newContact.phone);

    contactsPage.verifyContactFieldValue(contact.email);
  });

  it('Verify validation for required fields', () => {
    myContactBooksPage.createNewContactBook(contactBookName);
    myContactBooksPage.clickViewDetails(contactBookName);
    // Attempt to add a contact with empty fields
    contactsPage.addContact(' ', ' ', ' ');

    cy.contains('No contacts found.').should('be.visible');
  });

  it('Verify validation for invalid email', () => {
    myContactBooksPage.createNewContactBook(contactBookName);
    myContactBooksPage.clickViewDetails(contactBookName);
    contactsPage.addContact(contact.name, 'invalid-email', contact.phone); // Attempt to add a contact with an invalid email

    cy.contains('No contacts found.').should('be.visible');
  });
});
