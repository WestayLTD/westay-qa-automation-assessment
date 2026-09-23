# Playwright TypeScript Assessment

## Prerequisites

- Node.js 18 or later
- npm

## Setup and run

From the repository root:

```bash
cd playwright-typescript
npm install
npx playwright install chromium
npm test
```

The application starts automatically. The expected starter result is **8 passed**.

## View the HTML report

```bash
npm run report
```

## Explore the application manually

```bash
npm start
```

Open `http://127.0.0.1:4173`.

## Useful commands

```bash
npm run test:headed
npm run test:ui
npm run report
```

## Candidate exercises

1. Automate the rule that a customer cannot add more than **2 units of the same product**.
2. Automate the rule that the cart cannot contain more than **3 unique products**.

Keep tests independent, use appropriate Playwright locators and assertions, and extend the existing Page Objects where useful.
