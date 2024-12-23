import { Page, TestInfo } from '@playwright/test';
import { loadMessages } from '../utils/messages';
import { getFullUrl } from '../config/url-config';

export class BasePage {
    protected lang: string;
    protected messages: any; // เพิ่ม property สำหรับเก็บ messages

    constructor(protected page: Page, testInfo: TestInfo) {
        const projectOptions = testInfo.project.use as { lang?: string };
        this.lang = projectOptions.lang || 'th';
        // เรียก loadMessages ทันทีและเก็บไว้
        this.initializeMessages();
    }

    // Initialize messages เมื่อสร้าง instance
    private async initializeMessages() {
        this.messages = await loadMessages(this.lang);
    }

    // getter สำหรับเรียกใช้ messages
    protected getMessages() {
        return this.messages;
    }

    async goto(path: string = '', options?: { channel?: string; tmnToken?: string }) {
        const fullUrl = getFullUrl(path, this.lang, options);
        // console.log(`[DEBUG] Navigating to: ${fullUrl}`);
        await this.page.goto(fullUrl);
    }
}