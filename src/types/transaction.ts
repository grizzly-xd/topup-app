import type { TopupStatus } from './topup';

export interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  adminFee: number;
  total: number;
  status: TopupStatus;
  paymentMethod?: string | null;
  createdAt: string;
  paidAt?: string | null;
}

export interface TransactionFilters {
  status?: TopupStatus | 'ALL';
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
}

export interface TransactionDetail extends Transaction {
  instructions?: string | null;
  failureReason?: string | null;
}
