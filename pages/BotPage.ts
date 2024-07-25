import { expect, Locator, Page } from '@playwright/test';

export default class BotPage {
    readonly page: Page;
    readonly request: Locator;
    readonly response: Locator;

    constructor(page: Page) {
        this.page = page;
        this.request = page.locator('textarea.chatbox').last();
        this.response = page.locator('div.markdownContainer p').last();
    }

    async sendMessage(message: string) {
        await this.request.pressSequentially(message);
        await this.request.press('Enter');
        return await this.page.waitForResponse('https://api.deepai.org/hacking_is_a_serious_crime')
            .then(async response => await response.text());
    }

    async checkResponse(response: string, expected: any) {
        if (!expected.responses.includes(response)) {
            expected.responses.push(response);
            expect.soft(false, `Q:${expected.question}\n response added:${response}`).toBeTruthy();
        }
    }
}