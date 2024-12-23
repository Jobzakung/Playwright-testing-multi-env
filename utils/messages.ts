import { readFile } from 'fs/promises';
import { join } from 'path';

const SUPPORTED_LANGUAGES = ['th', 'en'] as const;
type Language = typeof SUPPORTED_LANGUAGES[number];

const messageCache: Record<string, any> = {};

export const loadMessages = async (locale: string) => {
    const validLocale = SUPPORTED_LANGUAGES.includes(locale as Language) ? locale : 'th';

    // Return cached messages if available
    if (messageCache[validLocale]) {
        return messageCache[validLocale];
    }

    try {
        const filePath = join(process.cwd(), 'messages', `${validLocale}.json`);
        const response = await readFile(filePath, { encoding: 'utf8' });
        const messages = JSON.parse(response);

        // Cache the messages
        messageCache[validLocale] = messages;

        return messages;
    } catch (error) {
        console.error(`Failed to load messages for locale: ${validLocale}`);
        // Fallback to Thai if error
        if (validLocale !== 'th') {
            return loadMessages('th');
        }
        throw error;
    }
};