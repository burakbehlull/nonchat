import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8000',
    specPattern: 'src/tests/e2e/**/*.cy.{js,jsx,ts,tsx}',
	supportFile: 'src/tests/e2e/e2e.js',
  },
})
