export type Language = 'km' | 'en';

export interface NavItem {
  id: string;
  path: string;
  labelKm: string;
  labelEn: string;
}

export interface GregorianDateParts {
  year: number;
  month: number;
  day: number;
}
