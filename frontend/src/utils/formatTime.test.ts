import { describe, it, expect } from 'vitest';

import { formatTime, calcTimeAgo } from './formatTime';

const date = new Date('2025-08-26T16:00:00');
const stringDate = '2025-08-26T16:00:00';
describe('formatTime', () => {
    it('Should return string ru-RU time format', () => {
        expect(formatTime(date)).toBe('16:00');
    });

    it('Should convert string to Date()', () => {
        expect(formatTime(stringDate)).toBe('16:00');
    });
});

const strCurrentDate = '2025-08-26T16:00:00';
const strTime = '2025-08-26T10:00:00';
describe('calcTimeAgo', () => {
    it('Should convert string to Date()', () => {
        expect(calcTimeAgo(strCurrentDate, strTime)).toBe('6h ago');
    });

    it('Should work with Date()', () => {
        expect(
            calcTimeAgo(
                new Date('2025-08-26T16:10:00'),
                new Date('2025-08-26T16:09:30')
            )
        ).toBe('now');
    });
});
