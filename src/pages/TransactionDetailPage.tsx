import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTopupDetail } from '@/services/topupService';
import type { TransactionDetail } from '@/types/transaction';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TransactionStatusBadge } from '@/components/TransactionStatusBadge';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorState } from '@/components/ErrorState';
import { formatIDR } from '@/utils/currency';
import { formatDateTime } from '@/utils/date';
import { extractApiMessage } from '@/utils/errors';

export function TransactionDetailPage() {
  const { id = '' } = useParams();
  const [data, setData] = useState<TransactionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await getTopupDetail(id));
    } catch (e) {
      setError(extractApiMessage(e, 'Gagal memuat detail transaksi.'));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { void load(); }, [load]);

  if (loading) {
    return <div className="flex justify-center py-12"><Spinner className="h-8 w-8 text-brand-600" /></div>;
  }
  if (error || !data) {
    return <ErrorState message={error ?? 'Transaksi tidak ditemukan.'} onRetry={load} />;
  }

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <Card className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Detail Transaksi</p>
          <TransactionStatusBadge status={data.status} />
        </div>
        <p className="text-xs text-slate-500">{data.orderId}</p>
      </Card>

      <Card className="space-y-2 text-sm">
        <Row label="Nominal" value={formatIDR(data.amount)} />
        <Row label="Biaya admin" value={formatIDR(data.adminFee)} />
        <Row label="Total pembayaran" value={formatIDR(data.total)} bold />
        <Row label="Dibuat" value={formatDateTime(data.createdAt)} />
        <Row label="Dibayar" value={formatDateTime(data.paidAt)} />
        <Row label="Metode" value={data.paymentMethod ?? '-'} />
      </Card>

      {data.instructions && (
        <Card>
          <p className="text-sm font-medium">Instruksi Pembayaran</p>
          <pre className="mt-2 whitespace-pre-wrap text-xs text-slate-600 dark:text-slate-300">{data.instructions}</pre>
        </Card>
      )}

      {data.failureReason && (
        <Card className="bg-rose-50 text-sm text-rose-700 dark:bg-rose-900/30 dark:text-rose-200">
          Alasan: {data.failureReason}
        </Card>
      )}

      <Button variant="secondary" onClick={load}>Periksa Status</Button>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-500">{label}</span>
      <span className={bold ? 'font-semibold' : 'font-medium'}>{value}</span>
    </div>
  );
}
