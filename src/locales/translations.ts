import { kmTranslations } from './km';
import { enTranslations } from './en';
import type { Language } from '../types/common.types';
import type { Translations } from '../types/translations.types';

export const translations: Record<Language, Translations> = {
  km: kmTranslations,
  en: enTranslations
};

export const getTranslation = (lang: Language): Translations => {
  return translations[lang] ?? kmTranslations;
};
