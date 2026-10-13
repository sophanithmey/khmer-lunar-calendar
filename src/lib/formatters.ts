import { toKhmerNumeral } from '../features/lunar-calendar/utils/khmer-numerals';
import type { Language } from '../types/common.types';

const KHMER_MONTHS_SOLAR = [
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

const ENGLISH_MONTHS_SOLAR = [
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

export function formatSolarDate(date: Date, lang: Language): string {
  const day = date.getDate();
  const monthIdx = date.getMonth();
  const year = date.getFullYear();

  if (lang === 'km') {
    const kmDay = toKhmerNumeral(day);
    const kmMonth = KHMER_MONTHS_SOLAR[monthIdx];
    const kmYear = toKhmerNumeral(year);
    return `ថ្ងៃទី${kmDay} ខែ${kmMonth} ឆ្នាំ${kmYear}`;
  }

  const enMonth = ENGLISH_MONTHS_SOLAR[monthIdx];
  return `${day} ${enMonth} ${year}`;
}

export function formatShortSolarDate(date: Date, lang: Language): string {
  const day = date.getDate();
  const monthIdx = date.getMonth();

  if (lang === 'km') {
    const kmDay = toKhmerNumeral(day);
    const kmMonth = KHMER_MONTHS_SOLAR[monthIdx];
    return `ថ្ងៃទី${kmDay} ខែ${kmMonth}`;
  }

  const enMonth = ENGLISH_MONTHS_SOLAR[monthIdx]?.slice(0, 3) ?? '';
  return `${enMonth} ${day}`;
}

export function formatIllumination(fraction: number, lang: Language): string {
  const pct = (fraction * 100).toFixed(1);
  if (lang === 'km') {
    return `${toKhmerNumeral(pct)}%`;
  }
  return `${pct}%`;
}

export function formatDistanceKm(km: number, lang: Language): string {
  const rounded = Math.round(km);
  const formatted = rounded.toLocaleString('en-US');
  if (lang === 'km') {
    return `${toKhmerNumeral(formatted)} គ.ម`;
  }
  return `${formatted} km`;
}
