import momentkh from '@thyrith/momentkh';
import type {
  KhmerDayInfo,
  CalendarMonthData,
  MoonPhaseType,
  ObservanceType
} from '../types/lunar-date.types';
import {
  KHMER_MONTH_NAMES_EN,
  ANIMAL_YEAR_NAMES_EN,
  SAK_NAMES_EN,
  DAY_OF_WEEK_NAMES_EN
} from '../constants/calendar-names';
import { KHMER_FESTIVALS } from '../../festivals/data/festivals';
import { toKhmerNumeral } from '../utils/khmer-numerals';
import type { Language } from '../../../types/common.types';
import { addDays } from '../../../lib/date-utils';

export class KhmerLunarCalendarService {
  /**
   * Convert Gregorian Date to traditional Khmer lunar date info.
   */
  public static getKhmerDate(date: Date): KhmerDayInfo {
    const raw = momentkh.fromDate(date);
    const kh = raw.khmer;

    const isWaxing = kh.moonPhase === 0;
    const moonPhase: MoonPhaseType = isWaxing ? 'waxing' : 'waning';
    const day = kh.day;
    const monthIndex = kh.monthIndex;

    // Determine if this is an observance day (ថ្ងៃសីល)
    let isObservance = false;
    let observanceType: ObservanceType | undefined;

    if (isWaxing) {
      if (day === 8) {
        isObservance = true;
        observanceType = '8-waxing';
      } else if (day === 15) {
        isObservance = true;
        observanceType = '15-waxing';
      }
    } else {
      if (day === 8) {
        isObservance = true;
        observanceType = '8-waning';
      } else {
        // Check if 15 waning or if 14 waning is the last day of the lunar month
        const tomorrow = addDays(date, 1);
        const tomorrowRaw = momentkh.fromDate(tomorrow);
        const isLastDay = tomorrowRaw.khmer.moonPhase === 0;
        if (day === 15 || (day === 14 && isLastDay)) {
          isObservance = true;
          observanceType = 'end-waning';
        }
      }
    }

    // Match festivals
    const festivalNames: string[] = [];
    for (const fest of KHMER_FESTIVALS) {
      if (
        fest.khmerMonthIndex !== undefined &&
        fest.khmerMoonPhase !== undefined &&
        fest.khmerDay !== undefined
      ) {
        if (
          fest.khmerMonthIndex === monthIndex &&
          fest.khmerMoonPhase === moonPhase &&
          fest.khmerDay === day
        ) {
          festivalNames.push(fest.nameKm);
        }
      } else if (fest.solarMonth !== undefined && fest.solarDay !== undefined) {
        if (fest.solarMonth === date.getMonth() + 1 && fest.solarDay === date.getDate()) {
          festivalNames.push(fest.nameKm);
        }
      }
    }

    return {
      day,
      moonPhase,
      moonPhaseNameKm: kh.moonPhaseName,
      moonPhaseNameEn: isWaxing ? 'Waxing' : 'Waning',
      monthIndex,
      monthNameKm: kh.monthName,
      monthNameEn: KHMER_MONTH_NAMES_EN[monthIndex] ?? kh.monthName,
      beYear: kh.beYear,
      jsYear: kh.jsYear,
      animalYearNameKm: kh.animalYearName,
      animalYearNameEn: ANIMAL_YEAR_NAMES_EN[kh.animalYear] ?? kh.animalYearName,
      sakNameKm: kh.sakName,
      sakNameEn: SAK_NAMES_EN[kh.sak] ?? kh.sakName,
      dayOfWeek: kh.dayOfWeek,
      dayOfWeekNameKm: kh.dayOfWeekName,
      dayOfWeekNameEn: DAY_OF_WEEK_NAMES_EN[kh.dayOfWeek] ?? kh.dayOfWeekName,
      gregorianDate: new Date(date),
      isObservanceDay: isObservance,
      observanceType,
      festivalNames
    };
  }

  /**
   * Generates calendar grid data for a given Gregorian month (0-indexed).
   */
  public static getCalendarMonth(year: number, monthZeroIndexed: number): CalendarMonthData {
    const totalDays = new Date(year, monthZeroIndexed + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, monthZeroIndexed, 1).getDay();

    const days: (KhmerDayInfo | null)[] = [];
    // Leading null slots for weekday offset
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    const lunarMonthNameSet = new Set<string>();

    for (let d = 1; d <= totalDays; d++) {
      const currentDate = new Date(year, monthZeroIndexed, d, 12, 0, 0);
      const info = this.getKhmerDate(currentDate);
      days.push(info);
      lunarMonthNameSet.add(info.monthNameKm);
    }

    return {
      gregorianYear: year,
      gregorianMonth: monthZeroIndexed,
      lunarMonthNames: Array.from(lunarMonthNameSet),
      days,
      totalDaysInMonth: totalDays,
      startDayOfWeek: firstDayOfWeek
    };
  }

  /**
   * Format the complete traditional Khmer string.
   */
  public static formatKhmerString(info: KhmerDayInfo, lang: Language): string {
    if (lang === 'km') {
      const dKm = toKhmerNumeral(info.day);
      const beKm = toKhmerNumeral(info.beYear);
      return `ថ្ងៃ${info.dayOfWeekNameKm} ${dKm} ${info.moonPhaseNameKm} ខែ${info.monthNameKm} ឆ្នាំ${info.animalYearNameKm} ${info.sakNameKm} ព.ស. ${beKm}`;
    }
    return `${info.dayOfWeekNameEn}, ${info.day} ${info.moonPhaseNameEn} of ${info.monthNameEn}, Year of the ${info.animalYearNameEn}, ${info.sakNameEn}, B.E. ${info.beYear}`;
  }
}
