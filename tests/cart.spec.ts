import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('TC-06 should show an added product in the cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    await productsPage.goto();
    await productsPage.addProductToCart('Laptop');
    await productsPage.openCart();
    await expect(cartPage.item('Laptop')).toBeVisible();
    await expect(cartPage.item('Laptop').getByTestId('item-quantity')).toHaveText('1');
  });

  test('TC-07 should remove a product from the cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    await productsPage.goto();
    await productsPage.addProductToCart('Laptop');
    await productsPage.openCart();
    await cartPage.removeProduct('Laptop');
    await expect(cartPage.item('Laptop')).toHaveCount(0);
    await expect(cartPage.cartCount()).toHaveText('0');
  });

  test('TC-08 should calculate the cart subtotal correctly', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    await productsPage.goto();
    await productsPage.addProductToCart('Laptop');
    await productsPage.addProductToCart('Wireless Headphones');
    await productsPage.openCart();
    await expect(cartPage.subtotal()).toHaveText('$1,148.00');
  });
});
