import { expect } from '@playwright/test';
import MailSlurp from 'mailslurp-client';

export class Login {

    constructor(page) {
        this.page = page;
        this.login_link = page.getByRole('link', { name: 'Log In' });
        this.enterEmail_text = page.getByText('Enter your email for a login verification code.')
        this.email_textbox = page.getByLabel('Email');
        this.sendPIN_btn = page.getByText('Send PIN');
        this.pin_textbox = page.getByLabel('PIN');
        this.login_btn = page.getByRole('button', { name: 'Login' });
        this.success_msg = page.getByText('Success! Welcome back!');
    }

    async verifyLoginPage() {
        await this.page.waitForLoadState()
        await expect(await this.enterEmail_text).toBeVisible();
        await expect(await this.email_textbox).toBeVisible();
    }

    async goto() {
        await this.page.goto('/')
        await expect(await this.login_link).toBeVisible();
        await this.login_link.click();
        await expect(await this.email_textbox).toBeVisible();
    }

    async getPin(emailAddress, apiKey) {
        await this.page.waitForTimeout(15000)
        expect(apiKey).toBeDefined();
        const mailslurp = new MailSlurp({ apiKey })
        const id = emailAddress.split('@')[0]
        const email = await mailslurp.waitForLatestEmail(id)
        const desc = email.subject
        const startIndex = desc.indexOf("[") + 1;
        const endIndex = desc.indexOf("]");
        const pinCode = desc.substring(startIndex, endIndex);
        return pinCode
    }

    async login(email, apiKey) {
        await expect(await this.email_textbox).toBeVisible();
        await expect(await this.sendPIN_btn).toBeVisible();
        await this.email_textbox.click();
        await this.email_textbox.fill(email);
        await this.page.waitForTimeout(3000)
        await this.sendPIN_btn.click({ force: true });
        await this.page.waitForTimeout(5000);
        await expect(await this.login_btn).toBeVisible();
        await expect(await this.pin_textbox).toBeVisible();
        const pin = await this.getPin(email, apiKey);
        await this.pin_textbox.fill(pin);
        await this.login_btn.click();
        await expect(await this.login_btn).not.toBeVisible();
        await expect(await this.success_msg).toBeVisible();
    }
}