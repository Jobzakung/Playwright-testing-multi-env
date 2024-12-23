import { expect, Page, TestInfo } from '@playwright/test';
import { BasePage } from '../basePage';

export class EnterMobilePage extends BasePage {
    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
        this.messages = this.getMessages(); 
    }

    async verifyTitle() {
        await expect(this.page).toHaveTitle(this.messages.title);
    }

    async verifyPage() {
        await this.page.getByTitle(this.messages.title).isVisible();
    }
    async verifyHeaderPage(){
        await expect(this.page.locator('//*[@id="app"]/div/div[2]/h1')).toHaveText(this.messages.home.header);
    }
}