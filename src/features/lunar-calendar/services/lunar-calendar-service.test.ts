import { describe, it, expect } from 'vitest';
import { KhmerLunarCalendarService } from './lunar-calendar-service';

describe('KhmerLunarCalendarService', () => {
  it('correctly calculates waxing (ខ្នើត) lunar date for 2026-10-13', () => {
    const testDate = new Date('2026-10-13T12:00:00Z');
    const result = KhmerLunarCalendarService.getKhmerDate(testDate);

    expect(result.day).toBe(2);
    expect(result.moonPhase).toBe('waxing');
    expect(result.moonPhaseNameKm).toBe('កើត');
    expect(result.monthNameKm).toBe('អស្សុជ');
    expect(result.animalYearNameKm).toBe('មមី');
    expect(result.beYear).toBe(2570);
  });

  it('correctly calculates full moon (១៥ កើត) as Buddhist observance day', () => {
    // 2026-05-01 is Visak Bochea (15 Waxing of Pisakh)
    const testDate = new Date('2026-05-01T12:00:00Z');
    const result = KhmerLunarCalendarService.getKhmerDate(testDate);

    expect(result.day).toBe(15);
    expect(result.moonPhase).toBe('waxing');
    expect(result.isObservanceDay).toBe(true);
    expect(result.observanceType).toBe('15-waxing');
  });

  it('correctly calculates waning (រនោច) date and 15 waning Sil day', () => {
    // Pchum Ben 2026 is 2026-10-11 (15 Waning of Phatrabot)
    const testDate = new Date('2026-10-11T12:00:00Z');
    const result = KhmerLunarCalendarService.getKhmerDate(testDate);

    expect(result.day).toBe(15);
    expect(result.moonPhase).toBe('waning');
    expect(result.isObservanceDay).toBe(true);
    expect(result.observanceType).toBe('end-waning');
  });

  it('generates full monthly calendar grid with weekday offsets', () => {
    const monthData = KhmerLunarCalendarService.getCalendarMonth(2026, 9); // October 2026

    expect(monthData.gregorianYear).toBe(2026);
    expect(monthData.gregorianMonth).toBe(9);
    expect(monthData.totalDaysInMonth).toBe(31);
    expect(monthData.days.length).toBeGreaterThanOrEqual(31);
    expect(monthData.lunarMonthNames.length).toBeGreaterThan(0);
  });

  it('formats full Khmer string properly in Khmer and English', () => {
    const testDate = new Date('2026-10-13T12:00:00Z');
    const info = KhmerLunarCalendarService.getKhmerDate(testDate);

    const kmString = KhmerLunarCalendarService.formatKhmerString(info, 'km');
    expect(kmString).toContain('ថ្ងៃអង្គារ');
    expect(kmString).toContain('២ កើត');
    expect(kmString).toContain('ខែអស្សុជ');

    const enString = KhmerLunarCalendarService.formatKhmerString(info, 'en');
    expect(enString).toContain('Tuesday');
    expect(enString).toContain('Waxing');
  });
});
