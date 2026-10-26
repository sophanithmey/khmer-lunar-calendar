import { describe, it, expect } from 'vitest';
import { getKhmerDayPeriod, getKhmerTimeInfo, getKhmerSolarDateString } from './khmer-time-utils';

describe('khmer-time-utils', () => {
  it('correctly categorizes day periods across 24 hours', () => {
    // 03:00 - early morning / dawn
    const dawn = new Date(2026, 9, 13, 3, 30, 0);
    expect(getKhmerDayPeriod(dawn).periodKm).toBe('រំលងអធ្រាត្រ');

    // 09:00 - morning
    const morning = new Date(2026, 9, 13, 9, 15, 0);
    expect(getKhmerDayPeriod(morning).periodKm).toBe('ព្រឹក');
    expect(getKhmerDayPeriod(morning).daytimeCategoryKm).toBe('ពេលព្រឹក');

    // 12:00 - noon
    const noon = new Date(2026, 9, 13, 12, 0, 0);
    expect(getKhmerDayPeriod(noon).periodKm).toBe('ថ្ងៃត្រង់');

    // 15:30 - afternoon
    const afternoon = new Date(2026, 9, 13, 15, 30, 0);
    expect(getKhmerDayPeriod(afternoon).periodKm).toBe('រសៀល');
    expect(getKhmerDayPeriod(afternoon).daytimeCategoryKm).toBe('ពេលរសៀល');

    // 19:00 - evening
    const evening = new Date(2026, 9, 13, 19, 0, 0);
    expect(getKhmerDayPeriod(evening).periodKm).toBe('ល្ងាច');

    // 22:00 - night
    const night = new Date(2026, 9, 13, 22, 0, 0);
    expect(getKhmerDayPeriod(night).periodKm).toBe('យប់');
  });

  it('formats time with Khmer numerals and period', () => {
    const afternoon = new Date(2026, 9, 13, 15, 45, 30);
    const info = getKhmerTimeInfo(afternoon);
    expect(info.hours12).toBe(3);
    expect(info.formattedTimeKm).toContain('ម៉ោង');
    expect(info.formattedTimeKm).toContain('រសៀល');
    expect(info.formattedTimeWithSecondsKm).toContain('រសៀល');
  });

  it('formats solar date string correctly in Khmer and English', () => {
    // 2026-10-13 is a Tuesday
    const date = new Date(2026, 9, 13);
    const kmStr = getKhmerSolarDateString(date, 'km');
    expect(kmStr).toContain('ថ្ងៃអង្គារ');
    expect(kmStr).toContain('ខែតុលា');
    expect(kmStr).toContain('២០២៦');

    const enStr = getKhmerSolarDateString(date, 'en');
    expect(enStr).toBe('Tuesday, 13 October 2026');
  });
});
