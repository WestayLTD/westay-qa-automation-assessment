import { Page } from '@playwright/test';

export class ProductsPage {
  constructor(private readonly page: Page) {}

  readonly productCards = () => this.page.getByTestId('product-card');
  readonly cartCount = () => this.page.getByTestId('cart-count');

  async goto() { await this.page.goto('/products'); }

  product(name: string) {
    return this.productCards().filter({ has: this.page.getByRole('heading', { name, exact: true }) });
  }

  async addProductToCart(name: string) {
    await this.product(name).getByRole('button', { name: 'Add to Cart' }).click();
  }

  async openCart() { await this.page.getByRole('link', { name: 'View cart' }).click(); }
}
