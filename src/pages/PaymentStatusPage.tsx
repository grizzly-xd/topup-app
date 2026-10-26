import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { RefreshCw, ArrowLeft, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { TransactionStatusBadge } from '@/components/TransactionStatusBadge';
import { Spinner } from '@/components/ui/Spinner';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { getTopupStatus, cancelTopup } from '@/services/topupService';
import type { TopupStatusResponse } from '@/types/topup';
import { extractApiMessage } from '@/utils/errors';
import { formatIDR } from '@/utils/currency';
import { formatDateTime } from '@/utils/date';
import { toast } from 'sonner';

// Polling terbatas: maksimal 6x dengan jeda 3 detik.
const MAX_POLLS = 6;
const POLL_MS = 3000;

export function PaymentStatusPage() {
  const { orderId = '' } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<TopupStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [polling, setPolling] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const pollCount = useRef(0);

  const fetchStatus = useCallback(async () => {
    setError(null);
    try {
      const res = await getTopupStatus(orderId);
      setData(res);
      return res;
    } catch (e) {
      setError(extractApiMessage(e, 'Gagal memeriksa status transaksi.'));
      return null;
    }
  }, [orderId]);

  useEffect(() => {
    if (!orderId) return;
    let cancelled = false;

    const run = async () => {
      setLoading(true);
      const first = await fetchStatus();
      if (cancelled) return;
      setLoading(false);

      // Hanya poll jika status belum final
      if (first && (first.status === 'PENDING' || first.status === 'PROCESSING')) {
        setPolling(true);
        while (!cancelled && pollCount.current < MAX_POLLS) {
          await new Promise((r) => setTimeout(r, POLL_MS));
          if (cancelled) return;
          pollCount.current += 1;
          const next = await fetchStatus();
          if (!next || next.status !== 'PENDING' && next.status !== 'PROCESSING') break;
        }
        setPolling(false);
      }
    };
    void run();
    return () => { cancelled = true; };
  }, [orderId, fetchStatus]);

  const onCancel = async () => {
    setCanceling(true);
    try {
      await cancelTopup(orderId);
      toast.success('Transaksi dibatalkan.');
      setConfirmCancel(false);
      await fetchStatus();
    } catch (e) {
      toast.error(extractApiMessage(e, 'Gagal membatalkan transaksi.'));
    } finally {
      setCanceling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner className="h-8 w-8 text-brand-600" />
      </div>
    );
  }

  if (error && !data) {
    return (
      <Card className="mx-auto max-w-xl space-y-3 text-center">
        <p className="text-sm text-rose-600">{error}</p>
        <div className="flex justify-center gap-2">
          <Button variant="secondary" onClick={() => void fetchStatus()}>Coba lagi</Button>
          <Link to="/dashboard"><Button variant="ghost">Ke Dashboard</Button></Link>
        </div>
      </Card>
    );
  }

  if (!data) return null;

  const canCancel = data.canCancel && (data.status === 'PENDING' || data.status === 'PROCESSING');

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <Card className="space-y-3 text-center">
        <p className="text-xs text-slate-500">Order ID</p>
        <p className="text-sm font-medium">{data.orderId}</p>
        <div className="flex justify-center">
          <TransactionStatusBadge status={data.status} />
        </div>
        {polling && (
          <p className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <Spinner className="h-3 w-3" /> Memeriksa status secara berkala...
          </p>
        )}
      </Card>

      <Card className="space-y-2 text-sm">
        <div className="flex justify-between"><span className="text-slate-500">Nominal</span><span className="font-medium">{formatIDR(data.amount)}</span></div>
        <div className="flex justify-between"><span className="text-slate-500">Biaya admin</span><span className="font-medium">{formatIDR(data.adminFee)}</span></div>
        <div className="flex justify-between"><span className="text-slate-500">Total</span><span className="font-semibold">{formatIDR(data.total)}</span></div>
        {data.paidAt && (
          <div className="flex justify-between"><span className="text-slate-500">Dibayar pada</span><span className="font-medium">{formatDateTime(data.paidAt)}</span></div>
        )}
        {data.failureReason && (
          <p className="rounded-lg bg-rose-50 p-2 text-xs text-rose-700 dark:bg-rose-900/30 dark:text-rose-200">
            Alasan: {data.failureReason}
          </p>
        )}
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => void fetchStatus()}>
          <RefreshCw className="h-4 w-4" /> Periksa Status
        </Button>
        <Button variant="ghost" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="h-4 w-4" /> Ke Dashboard
        </Button>
        {canCancel && (
          <Button variant="danger" onClick={() => setConfirmCancel(true)}>
            <XCircle className="h-4 w-4" /> Batalkan
          </Button>
        )}
      </div>

      <ConfirmDialog
        open={confirmCancel}
        title="Batalkan Transaksi?"
        description="Transaksi yang dibatalkan tidak dapat dilanjutkan kembali."
        confirmLabel="Ya, batalkan"
        onConfirm={onCancel}
        onCancel={() => setConfirmCancel(false)}
        loading={canceling}
      />
    </div>
  );
}
