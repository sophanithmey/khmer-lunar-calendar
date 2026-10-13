import { KHMER_FESTIVALS } from '../data/festivals';
import type { FestivalItem, FestivalCategory } from '../types/festival.types';

export class FestivalService {
  public static getAll(): FestivalItem[] {
    return [...KHMER_FESTIVALS];
  }

  public static filter(query: string, category: FestivalCategory | 'all'): FestivalItem[] {
    const q = query.trim().toLowerCase();
    return KHMER_FESTIVALS.filter((item) => {
      const matchesCategory = category === 'all' || item.category === category;
      if (!matchesCategory) return false;
      if (!q) return true;

      return (
        item.nameKm.toLowerCase().includes(q) ||
        item.nameEn.toLowerCase().includes(q) ||
        item.descriptionKm.toLowerCase().includes(q) ||
        item.descriptionEn.toLowerCase().includes(q)
      );
    });
  }

  public static getHolidayOnly(): FestivalItem[] {
    return KHMER_FESTIVALS.filter((item) => item.isPublicHoliday);
  }
}
