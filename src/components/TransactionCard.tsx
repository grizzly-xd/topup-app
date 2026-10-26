import { Link } from 'react-router-dom';
import { Card } from './ui/Card';
import { TransactionStatusBadge } from './TransactionStatusBadge';
import { formatIDR } from '@/utils/currency';
import { formatDateTime } from '@/utils/date';
import type { Transaction } from '@/types/transaction';

export function TransactionCard({ tx }: { tx: Transaction }) {
  return (
    <Card className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">{tx.orderId}</p>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          {formatDateTime(tx.createdAt)} • {formatIDR(tx.total)}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <TransactionStatusBadge status={tx.status} />
        <Link
          to={`/transactions/${tx.id}`}
          className="text-sm font-medium text-brand-600 hover:underline dark:text-brand-300"
        >
          Detail
        </Link>
      </div>
    </Card>
  );
}
