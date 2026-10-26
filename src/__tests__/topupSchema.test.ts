import { describe, it, expect } from 'vitest';
import { buildTopupSchema } from '@/schemas/topupSchema';

const schema = buildTopupSchema(10_000, 1_000_000);

describe('topupSchema', () => {
  it('accepts valid amount', () => {
    expect(schema.safeParse({ amount: 50_000 }).success).toBe(true);
  });
  it('rejects zero', () => {
    expect(schema.safeParse({ amount: 0 }).success).toBe(false);
  });
  it('rejects negative', () => {
    expect(schema.safeParse({ amount: -10 }).success).toBe(false);
  });
  it('rejects non-number', () => {
    expect(schema.safeParse({ amount: '50000' }).success).toBe(false);
  });
  it('rejects below min', () => {
    expect(schema.safeParse({ amount: 5_000 }).success).toBe(false);
  });
  it('rejects above max', () => {
    expect(schema.safeParse({ amount: 5_000_000 }).success).toBe(false);
  });
});
