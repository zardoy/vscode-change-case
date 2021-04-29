import { snakeCase } from 'change-case';

export const snakeUpper = (text: string) => {
    const FIRST_LETTER_REGEX = /^\w/;
    const FIRST_AFTER_UNDER_REGEX = /_([A-Za-z]){1}/g;
    return snakeCase(text)
        .replace(FIRST_LETTER_REGEX, (v) => v.toUpperCase())
        .replace(FIRST_AFTER_UNDER_REGEX, (v) => v.toUpperCase());
};
