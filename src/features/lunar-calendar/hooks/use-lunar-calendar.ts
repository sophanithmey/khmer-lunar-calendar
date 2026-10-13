import { useState, useMemo, useCallback } from 'react';
import { KhmerLunarCalendarService } from '../services/lunar-calendar-service';
import type { CalendarMonthData, KhmerDayInfo } from '../types/lunar-date.types';

export function useLunarCalendar(initialDate: Date = new Date()) {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [viewYear, setViewYear] = useState<number>(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(initialDate.getMonth());

  const monthData: CalendarMonthData = useMemo(() => {
    return KhmerLunarCalendarService.getCalendarMonth(viewYear, viewMonth);
  }, [viewYear, viewMonth]);

  const selectedDateInfo: KhmerDayInfo = useMemo(() => {
    return KhmerLunarCalendarService.getKhmerDate(selectedDate);
  }, [selectedDate]);

  const goToPrevMonth = useCallback(() => {
    setViewMonth((prevMonth) => {
      if (prevMonth === 0) {
        setViewYear((prevYear) => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setViewMonth((prevMonth) => {
      if (prevMonth === 11) {
        setViewYear((prevYear) => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  }, []);

  const goToToday = useCallback(() => {
    const today = new Date();
    setSelectedDate(today);
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
  }, []);

  const selectDate = useCallback((date: Date) => {
    setSelectedDate(date);
    setViewYear(date.getFullYear());
    setViewMonth(date.getMonth());
  }, []);

  return {
    selectedDate,
    selectedDateInfo,
    viewYear,
    viewMonth,
    monthData,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    selectDate
  };
}
