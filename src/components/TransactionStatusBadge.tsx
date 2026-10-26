import type { TopupStatus } from '@/types/topup';
import { cn } from '@/utils/cn';

const map: Record<TopupStatus, { label: string; cls: string }> = {
  PENDING: { label: 'Menunggu Pembayaran', cls: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200' },
  PROCESSING: { label: 'Diproses', cls: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200' },
  SUCCESS: { label: 'Berhasil', cls: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200' },
  FAILED: { label: 'Gagal', cls: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200' },
  EXPIRED: { label: 'Kedaluwarsa', cls: 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
  CANCELED: { label: 'Dibatalkan', cls: 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
};

export function TransactionStatusBadge({ status }: { status: TopupStatus }) {
  const s = map[status] ?? map.PENDING;
  return <span className={cn('inline-flex rounded-full px-2.5 py-1 text-xs font-medium', s.cls)}>{s.label}</span>;
}
