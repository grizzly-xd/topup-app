import { z } from 'zod';
import { isValidAmount } from '@/utils/currency';

export const PRESET_AMOUNTS = [10_000, 20_000, 25_000, 50_000, 100_000, 200_000, 500_000, 1_000_000] as const;

export function buildTopupSchema(min: number, max: number) {
  return z.object({
    amount: z
      .number({ invalid_type_error: 'Nominal harus berupa angka.' })
      .refine((v) => Number.isFinite(v), 'Nominal tidak valid.')
      .refine((v) => v > 0, 'Nominal harus lebih besar dari nol.')
      .refine((v) => isValidAmount(v, min, max), `Nominal harus antara ${min} dan ${max}.`),
  });
}
export type TopupForm = z.infer<ReturnType<typeof buildTopupSchema>>;
