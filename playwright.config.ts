import { PlaywrightTestConfig } from '@playwright/test';
import path from 'path';

// Configuration constants
const ENV = process.env.ENV || 'UAT';
const LANG = process.env.LANG?.includes('_') ? undefined : process.env.LANG;

// Import environment config
const envConfig = require(path.join(__dirname, 'config', `${ENV}.config.ts`));

// Viewport configurations
const VIEWPORT = {
 MOBILE: { width: 375, height: 667 },     // iPhone SE
 TABLET: { width: 768, height: 1024 },    // iPad 
 LAPTOP: { width: 1366, height: 768 },    // Laptop
 DESKTOP: { width: 1920, height: 1080 },  // Full HD

} as const;

// Type definitions
interface ProjectOptions {
  lang: string;
}

interface LanguageProject {
  name: string;
  use: {
    lang: string;
    baseURL: string;
    viewport?: typeof VIEWPORT[keyof typeof VIEWPORT];
  };
}

// Language and device configuration
const projectConfigs: Record<string, LanguageProject[]> = {
  th: [
    {
      name: 'thai-desktop',
      use: {
        lang: 'th',
        baseURL: envConfig.default.baseURL['th'],
        viewport: VIEWPORT.DESKTOP,
      },
    },
    {
      name: 'thai-tablet',
      use: {
        lang: 'th',
        baseURL: envConfig.default.baseURL['th'],
        viewport: VIEWPORT.TABLET,
      },
    },
    {
      name: 'thai-mobile',
      use: {
        lang: 'th',
        baseURL: envConfig.default.baseURL['th'],
        viewport: VIEWPORT.MOBILE,
      },
    }
  ],
  en: [
    {
      name: 'english-desktop',
      use: {
        lang: 'en',
        baseURL: envConfig.default.baseURL['en'],
        viewport: VIEWPORT.DESKTOP,
      },
    },
    {
      name: 'english-tablet', 
      use: {
        lang: 'en',
        baseURL: envConfig.default.baseURL['en'],
        viewport: VIEWPORT.TABLET,
      },
    },
    {
      name: 'english-mobile', 
      use: {
        lang: 'en',
        baseURL: envConfig.default.baseURL['en'],
        viewport: VIEWPORT.MOBILE,
      },
    }
  ]
};

// Get projects based on language setting
const getProjects = (lang?: string): LanguageProject[] => {
  if (lang && lang in projectConfigs) {
    return projectConfigs[lang];
  }
  return Object.values(projectConfigs).flat();
};

const config: PlaywrightTestConfig<{}, ProjectOptions> = {
  testDir: './tests',
  outputDir: './test-artifacts',
  reporter: [['list'], ['html', { outputFolder: './test-results/' ,open: 'never'}]],
  use: {
    screenshot: 'only-on-failure',
    // video: 'on',
    // trace: 'on',
    baseURL: envConfig.default.baseURL['th'],
  },
  projects: getProjects(LANG),
  // forbidOnly: !!process.env.CI,
  // retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
};

export default config;
// import { defineConfig, devices } from '@playwright/test';
// import path from 'path';

// const ENV = process.env.NODE_ENV || 'dev';
// const LANG = process.env.LANG || 'en';

// const envConfig = require(path.join(__dirname, 'config', `${ENV}.config`)).default;

// /**
//  * Read environment variables from file.
//  * https://github.com/motdotla/dotenv
//  */
// // import dotenv from 'dotenv';
// // import path from 'path';
// // dotenv.config({ path: path.resolve(__dirname, '.env') });

// /**
//  * See https://playwright.dev/docs/test-configuration.
//  */
// export default defineConfig({
//   testDir: './tests',
//   use: {
//     baseURL: envConfig.baseURL[LANG],
//   },
//   projects: [
//     {
//       name: LANG,
//       use: {
//         lang: LANG,
//       },
//     },
//   ],
  
// });
// // testDir: './tests',
// // /* Run tests in files in parallel */
// // fullyParallel: true,
// // /* Fail the build on CI if you accidentally left test.only in the source code. */
// // forbidOnly: !!process.env.CI,
// // /* Retry on CI only */
// // retries: process.env.CI ? 2 : 0,
// // /* Opt out of parallel tests on CI. */
// // workers: process.env.CI ? 1 : undefined,
// // /* Reporter to use. See https://playwright.dev/docs/test-reporters */
// // reporter: 'html',
// // /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
// // use: {
// //   /* Base URL to use in actions like `await page.goto('/')`. */
// //   // baseURL: 'http://127.0.0.1:3000',

// //   /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
// //   trace: 'on-first-retry',
// // },

// // /* Configure projects for major browsers */
// // projects: [
// //   {
// //     name: 'chromium',
// //     use: { ...devices['Desktop Chrome'] },
// //   },

// //   {
// //     name: 'firefox',
// //     use: { ...devices['Desktop Firefox'] },
// //   },

// //   {
// //     name: 'webkit',
// //     use: { ...devices['Desktop Safari'] },
// //   },

// /* Test against mobile viewports. */
// // {
// //   name: 'Mobile Chrome',
// //   use: { ...devices['Pixel 5'] },
// // },
// // {
// //   name: 'Mobile Safari',
// //   use: { ...devices['iPhone 12'] },
// // },

// /* Test against branded browsers. */
// // {
// //   name: 'Microsoft Edge',
// //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
// // },
// // {
// //   name: 'Google Chrome',
// //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
// // },
// // ],

// /* Run your local dev server before starting the tests */
// // webServer: {
// //   command: 'npm run start',
// //   url: 'http://127.0.0.1:3000',
// //   reuseExistingServer: !process.env.CI,
// // },
// // });
