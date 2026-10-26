import { Card } from './ui/Card';
import { formatIDR } from '@/utils/currency';

interface Props {
  amount: number;
  adminFee?: number | null;
  total?: number | null;
  note?: string;
}

export function PaymentSummary({ amount, adminFee, total, note }: Props) {
  return (
    <Card className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-slate-500 dark:text-slate-400">Nominal Top Up</span>
        <span className="font-medium">{formatIDR(amount)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-slate-500 dark:text-slate-400">Biaya Administrasi</span>
        <span className="font-medium">
          {adminFee == null ? 'Ditentukan backend' : formatIDR(adminFee)}
        </span>
      </div>
      <div className="my-2 h-px bg-slate-100 dark:bg-slate-800" />
      <div className="flex justify-between">
        <span className="font-semibold">Total Pembayaran</span>
        <span className="font-semibold text-brand-700 dark:text-brand-300">
          {total == null ? '—' : formatIDR(total)}
        </span>
      </div>
      {note && <p className="pt-1 text-xs text-slate-500 dark:text-slate-400">{note}</p>}
    </Card>
  );
}
