import { describe, it, expect } from 'vitest';
import { formatIDR, isValidAmount } from '@/utils/currency';

describe('formatIDR', () => {
  it('formats integer rupiah', () => {
    expect(formatIDR(50_000)).toMatch(/50\.000/);
  });
  it('handles invalid values', () => {
    expect(formatIDR(Number.NaN)).toBe('-');
  });
});

describe('isValidAmount', () => {
  it('rejects negative', () => expect(isValidAmount(-1, 10_000, 1_000_000)).toBe(false));
  it('rejects zero', () => expect(isValidAmount(0, 10_000, 1_000_000)).toBe(false));
  it('rejects non-integer', () => expect(isValidAmount(10_500.5, 10_000, 1_000_000)).toBe(false));
  it('rejects below min', () => expect(isValidAmount(5_000, 10_000, 1_000_000)).toBe(false));
  it('rejects above max', () => expect(isValidAmount(2_000_000, 10_000, 1_000_000)).toBe(false));
  it('accepts valid', () => expect(isValidAmount(50_000, 10_000, 1_000_000)).toBe(true));
});
