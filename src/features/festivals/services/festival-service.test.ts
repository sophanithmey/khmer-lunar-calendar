import { describe, it, expect } from 'vitest';
import { FestivalService } from './festival-service';

describe('FestivalService', () => {
  it('retrieves all Cambodian festivals', () => {
    const list = FestivalService.getAll();
    expect(list.length).toBeGreaterThan(5);
  });

  it('filters festivals by Buddhist category', () => {
    const buddhist = FestivalService.filter('', 'buddhist');
    expect(buddhist.every((f) => f.category === 'buddhist')).toBe(true);
    expect(buddhist.some((f) => f.id === 'visak-bochea')).toBe(true);
  });

  it('filters festivals by national category', () => {
    const national = FestivalService.filter('', 'national');
    expect(national.every((f) => f.category === 'national')).toBe(true);
    expect(national.some((f) => f.id === 'khmer-new-year')).toBe(true);
  });

  it('searches festivals by Khmer and English query keywords', () => {
    const searchKhmer = FestivalService.filter('ភ្ជុំបិណ្ឌ', 'all');
    expect(searchKhmer.length).toBe(1);
    expect(searchKhmer[0]?.id).toBe('pchum-ben');

    const searchEnglish = FestivalService.filter('Water', 'all');
    expect(searchEnglish.length).toBe(1);
    expect(searchEnglish[0]?.id).toBe('water-festival');
  });
});
