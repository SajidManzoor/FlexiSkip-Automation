export class Portals {
    constructor(page) {
        this.page = page;
        this.bookPickup_btn = page.getByRole('button', { name: 'Book a Pick-up' });
    }
    async clickBookPickup() {
        await this.bookPickup_btn.click();
    }

}