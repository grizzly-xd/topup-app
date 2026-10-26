import { Card } from './ui/Card';
import { Spinner } from './ui/Spinner';
import { formatIDR } from '@/utils/currency';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';

interface Props {
  balance: number | null;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function BalanceCard({ balance, loading, error, onRetry }: Props) {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-brand-600 to-brand-800 text-white">
      <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10" />
      <p className="text-sm text-white/80">Saldo tersedia</p>
      <div className="mt-2 flex items-end gap-2">
        {loading ? (
          <Spinner className="h-7 w-7" />
        ) : error ? (
          <p className="text-sm text-rose-100">{error}</p>
        ) : (
          <p className="text-3xl font-semibold tracking-tight">{formatIDR(balance ?? 0)}</p>
        )}
      </div>
      <div className="mt-4 flex gap-2">
        <Link to="/topup">
          <Button variant="secondary" size="sm">Top Up Saldo</Button>
        </Link>
        {error && onRetry && (
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" onClick={onRetry}>
            Coba lagi
          </Button>
        )}
      </div>
    </Card>
  );
}
