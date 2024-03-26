import { expect } from "@playwright/test";

export class Order {
    constructor(page) {
        this.page = page;
        this.addressSearch_textbox = page.getByPlaceholder('Search for address');
        this.addressSearch_options = page.locator('#address-options');
        this.Checkout_button = page.getByRole('button', { name: 'Checkout' });
        this.cancel_button = page.getByRole('button', { name: 'Cancel' });
    }

    async searchAddress(address) {
        await this.page.waitForLoadState()
        await this.page.waitForLoadState('domcontentloaded');

        await this.page.waitForLoadState('networkidle');

        if (await this.cancel_button.count() > 0 ) {
            await this.cancel_button.click({ force: true });
            await this.searchAddress(address)
        }

        await this.addressSearch_textbox.fill(address);
    }

    async selectFirstOption() {
        let option = this.addressSearch_options.first()
        await this.page.waitForLoadState()
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
        await option.click();
        return option.textContent()
    }

    async clickCheckout() {
        await this.page.waitForLoadState()
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
        await this.Checkout_button.click();
    }
}