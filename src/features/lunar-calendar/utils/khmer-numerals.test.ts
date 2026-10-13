import { describe, it, expect } from 'vitest';
import { toKhmerNumeral, fromKhmerNumeral } from './khmer-numerals';

describe('Khmer Numerals Utility', () => {
  it('converts single Arabic digits to Khmer numerals', () => {
    expect(toKhmerNumeral(0)).toBe('០');
    expect(toKhmerNumeral(1)).toBe('១');
    expect(toKhmerNumeral(8)).toBe('៨');
    expect(toKhmerNumeral(9)).toBe('៩');
  });

  it('converts multi-digit numbers to Khmer numerals', () => {
    expect(toKhmerNumeral(15)).toBe('១៥');
    expect(toKhmerNumeral(2026)).toBe('២០២៦');
    expect(toKhmerNumeral(2570)).toBe('២៥៧០');
  });

  it('converts Khmer numerals back to Arabic numbers', () => {
    expect(fromKhmerNumeral('១៥')).toBe(15);
    expect(fromKhmerNumeral('២០២៦')).toBe(2026);
    expect(fromKhmerNumeral('៨')).toBe(8);
  });
});
