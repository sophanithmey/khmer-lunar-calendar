import { useState, useCallback } from 'react';
import { KhmerLunarCalendarService } from '../../lunar-calendar/services/lunar-calendar-service';
import type { KhmerDayInfo } from '../../lunar-calendar/types/lunar-date.types';
import { formatIsoDate, parseIsoDate } from '../../../lib/date-utils';

export function useDateConverter(defaultDate: Date = new Date()) {
  const defaultIso = formatIsoDate(defaultDate);
  const [dateInput, setDateInput] = useState<string>(defaultIso);
  const [result, setResult] = useState<KhmerDayInfo | null>(() => {
    return KhmerLunarCalendarService.getKhmerDate(defaultDate);
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const convertDate = useCallback((isoStr: string) => {
    if (!isoStr || !/^\d{4}-\d{2}-\d{2}$/.test(isoStr)) {
      setErrorMessage('invalid_date');
      setResult(null);
      return;
    }

    try {
      const parsed = parseIsoDate(isoStr);
      if (isNaN(parsed.getTime())) {
        setErrorMessage('invalid_date');
        setResult(null);
        return;
      }
      const khmerInfo = KhmerLunarCalendarService.getKhmerDate(parsed);
      setResult(khmerInfo);
      setErrorMessage(null);
    } catch {
      setErrorMessage('calculation_error');
      setResult(null);
    }
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setDateInput(value);
    setErrorMessage(null);
  }, []);

  const handleReset = useCallback(() => {
    const today = new Date();
    const iso = formatIsoDate(today);
    setDateInput(iso);
    setResult(KhmerLunarCalendarService.getKhmerDate(today));
    setErrorMessage(null);
  }, []);

  return {
    dateInput,
    result,
    errorMessage,
    handleInputChange,
    convertDate,
    handleReset
  };
}
