import { expect, test } from '../pages/base';
import botInputs from "../test-data/conversation.json";
import * as fs from 'fs';
import * as path from 'path';

test('verify chatBot messages', async ({ botPage }) => {
    // Loop through the test cases
    for (const input of botInputs) {
        let response = await botPage.sendMessage(input.question)
        await botPage.checkResponse(response, input)
    }
    const filePath = path.join(__dirname, '../test-data/conversation.json');
    fs.writeFileSync(filePath, JSON.stringify(botInputs, null, 2), 'utf-8');
});
