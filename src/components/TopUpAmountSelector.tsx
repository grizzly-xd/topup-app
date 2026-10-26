import { Controller, type Control } from 'react-hook-form';
import type { TopupForm } from '@/schemas/topupSchema';
import { PRESET_AMOUNTS } from '@/schemas/topupSchema';
import { formatIDR } from '@/utils/currency';
import { cn } from '@/utils/cn';
import { Input } from './ui/Input';

interface Props {
  control: Control<TopupForm>;
  error?: string;
  allowManual?: boolean;
}

export function TopUpAmountSelector({ control, error, allowManual = true }: Props) {
  return (
    <Controller
      control={control}
      name="amount"
      render={({ field }) => (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {PRESET_AMOUNTS.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => field.onChange(v)}
                className={cn(
                  'rounded-xl border px-3 py-3 text-sm font-medium transition',
                  field.value === v
                    ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200'
                    : 'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800'
                )}
              >
                {formatIDR(v)}
              </button>
            ))}
          </div>

          {allowManual && (
            <Input
              label="Atau masukkan nominal lain"
              name="amount-manual"
              type="number"
              inputMode="numeric"
              placeholder="Contoh: 75000"
              value={Number.isFinite(field.value) && field.value > 0 ? field.value : ''}
              onChange={(e) => {
                const n = Number(e.target.value);
                field.onChange(Number.isFinite(n) ? n : 0);
              }}
              error={error}
            />
          )}
          {!allowManual && error && <p className="text-xs text-rose-600">{error}</p>}
        </div>
      )}
    />
  );
}
