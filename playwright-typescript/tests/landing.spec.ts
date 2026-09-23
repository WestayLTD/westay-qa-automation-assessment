import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';

test.describe('Landing page', () => {
  test('TC-01 should display the evaluation landing page', async ({ page }) => {
    const landingPage = new LandingPage(page);
    await landingPage.goto();
    await expect(landingPage.title()).toBeVisible();
    await expect(landingPage.startButton()).toBeVisible();
  });

  test('TC-02 should navigate to the product listing', async ({ page }) => {
    const landingPage = new LandingPage(page);
    await landingPage.goto();
    await landingPage.startEvaluation();
    await expect(page).toHaveURL(/\/products$/);
    await expect(page.getByRole('heading', { name: 'Products', exact: true })).toBeVisible();
  });
});
