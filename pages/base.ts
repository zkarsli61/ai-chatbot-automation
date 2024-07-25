import { test as base } from '@playwright/test';
import BotPage from './BotPage';

// Declare the types of your fixtures.
type MyFixtures = {
    botPage: BotPage
};

// Extend base test by providing "campaignPage" and "settingsPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
    botPage: async ({ page }, use) => {
        // Use the fixture value in the test.
        await page.goto('/');
        await use(new BotPage(page));
        // Clean up the fixture.
    }
});
export { expect } from '@playwright/test';