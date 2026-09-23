# Westay QA Automation Assessment

## Overview

This repository contains a lightweight e-commerce application and two equivalent Playwright starter frameworks for evaluating Senior QA Automation Engineer candidates.

The application flow is:

**Landing Page → Product Listing → Cart → Checkout Success**

The application is shared by both frameworks and stores cart state in the browser's `localStorage`. No database or external server is required.

## Choose your language

Use the framework that matches your primary automation language:

- [Playwright with TypeScript](playwright-typescript/README.md)
- [Playwright with Python](playwright-python/README.md)

Both versions contain the same Page Objects, the same eight starter tests and the same candidate exercises.

## Repository structure

```text
app/                         Shared HTML, CSS and JavaScript application
playwright-typescript/       TypeScript Page Objects, tests and configuration
playwright-python/           Python Page Objects, tests and configuration
server.cjs                   Local server used by the TypeScript framework
README.md                    This language-selection guide
```

## Application functionality

- Product listing with six products
- Add products to the cart
- Cart quantity counter
- Increase, decrease and remove cart items
- Subtotal, tax and total calculation
- Checkout-success page
- Maximum of 2 units of the same product
- Maximum of 3 unique products

The last two rules are implemented in the application but intentionally not covered by the starter tests. Candidates are expected to automate them.

## Candidate tasks

### Task 1 — Maximum quantity per product

A customer can add a maximum of **2 units of the same product** to the cart. Any attempt to add more than 2 units should not increase the product quantity.

### Task 2 — Maximum unique products

The cart can contain a maximum of **3 unique products**. If the customer attempts to add a fourth different product, it should not be added.

Candidates should identify the important scenarios and add suitable Playwright test coverage using their selected language framework.
