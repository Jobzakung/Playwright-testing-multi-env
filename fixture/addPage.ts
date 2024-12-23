import { test as base } from '@playwright/test';
import { EnterMobilePage } from './pages/EnterMobilePage';

type Pages = {
    enterMobilePage: EnterMobilePage;
    // เพิ่ม pages อื่นๆ ในอนาคต
};

// สร้าง fixture ที่มี pages ทั้งหมด
export const test = base.extend<Pages>({
    enterMobilePage: async ({ page }, use, testInfo) => {
        const enterMobilePage = new EnterMobilePage(page, testInfo);
        await use(enterMobilePage);
    },
    // เพิ่ม pages อื่นๆ ในอนาคต
});


export { expect } from '@playwright/test';