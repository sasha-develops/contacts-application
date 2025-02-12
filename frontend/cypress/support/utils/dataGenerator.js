import { faker } from '@faker-js/faker';

export function generateUser() {
  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: faker.phone.number(),
  };
}

export function generateContact() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
  };
}

export function generateContactBookName() {
  return faker.lorem.word();
}
