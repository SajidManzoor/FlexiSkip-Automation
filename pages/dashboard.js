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
    }

    async selectPortal(portalName) {
        await this.portals_btn.click();
        await this.page.getByRole('link', { name: portalName, exact: true }).click();
    }

    async openSettings() {
        await this.profile_dropdown.click({timeout:10000});
        await this.settings_option.click();
        await this.page.waitForLoadState();
        await expect(this.page.url()).toContain('settings');
    }

    async signOut() {
        await this.profile_dropdown.click();
        await this.signOut_option.click();
        await this.page.waitForLoadState();
        await expect(await this.success_message).toBeVisible({ timeout: 10000 });
    }

}