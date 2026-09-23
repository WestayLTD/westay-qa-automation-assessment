import { Page } from '@playwright/test';

export class LandingPage {
  constructor(private readonly page: Page) {}

  readonly title = () => this.page.getByRole('heading', { name: 'Test thoughtfully. Build confidently.' });
  readonly startButton = () => this.page.getByRole('link', { name: /Start Evaluation/ });

  async goto() { await this.page.goto('/'); }
  async startEvaluation() { await this.startButton().click(); }
}
