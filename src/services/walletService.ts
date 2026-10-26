import { apiClient } from './apiClient';

export interface WalletBalance {
  balance: number;
  currency: 'IDR';
  updatedAt: string;
}

export async function getBalance(): Promise<WalletBalance> {
  const { data } = await apiClient.get<WalletBalance>('/api/wallet/balance');
  return data;
}
