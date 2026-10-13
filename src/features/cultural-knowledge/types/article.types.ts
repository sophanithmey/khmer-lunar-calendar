export interface CulturalArticle {
  id: string;
  titleKm: string;
  titleEn: string;
  summaryKm: string;
  summaryEn: string;
  contentKm: string[];
  contentEn: string[];
  categoryKm: string;
  categoryEn: string;
  readTimeMinutes: number;
}
