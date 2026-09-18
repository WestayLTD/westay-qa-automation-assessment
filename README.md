# Westay QA Automation Evaluation

## Overview

This is a practical Playwright exercise for a Senior QA Automation Engineer. The project contains a small e-commerce application and a simple TypeScript automation framework with eight passing starter tests.

The application flow is:

**Landing Page → Product Listing → Cart → Checkout Success**

## Technology

- HTML, CSS and JavaScript
- Playwright
- TypeScript
- Node.js

## Setup and run

```bash
npm install
npx playwright install chromium
npm test
```

Playwright starts the application automatically when the tests run. The expected starter result is **8 passed**.

To explore the application manually:

```bash
npm start
```

Then open `http://127.0.0.1:4173`.

## Existing tests

The starter suite covers basic landing-page navigation, product display, adding products, cart contents, removing a product and subtotal calculation.

## Your tasks

### Task 1 — Maximum quantity per product

A customer can add a maximum of **2 units of the same product** to the cart. Any attempt to add more than 2 units should not increase the product quantity.

Identify the scenarios you consider important and add suitable Playwright test coverage.

### Task 2 — Maximum unique products

The cart can contain a maximum of **3 unique products**. If the customer attempts to add a fourth different product, it should not be added.

Identify the scenarios you consider important and add suitable Playwright test coverage.

## Guidelines

- Extend the existing Playwright framework and follow its simple structure.
- Keep the tests independent; one test must not depend on another test's state.
- Use clear test names and appropriate Playwright locators and assertions.
- You may extend the Page Objects where it improves readability.
- Keep the solution simple and be ready to explain your decisions.

Useful commands:

```bash
npm run test:headed
npm run test:ui
npm run report
```
