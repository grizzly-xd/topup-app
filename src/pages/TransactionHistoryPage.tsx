import { useCallback, useEffect, useState } from 'react';
import { listTopups } from '@/services/topupService';
import type { Transaction, TransactionFilters } from '@/types/transaction';
import type { TopupStatus } from '@/types/topup';
import { TransactionCard } from '@/components/TransactionCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { Button } from '@/components/ui/Button';
import { extractApiMessage } from '@/utils/errors';

const STATUS_OPTIONS: Array<{ v: TransactionFilters['status']; label: string }> = [
  { v: 'ALL', label: 'Semua' },
  { v: 'PENDING', label: 'Menunggu' },
  { v: 'PROCESSING', label: 'Diproses' },
  { v: 'SUCCESS', label: 'Berhasil' },
  { v: 'FAILED', label: 'Gagal' },
  { v: 'EXPIRED', label: 'Kedaluwarsa' },
  { v: 'CANCELED', label: 'Dibatalkan' },
];

export function TransactionHistoryPage() {
  const [filters, setFilters] = useState<TransactionFilters>({ status: 'ALL', page: 1, pageSize: 10 });
  const [data, setData] = useState<{ items: Transaction[]; total: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await listTopups(filters);
      setData({ items: res.items, total: res.total });
    } catch (e) {
      setError(extractApiMessage(e, 'Gagal memuat riwayat transaksi.'));
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { void load(); }, [load]);

  const totalPages = data ? Math.max(1, Math.ceil(data.total / (filters.pageSize ?? 10))) : 1;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Riwayat Transaksi</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Semua transaksi top up Anda.</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={filters.status ?? 'ALL'}
          onChange={(e) =>
            setFilters((f) => ({ ...f, status: e.target.value as TopupStatus | 'ALL', page: 1 }))
          }
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.v} value={o.v}>{o.label}</option>
          ))}
        </select>
        <input
          type="date"
          value={filters.from ?? ''}
          onChange={(e) => setFilters((f) => ({ ...f, from: e.target.value || undefined, page: 1 }))}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
        <input
          type="date"
          value={filters.to ?? ''}
          onChange={(e) => setFilters((f) => ({ ...f, to: e.target.value || undefined, page: 1 }))}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
      </div>

      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : loading ? (
        <div className="space-y-3">
          <LoadingSkeleton className="h-20" />
          <LoadingSkeleton className="h-20" />
          <LoadingSkeleton className="h-20" />
        </div>
      ) : !data || data.items.length === 0 ? (
        <EmptyState title="Belum ada transaksi" description="Transaksi akan muncul di sini." />
      ) : (
        <>
          <div className="space-y-3">
            {data.items.map((t) => <TransactionCard key={t.id} tx={t} />)}
          </div>
          <div className="flex items-center justify-between">
            <Button
              variant="secondary"
              disabled={(filters.page ?? 1) <= 1}
              onClick={() => setFilters((f) => ({ ...f, page: Math.max(1, (f.page ?? 1) - 1) }))}
            >
              Sebelumnya
            </Button>
            <p className="text-sm text-slate-500">
              Halaman {filters.page ?? 1} dari {totalPages}
            </p>
            <Button
              variant="secondary"
              disabled={(filters.page ?? 1) >= totalPages}
              onClick={() => setFilters((f) => ({ ...f, page: (f.page ?? 1) + 1 }))}
            >
              Berikutnya
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
