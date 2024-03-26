import { expect } from '@playwright/test';
export class FAQ {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.text-brand-status-info');
    this.heading = page.locator('.mt-1')
  }

  async validateFAQ() {
    await expect(this.title).toHaveText('q & a');
    await expect(this.heading).toHaveText('You asked, we answered');
  }
}