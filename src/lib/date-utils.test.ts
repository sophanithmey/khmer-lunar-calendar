import { describe, it, expect } from 'vitest';
import { formatIsoDate, parseIsoDate, addDays, isSameDay } from './date-utils';

describe('Date Utilities', () => {
  it('formats Date to YYYY-MM-DD', () => {
    const d = new Date(2026, 9, 13, 12, 0, 0); // October is month 9
    expect(formatIsoDate(d)).toBe('2026-10-13');
  });

  it('parses YYYY-MM-DD correctly', () => {
    const d = parseIsoDate('2026-10-13');
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(9);
    expect(d.getDate()).toBe(13);
  });

  it('adds days correctly across month boundaries', () => {
    const start = new Date(2026, 9, 31, 12, 0, 0);
    const nextDay = addDays(start, 1);
    expect(nextDay.getMonth()).toBe(10); // November
    expect(nextDay.getDate()).toBe(1);
  });

  it('compares same day accurately regardless of time', () => {
    const d1 = new Date(2026, 9, 13, 8, 30, 0);
    const d2 = new Date(2026, 9, 13, 23, 15, 0);
    const d3 = new Date(2026, 9, 14, 8, 30, 0);
    expect(isSameDay(d1, d2)).toBe(true);
    expect(isSameDay(d1, d3)).toBe(false);
  });
});
