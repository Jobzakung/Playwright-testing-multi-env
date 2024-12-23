import { BasePage } from "./basePage";

export class debugPageInfo extends BasePage {


    async debugPageInfo() {
        console.log('\n=== Page Debug Info ===');
        console.log('Current URL:', await this.page.url());
        console.log('Language:', this.lang);
        console.log('Page Title:', await this.page.title());
        console.log('=====================\n');
    }

    async debugScreenshot(name: string = 'debug') {
        await this.page.screenshot({
            path: `./test-results/screenshots/${name}-${this.lang}.png`,
            fullPage: true
        });
    }

    async debugConsoleLog() {
        this.page.on('console', msg => {
            console.log(`[Browser Console] ${msg.type()}: ${msg.text()}`);
        });
    }

    async debugNetworkRequests() {
        this.page.on('request', request => {
            console.log(`[Network] Request: ${request.method()} ${request.url()}`);
        });

        this.page.on('response', response => {
            console.log(`[Network] Response: ${response.status()} ${response.url()}`);
        });
    }
    
}