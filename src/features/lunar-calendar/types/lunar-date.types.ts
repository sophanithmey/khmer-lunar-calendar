export type MoonPhaseType = 'waxing' | 'waning';

export type ObservanceType = '8-waxing' | '15-waxing' | '8-waning' | 'end-waning';

export interface KhmerDayInfo {
  day: number;
  moonPhase: MoonPhaseType;
  moonPhaseNameKm: string;
  moonPhaseNameEn: string;
  monthIndex: number;
  monthNameKm: string;
  monthNameEn: string;
  beYear: number;
  jsYear: number;
  animalYearNameKm: string;
  animalYearNameEn: string;
  sakNameKm: string;
  sakNameEn: string;
  dayOfWeek: number;
  dayOfWeekNameKm: string;
  dayOfWeekNameEn: string;
  gregorianDate: Date;
  isObservanceDay: boolean;
  observanceType?: ObservanceType;
  festivalNames: string[];
}

export interface CalendarMonthData {
  gregorianYear: number;
  gregorianMonth: number;
  lunarMonthNames: string[];
  days: (KhmerDayInfo | null)[];
  totalDaysInMonth: number;
  startDayOfWeek: number;
}
