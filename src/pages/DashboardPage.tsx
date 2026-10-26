import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useWallet } from '@/hooks/useWallet';
import { BalanceCard } from '@/components/BalanceCard';
import { TransactionCard } from '@/components/TransactionCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { Card } from '@/components/ui/Card';
import { useEffect, useState } from 'react';
import { listTopups } from '@/services/topupService';
import type { Transaction } from '@/types/transaction';
import { extractApiMessage } from '@/utils/errors';

export function DashboardPage() {
  const { account } = useAuth();
  const wallet = useWallet();
  const [txs, setTxs] = useState<Transaction[] | null>(null);
  const [txErr, setTxErr] = useState<string | null>(null);

  const loadTx = async () => {
    setTxErr(null);
    try {
      const res = await listTopups({ page: 1, pageSize: 5 });
      setTxs(res.items);
    } catch (e) {
      setTxErr(extractApiMessage(e, 'Gagal memuat transaksi.'));
    }
  };

  useEffect(() => {
    void loadTx();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Hai, {account?.displayName || 'Pengguna'} 👋
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Selamat datang di dashboard Anda.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <BalanceCard
            balance={wallet.data?.balance ?? null}
            loading={wallet.loading}
            error={wallet.error}
            onRetry={wallet.refresh}
          />
        </div>
        <Card className="space-y-2">
          <p className="text-sm font-medium">Informasi Akun</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {account?.email ?? '-'}
          </p>
          <Link
            to="/profile"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline dark:text-brand-300"
          >
            Lihat profil <ArrowRight className="h-4 w-4" />
          </Link>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Transaksi Terbaru</h2>
          <Link to="/transactions" className="text-sm text-brand-600 hover:underline dark:text-brand-300">
            Lihat semua
          </Link>
        </div>
        <div className="mt-3 space-y-3">
          {txErr ? (
            <ErrorState message={txErr} onRetry={loadTx} />
          ) : txs === null ? (
            <>
              <LoadingSkeleton className="h-20" />
              <LoadingSkeleton className="h-20" />
            </>
          ) : txs.length === 0 ? (
            <EmptyState
              title="Belum ada transaksi"
              description="Mulai top up saldo pertama Anda."
              action={<Link to="/topup"><span className="text-sm font-medium text-brand-600">Top Up Sekarang</span></Link>}
            />
          ) : (
            txs.map((t) => <TransactionCard key={t.id} tx={t} />)
          )}
        </div>
      </div>
    </div>
  );
}
