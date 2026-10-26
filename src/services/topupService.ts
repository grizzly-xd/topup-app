import { apiClient } from './apiClient';
import type {
  CreateTopupRequest,
  CreateTopupResponse,
  TopupStatusResponse,
} from '@/types/topup';
import type { Paginated } from '@/types/api';
import type { Transaction, TransactionDetail, TransactionFilters } from '@/types/transaction';

export async function createTopup(payload: CreateTopupRequest): Promise<CreateTopupResponse> {
  const { data } = await apiClient.post<CreateTopupResponse>('/api/topups', payload);
  return data;
}

export async function getTopupStatus(id: string): Promise<TopupStatusResponse> {
  const { data } = await apiClient.get<TopupStatusResponse>(`/api/topups/${id}/status`);
  return data;
}

export async function cancelTopup(id: string): Promise<TopupStatusResponse> {
  const { data } = await apiClient.post<TopupStatusResponse>(`/api/topups/${id}/cancel`);
  return data;
}

export async function listTopups(filters: TransactionFilters = {}): Promise<Paginated<Transaction>> {
  const { data } = await apiClient.get<Paginated<Transaction>>('/api/topups', {
    params: {
      status: filters.status && filters.status !== 'ALL' ? filters.status : undefined,
      from: filters.from,
      to: filters.to,
      page: filters.page ?? 1,
      pageSize: filters.pageSize ?? 10,
    },
  });
  return data;
}

export async function getTopupDetail(id: string): Promise<TransactionDetail> {
  const { data } = await apiClient.get<TransactionDetail>(`/api/topups/${id}`);
  return data;
}
