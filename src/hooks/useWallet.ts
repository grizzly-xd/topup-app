import { useCallback, useEffect, useState } from 'react';
import { getBalance, type WalletBalance } from '@/services/walletService';
import { extractApiMessage } from '@/utils/errors';

export function useWallet() {
  const [data, setData] = useState<WalletBalance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await getBalance());
    } catch (e) {
      setError(extractApiMessage(e, 'Gagal memuat saldo.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}
