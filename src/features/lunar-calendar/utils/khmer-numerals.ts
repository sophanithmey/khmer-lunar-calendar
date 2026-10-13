const KHMER_DIGITS = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'] as const;

export function toKhmerNumeral(value: number | string): string {
  const str = String(value);
  return str.replace(/\d/g, (digit) => KHMER_DIGITS[parseInt(digit, 10)] ?? digit);
}

export function fromKhmerNumeral(str: string): number {
  const english = str.replace(/[០-៩]/g, (khChar) => {
    const idx = KHMER_DIGITS.indexOf(khChar as (typeof KHMER_DIGITS)[number]);
    return idx >= 0 ? String(idx) : khChar;
  });
  return parseInt(english, 10);
}
