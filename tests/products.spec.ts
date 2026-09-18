import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Product listing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('TC-03 should display products with their key details', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await expect(productsPage.productCards()).toHaveCount(6);
    const laptop = productsPage.product('Laptop');
    await expect(laptop.getByTestId('product-price')).toHaveText('$999.00');
    await expect(laptop.getByRole('button', { name: 'Add to Cart' })).toBeVisible();
  });

  test('TC-04 should add a product to the cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.addProductToCart('Laptop');
    await expect(productsPage.cartCount()).toHaveText('1');
  });

  test('TC-05 should add multiple products to the cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.addProductToCart('Laptop');
    await productsPage.addProductToCart('Wireless Headphones');
    await productsPage.addProductToCart('Mechanical Keyboard');
    await expect(productsPage.cartCount()).toHaveText('3');
  });
});
