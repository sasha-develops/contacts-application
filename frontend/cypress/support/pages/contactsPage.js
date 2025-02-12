/* eslint-disable no-undef */
const addContactBtn = 'Add Contact';
const contactNameInput = '#contact-name';
const contactEmailInput = '#contact-email';
const contactPhoneInput = '#contact-phone';
const createContactBtn = 'Create Contact';
const editContactBtn = 'Edit';
const updateContactBtn = 'Update';
const deletedContactStatusMessage = 'Contact deleted successfully';
const deleteContactBtn = 'Delete';
const contactField = 'p[class*="text-sm text-gray-500"]';

export function addContact(contactName, contactEmail, contactPhone) {
  cy.contains('button', addContactBtn).click();
  cy.get(contactNameInput).type(contactName);
  cy.get(contactEmailInput).type(contactEmail);
  cy.get(contactPhoneInput).type(contactPhone);
  cy.contains('button', createContactBtn).click();

  cy.wait(20000);
  cy.reload();
}

export function editContact(newContactName, newContactEmail, newContactPhone) {
  cy.contains('button', editContactBtn).click();
  cy.get(contactNameInput).clear().type(newContactName);
  cy.get(contactEmailInput).clear().type(newContactEmail);
  cy.get(contactPhoneInput).clear().type(newContactPhone);
  cy.contains('button', updateContactBtn).click();

  checkForFailureMessage(10, 500, 'update');

  cy.wait(15000);
  checkForFailureMessage(5, 250, 'update');
  cy.reload();
}

export function deleteContact(contactName) {
  cy.get('li > div')
    .find('h2')
    .contains(contactName)
    .parent()
    .next()
    .find('button')
    .contains(deleteContactBtn)
    .click();

  cy.contains('[role=status]', deletedContactStatusMessage).should(
    'be.visible'
  );

  cy.reload();
}

function checkForFailureMessage(retries, interval, action) {
  if (retries > 0) {
    cy.get('body').then(($body) => {
      if (
        $body
          .find('div[role="status"]')
          .text()
          .includes(`Failed to ${action} contact.`)
      ) {
        throw new Error(`Failed to ${action} contact`);
      }
    });
    cy.wait(interval).then(() => {
      checkForFailureMessage(retries - 1, interval);
    });
  }
}

export function verifyContactFieldValue(fieldValue) {
  cy.get(contactField).each(($el, index) => {
    if (index > 0) {
      cy.wrap($el).should('not.contain', fieldValue);
    }
  });
}

export function viewContactHistory(contactName) {
  cy.get('li > div')
    .find('h2')
    .contains(contactName)
    .parent()
    .next()
    .find('button')
    .contains('History')
    .click();
}
