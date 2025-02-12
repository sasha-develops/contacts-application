import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    apiUrl: 'http://localhost:8080/api/v1',
  },
  e2e: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.js',
  },
});
