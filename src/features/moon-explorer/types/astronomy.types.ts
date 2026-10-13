export interface MoonAstronomyInfo {
  phaseDegrees: number;
  phaseFraction: number;
  illuminationPct: number;
  phaseNameKm: string;
  phaseNameEn: string;
  moonAgeDays: number;
  distanceKm: number;
  nextFullMoon: Date;
  nextNewMoon: Date;
}
