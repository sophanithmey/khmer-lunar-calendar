import { toKhmerNumeral } from '../features/lunar-calendar/utils/khmer-numerals';
import type { Language } from '../types/common.types';

export const SOLAR_MONTHS_KM = [
  'មករា',
  'កុម្ភៈ',
  'មីនា',
  'មេសា',
  'ឧសភា',
  'មិថុនា',
  'កក្កដា',
  'សីហា',
  'កញ្ញា',
  'តុលា',
  'វិច្ឆិកា',
  'ធ្នូ'
];

export const SOLAR_MONTHS_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const DAYS_OF_WEEK_KM = [
  'អាទិត្យ',
  'ច័ន្ទ',
  'អង្គារ',
  'ពុធ',
  'ព្រហស្បតិ៍',
  'សុក្រ',
  'សៅរ៍'
];

export const DAYS_OF_WEEK_EN = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export interface KhmerTimeInfo {
  hours12: number;
  minutes: number;
  seconds: number;
  periodKm: string;
  periodEn: string;
  daytimeCategoryKm: string;
  daytimeCategoryEn: string;
  formattedTimeKm: string;
  formattedTimeWithSecondsKm: string;
  formattedTimeEn: string;
  formattedTimeWithSecondsEn: string;
}

/**
 * Returns Khmer daytime category and period for a given date/time.
 * - 00:00 - 05:59: ពេលរំលងអធ្រាត្រ / ទៀបភ្លឺ (Early Morning / Dawn)
 * - 06:00 - 11:59: ពេលព្រឹក (Morning)
 * - 12:00 - 12:59: ពេលថ្ងៃត្រង់ (Midday / Noon)
 * - 13:00 - 17:59: ពេលរសៀល (Afternoon)
 * - 18:00 - 20:59: ពេលល្ងាច (Evening)
 * - 21:00 - 23:59: ពេលយប់ (Night)
 */
export function getKhmerDayPeriod(date: Date): {
  periodKm: string;
  periodEn: string;
  daytimeCategoryKm: string;
  daytimeCategoryEn: string;
} {
  const h24 = date.getHours();

  if (h24 >= 0 && h24 < 6) {
    return {
      periodKm: 'រំលងអធ្រាត្រ',
      periodEn: 'AM',
      daytimeCategoryKm: 'ពេលរំលងអធ្រាត្រ',
      daytimeCategoryEn: 'Dawn'
    };
  }
  if (h24 >= 6 && h24 < 12) {
    return {
      periodKm: 'ព្រឹក',
      periodEn: 'AM',
      daytimeCategoryKm: 'ពេលព្រឹក',
      daytimeCategoryEn: 'Morning'
    };
  }
  if (h24 === 12) {
    return {
      periodKm: 'ថ្ងៃត្រង់',
      periodEn: 'PM',
      daytimeCategoryKm: 'ពេលថ្ងៃត្រង់',
      daytimeCategoryEn: 'Midday'
    };
  }
  if (h24 > 12 && h24 < 18) {
    return {
      periodKm: 'រសៀល',
      periodEn: 'PM',
      daytimeCategoryKm: 'ពេលរសៀល',
      daytimeCategoryEn: 'Afternoon'
    };
  }
  if (h24 >= 18 && h24 < 21) {
    return {
      periodKm: 'ល្ងាច',
      periodEn: 'PM',
      daytimeCategoryKm: 'ពេលល្ងាច',
      daytimeCategoryEn: 'Evening'
    };
  }
  return {
    periodKm: 'យប់',
    periodEn: 'PM',
    daytimeCategoryKm: 'ពេលយប់',
    daytimeCategoryEn: 'Night'
  };
}

/**
 * Returns formatted time information in Khmer and English with daytime category.
 */
export function getKhmerTimeInfo(date: Date = new Date()): KhmerTimeInfo {
  const h24 = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const { periodKm, periodEn, daytimeCategoryKm, daytimeCategoryEn } = getKhmerDayPeriod(date);

  const hours12 = h24 % 12 || 12;
  const hKm = toKhmerNumeral(String(hours12).padStart(2, '0'));
  const mKm = toKhmerNumeral(String(minutes).padStart(2, '0'));
  const sKm = toKhmerNumeral(String(seconds).padStart(2, '0'));

  const hEn = String(hours12).padStart(2, '0');
  const mEn = String(minutes).padStart(2, '0');
  const sEn = String(seconds).padStart(2, '0');

  return {
    hours12,
    minutes,
    seconds,
    periodKm,
    periodEn,
    daytimeCategoryKm,
    daytimeCategoryEn,
    formattedTimeKm: `ម៉ោង ${hKm}:${mKm} ${periodKm}`,
    formattedTimeWithSecondsKm: `ម៉ោង ${hKm}:${mKm}:${sKm} ${periodKm}`,
    formattedTimeEn: `${hEn}:${mEn} ${periodEn}`,
    formattedTimeWithSecondsEn: `${hEn}:${mEn}:${sEn} ${periodEn}`
  };
}

/**
 * Format Gregorian date in Khmer (e.g. "ថ្ងៃអង្គារ ទី១៣ ខែតុលា ឆ្នាំ២០២៦").
 */
export function getKhmerSolarDateString(date: Date, lang: Language = 'km'): string {
  const dayOfWeekIndex = date.getDay();
  const dayOfMonth = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  if (lang === 'km') {
    const dayOfWeekKm = DAYS_OF_WEEK_KM[dayOfWeekIndex] ?? '';
    const dayKm = toKhmerNumeral(dayOfMonth);
    const monthKm = SOLAR_MONTHS_KM[monthIndex] ?? '';
    const yearKm = toKhmerNumeral(year);
    return `ថ្ងៃ${dayOfWeekKm} ទី${dayKm} ខែ${monthKm} ឆ្នាំ${yearKm}`;
  }

  const dayOfWeekEn = DAYS_OF_WEEK_EN[dayOfWeekIndex] ?? '';
  const monthEn = SOLAR_MONTHS_EN[monthIndex] ?? '';
  return `${dayOfWeekEn}, ${dayOfMonth} ${monthEn} ${year}`;
}
