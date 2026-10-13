export type FestivalCategory = 'buddhist' | 'national' | 'observance';

export interface FestivalItem {
  id: string;
  nameKm: string;
  nameEn: string;
  descriptionKm: string;
  descriptionEn: string;
  category: FestivalCategory;
  isPublicHoliday: boolean;
  lunarRuleKm?: string;
  lunarRuleEn?: string;
  solarMonth?: number;
  solarDay?: number;
  khmerMonthIndex?: number;
  khmerMoonPhase?: 'waxing' | 'waning';
  khmerDay?: number;
}
