import { apiClient } from './apiClient';
import type { Account } from '@/types/account';

export async function getMe(): Promise<Account> {
  const { data } = await apiClient.get<Account>('/api/account/me');
  return data;
}
