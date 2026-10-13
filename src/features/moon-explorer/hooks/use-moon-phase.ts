import { useMemo } from 'react';
import { AstronomyService } from '../services/astronomy-service';
import type { MoonAstronomyInfo } from '../types/astronomy.types';

export function useMoonPhase(date: Date): MoonAstronomyInfo {
  return useMemo(() => {
    return AstronomyService.getMoonAstronomy(date);
  }, [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours()]);
}
