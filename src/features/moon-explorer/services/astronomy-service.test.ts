import { describe, it, expect } from 'vitest';
import { AstronomyService } from './astronomy-service';

describe('AstronomyService', () => {
  it('calculates astronomical moon data for given date', () => {
    const testDate = new Date('2026-10-13T12:00:00Z');
    const result = AstronomyService.getMoonAstronomy(testDate);

    expect(result.phaseDegrees).toBeGreaterThanOrEqual(0);
    expect(result.phaseDegrees).toBeLessThan(360);
    expect(result.phaseFraction).toBeGreaterThanOrEqual(0);
    expect(result.phaseFraction).toBeLessThanOrEqual(1);
    expect(result.distanceKm).toBeGreaterThan(300000);
    expect(result.nextFullMoon.getTime()).toBeGreaterThan(testDate.getTime());
    expect(result.nextNewMoon.getTime()).toBeGreaterThan(testDate.getTime());
  });

  it('correctly formats illumination and phase names', () => {
    const testDate = new Date('2026-10-13T12:00:00Z');
    const result = AstronomyService.getMoonAstronomy(testDate);

    expect(result.phaseNameKm).toBeDefined();
    expect(result.phaseNameEn).toBeDefined();
    expect(result.moonAgeDays).toBeGreaterThan(0);
  });
});
