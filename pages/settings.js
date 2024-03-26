import { expect } from '@playwright/test';
export class Settings {
    constructor(page) {
        this.page = page;
        this.firstName_textbox = page.getByLabel('First Name')
        this.lastName_textbox = page.getByLabel('Last Name')
        this.updateProfile_button = page.getByRole('button', { name: 'Update Profile' })
        this.success_message = page.getByText('Success! Your profile has been updated')
    }

    async updateUserName(firstName, lastName) {
        await this.page.waitForLoadState()
        await expect(await this.firstName_textbox).toBeVisible();
        await this.firstName_textbox.fill(firstName);
        await this.lastName_textbox.fill(lastName);
        await this.updateProfile_button.click();      
        await expect(await this.success_message).toBeVisible({timeout:10000});
    }

}