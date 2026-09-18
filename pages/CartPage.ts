import { Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  readonly cartItems = () => this.page.getByTestId('cart-item');
  readonly subtotal = () => this.page.getByTestId('subtotal');
  readonly cartCount = () => this.page.getByTestId('cart-count');

  async goto() { await this.page.goto('/cart'); }

  item(name: string) {
    return this.cartItems().filter({ has: this.page.getByRole('heading', { name, exact: true }) });
  }

  async removeProduct(name: string) {
    await this.item(name).getByRole('button', { name: 'Remove' }).click();
  }
}
