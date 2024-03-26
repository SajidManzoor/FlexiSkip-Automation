export class Portals {
    constructor(page) {
        this.page = page;
        this.bookPickup_btn = page.getByRole('button', { name: 'Book a Pick-up' });
        this.eligibility_btn = page.getByRole('link', { name: 'Check your eligibility' });
    }
    async clickBookPickup() {
        await this.bookPickup_btn.click();
    }
    async clickEligibility() {
        await this.eligibility_btn.click();
    }

}