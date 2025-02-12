/* eslint-disable no-undef */
// eslint-disable-next-line prettier/prettier
import * as testData from '../support/utils/dataGenerator';

describe('Contacts Application API Tests', () => {
  const user = testData.generateUser();
  const contactBook = testData.generateContactBookName();
  const contact = testData.generateUser();

  before(() => {
    cy.request('POST', `${Cypress.env('apiUrl')}/register`, {
      name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password,
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  beforeEach(() => {
    cy.request('POST', `${Cypress.env('apiUrl')}/login`, {
      email: user.email,
      password: user.password,
    }).then((response) => {
      window.localStorage.setItem('authToken', response.body.token);
      cy.wrap(response.body.token).as('authToken');
    });

    cy.get('@authToken').then((token) => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/contact-books`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { name: contactBook },
      }).then((response) => {
        expect(response.status).to.eq(201);
        cy.wrap(response.body.id).as('contactBookId');
      });
    });
  });

  it('Should create a new contact', function () {
    const contact = testData.generateUser();
    const newContact = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    };

    cy.get('@authToken').then((token) => {
      cy.get('@contactBookId').then((contactBookId) => {
        cy.request({
          method: 'POST',
          url: `${Cypress.env('apiUrl')}/contact-books/${contactBookId}/contacts`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: newContact,
        }).then((response) => {
          expect(response.status).to.eq(202);
        });

        // Wait for 20 seconds before performing the assertion
        cy.wait(20000).then(() => {
          cy.request({
            method: 'GET',
            url: `${Cypress.env('apiUrl')}/contact-books/${contactBookId}/contacts`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body));
            expect(response.body).to.be.an('array');
            const contactExists = response.body.some(
              (contact) =>
                contact.name === newContact.name &&
                contact.email === newContact.email &&
                contact.phone === newContact.phone
            );
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            expect(contactExists).to.be.true;
          });
        });
      });
    });
  });

  it('Should fetch all contacts', function () {
    cy.get('@authToken').then((token) => {
      cy.get('@contactBookId').then((contactBookId) => {
        cy.request({
          method: 'GET',
          url: `${Cypress.env('apiUrl')}/contact-books/${contactBookId}/contacts`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          expect(response.status).to.be.oneOf([200, 204]);
        });
      });
    });
  });

  it('Should update a contact', function () {
    const contact = testData.generateUser();
    const newContact = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    };

    cy.get('@authToken').then((token) => {
      cy.get('@contactBookId').then((contactBookId) => {
        cy.request({
          method: 'POST',
          url: `${Cypress.env('apiUrl')}/contact-books/${contactBookId}/contacts`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: newContact,
        }).then((response) => {
          expect(response.status).to.eq(202);
        });

        const updatedContact = {
          name: user.name,
          email: user.email,
          phone: user.phone,
        };

        cy.get('@contactId').then((contactId) => {
          cy.request({
            method: 'PUT',
            url: `${Cypress.env('apiUrl')}/contact-books/${contactBookId}/contacts/${contactId}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: updatedContact,
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.be.oneOf([200, 204]);
            cy.log(JSON.stringify(response.body)); // Log the response body
            expect(response.body).to.have.property('contact');
            expect(response.body.contact).to.include(updatedContact);
          });
        });
      });
    });
  });

  it('Should delete a contact', function () {
    const newContact = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    };

    cy.get('@authToken').then((token) => {
      cy.get('@contactBookId').then((contactBookId) => {
        cy.request({
          method: 'POST',
          url: `${Cypress.env('apiUrl')}/contact-books/${contactBookId}/contacts`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: newContact,
        }).then((response) => {
          expect(response.status).to.eq(202);
        });

        // Wait for 20 seconds before performing the assertion
        cy.wait(20000).then(() => {
          cy.request({
            method: 'GET',
            url: `${Cypress.env('apiUrl')}/contact-books/${contactBookId}/contacts`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            cy.log(JSON.stringify(response.body));
            const contactId = response.body[0].id; // Assuming the first contact is the one we just created
            cy.wrap(contactId).as('contactId');

            cy.get('@contactId').then((contactId) => {
              cy.request({
                method: 'DELETE',
                url: `${Cypress.env('apiUrl')}/contact-books/${contactBookId}/contacts/${contactId}`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }).then((response) => {
                expect(response.status).to.eq(204);
              });
            });
          });
        });
      });
    });
  });

  it('Should fetch contact history', function () {
    const contactId = 20; // Replace with the actual contact ID you want to test

    cy.get('@authToken').then((token) => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/contacts/${contactId}/history`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(JSON.stringify(response.body)); // Log the response body

        // Assert that the response body is an array
        expect(response.body).to.be.an('array');

        // Assert that each history entry has the required properties
        response.body.forEach((entry) => {
          expect(entry).to.have.property('id');
          expect(entry).to.have.property('contact_id', contactId);
          expect(entry).to.have.property('changes');
          expect(entry).to.have.property('created_at');
          expect(entry).to.have.property('updated_at');

          // Assert that the changes property has the required fields
          const changes = entry.changes;
          if (changes.name) {
            expect(changes.name).to.have.property('new');
            expect(changes.name).to.have.property('old');
          }
          if (changes.email) {
            expect(changes.email).to.have.property('new');
            expect(changes.email).to.have.property('old');
          }
          if (changes.phone) {
            expect(changes.phone).to.have.property('new');
            expect(changes.phone).to.have.property('old');
          }
        });
      });
    });
  });

  it('Should return 404 for non-existent contact ID', function () {
    const invalidContactId = 99999; // Use a non-existent contact ID

    cy.get('@authToken').then((token) => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/contacts/${invalidContactId}/history`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        failOnStatusCode: false, // Prevent Cypress from failing the test on non-2xx status codes
      }).then((response) => {
        expect(response.status).to.eq(404);
        cy.log(JSON.stringify(response.body)); // Log the response body
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.eq('Resource not found.');
      });
    });
  });
});
