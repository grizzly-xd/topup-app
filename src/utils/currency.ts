const idrFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

export const formatIDR = (value: number): string =>
  Number.isFinite(value) ? idrFormatter.format(value) : '-';

export const isValidAmount = (value: unknown, min: number, max: number): boolean => {
  if (typeof value !== 'number' || !Number.isFinite(value)) return false;
  if (!Number.isInteger(value)) return false;
  return value >= min && value <= max && value > 0;
};
