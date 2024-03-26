import { expect } from "@playwright/test";

export class Dashboard {
    constructor(page) {
        this.page = page;
        this.portals_btn = page.getByRole('button', { name: 'Portals' })
        this.profile_dropdown = page.locator('#profile-dropdown')
        this.profile_dropdown_menu = page.locator('#profile-dropdown-menu')
        this.settings_option = this.profile_dropdown_menu.getByText('Settings')
        this.signOut_option = this.profile_dropdown_menu.getByText('Sign Out')
        this.success_message = page.getByText('Success! Logged out')
        this.resources_dropdown = page.getByRole('button', { name: 'Resources' })
        this.FAQ_option = page.getByRole('link', { name: 'FAQ' })
    }

    async selectPortal(portalName) {
        await this.portals_btn.click();
        await this.page.getByRole('link', { name: portalName, exact: true }).click();
    }

    async openSettings() {
        await this.page.goto('/')
        await this.profile_dropdown.click({ timeout: 10000 });
        await this.settings_option.click();
        await this.page.waitForLoadState();
        await expect(this.page.url()).toContain('settings');
    }

    async signOut() {
        await this.page.goto('/')
        await this.profile_dropdown.click();
        await this.signOut_option.click();
        await this.page.waitForLoadState();
        await expect(await this.success_message).toBeVisible({ timeout: 10000 });
    }

    async openFAQ() {
        await this.page.goto('/')
        await this.page.waitForLoadState();
        await this.resources_dropdown.click({ force: true });
        await this.FAQ_option.click({ force: true });
        await this.page.waitForLoadState();
        await expect(this.page.url()).toContain('faq');
    }
}