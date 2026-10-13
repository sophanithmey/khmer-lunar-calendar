import * as Astronomy from 'astronomy-engine';
import type { MoonAstronomyInfo } from '../types/astronomy.types';

export class AstronomyService {
  private static readonly AU_IN_KM = 149597870.7;
  private static readonly SYNODIC_MONTH_DAYS = 29.530588853;

  /**
   * Calculate precise Moon astronomical position and illumination for a given date.
   */
  public static getMoonAstronomy(date: Date): MoonAstronomyInfo {
    const phaseDeg = Astronomy.MoonPhase(date);
    const illum = Astronomy.Illumination(Astronomy.Body.Moon, date);
    const fraction = illum.phase_fraction;
    const distanceKm = illum.geo_dist * this.AU_IN_KM;

    // Approximate moon age in days based on phase degrees (0 deg = 0 days, 360 deg = 29.53 days)
    const moonAgeDays = (phaseDeg / 360) * this.SYNODIC_MONTH_DAYS;

    // Search next Full Moon (180 deg) and New Moon (0 deg)
    const nextFullEvent = Astronomy.SearchMoonPhase(180, date, 45);
    const nextNewEvent = Astronomy.SearchMoonPhase(0, date, 45);

    const nextFullMoon = nextFullEvent
      ? nextFullEvent.date
      : new Date(date.getTime() + 14 * 86400000);
    const nextNewMoon = nextNewEvent ? nextNewEvent.date : new Date(date.getTime() + 28 * 86400000);

    const { phaseNameKm, phaseNameEn } = this.resolvePhaseName(phaseDeg);

    return {
      phaseDegrees: phaseDeg,
      phaseFraction: fraction,
      illuminationPct: Math.round(fraction * 1000) / 10,
      phaseNameKm,
      phaseNameEn,
      moonAgeDays: Math.round(moonAgeDays * 10) / 10,
      distanceKm: Math.round(distanceKm),
      nextFullMoon,
      nextNewMoon
    };
  }

  private static resolvePhaseName(deg: number): { phaseNameKm: string; phaseNameEn: string } {
    if (deg >= 355 || deg < 5) {
      return { phaseNameKm: 'ដាច់ខែ (ងងឹតខែ)', phaseNameEn: 'New Moon' };
    }
    if (deg >= 5 && deg < 85) {
      return { phaseNameKm: 'ព្រះចន្ទចំណិតខាងកើត', phaseNameEn: 'Waxing Crescent' };
    }
    if (deg >= 85 && deg < 95) {
      return { phaseNameKm: 'ព្រះចន្ទកន្លះដួងខាងកើត', phaseNameEn: 'First Quarter' };
    }
    if (deg >= 95 && deg < 175) {
      return { phaseNameKm: 'ព្រះចន្ទជិតពេញវង់', phaseNameEn: 'Waxing Gibbous' };
    }
    if (deg >= 175 && deg < 185) {
      return { phaseNameKm: 'ពេញបូណ៌មី', phaseNameEn: 'Full Moon' };
    }
    if (deg >= 185 && deg < 265) {
      return { phaseNameKm: 'ព្រះចន្ទចាប់ស្រកខាងរោច', phaseNameEn: 'Waning Gibbous' };
    }
    if (deg >= 265 && deg < 275) {
      return { phaseNameKm: 'ព្រះចន្ទកន្លះដួងខាងរោច', phaseNameEn: 'Last Quarter' };
    }
    return { phaseNameKm: 'ព្រះចន្ទចំណិតខាងរោច', phaseNameEn: 'Waning Crescent' };
  }
}
