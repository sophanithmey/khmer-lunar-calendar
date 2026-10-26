import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { kmTranslations } from '../locales/km';
import { enTranslations } from '../locales/en';

describe('PWA Configuration and Localization', () => {
  it('has matching PWA keys in both Khmer and English dictionaries', () => {
    const kmKeys = Object.keys(kmTranslations.pwa).sort();
    const enKeys = Object.keys(enTranslations.pwa).sort();

    expect(kmKeys).toEqual(enKeys);
    expect(kmKeys.length).toBeGreaterThanOrEqual(10);
  });

  it('uses authentic Khmer vocabulary for PWA installation and offline states', () => {
    expect(kmTranslations.pwa.installApp).toBe('ដំឡើងកម្មវិធី');
    expect(kmTranslations.pwa.installBtn).toBe('ដំឡើងឥឡូវនេះ');
    expect(kmTranslations.pwa.offlineBadge).toBe('ដំណើរការក្រៅបណ្តាញ');
    expect(kmTranslations.pwa.offlineNotice).toContain('ក្រៅបណ្តាញ');
    expect(kmTranslations.pwa.offlineNotice).toContain('ចន្ទគតិ');
    expect(kmTranslations.pwa.iosInstallTitle).toContain('iPhone / iPad');
    expect(kmTranslations.pwa.iosInstallInstruction).toContain('បន្ថែមលើអេក្រង់ដើម');
  });

  it('verifies that all required PWA icon assets exist in the public directory', () => {
    const publicDir = path.resolve(process.cwd(), 'public');
    const requiredAssets = [
      'moon-icon.svg',
      'pwa-192x192.png',
      'pwa-512x512.png',
      'maskable-icon-512x512.png',
      'maskable-icon-192x192.png',
      'apple-touch-icon.png'
    ];

    for (const asset of requiredAssets) {
      const assetPath = path.join(publicDir, asset);
      expect(fs.existsSync(assetPath), `Asset ${asset} must exist in public/`).toBe(true);
      const stat = fs.statSync(assetPath);
      expect(stat.size, `Asset ${asset} should not be empty`).toBeGreaterThan(100);
    }
  });
});
