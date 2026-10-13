import { useMemo } from 'react';
import { KhmerLunarCalendarService } from '../services/lunar-calendar-service';
import type { KhmerDayInfo } from '../types/lunar-date.types';

export function useLunarDate(date: Date): KhmerDayInfo {
  return useMemo(() => {
    return KhmerLunarCalendarService.getKhmerDate(date);
  }, [date.getFullYear(), date.getMonth(), date.getDate()]);
}
