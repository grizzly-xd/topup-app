import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { User } from 'firebase/auth';
import { subscribeAuth, getIdToken, logout as fbLogout } from '@/services/authService';
import { setTokenProvider } from '@/services/apiClient';
import { getMe } from '@/services/accountService';
import type { Account } from '@/types/account';

interface AuthCtx {
  user: User | null;
  account: Account | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshAccount: () => Promise<void>;
}

export const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

  // Pasang token provider ke axios
  useEffect(() => {
    setTokenProvider(() => getIdToken(false));
  }, []);

  useEffect(() => {
    const unsub = subscribeAuth(async (u) => {
      setUser(u);
      if (u) {
        try {
          const me = await getMe();
          setAccount(me);
        } catch {
          setAccount(null);
        }
      } else {
        setAccount(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const refreshAccount = async () => {
    if (!user) return;
    try {
      setAccount(await getMe());
    } catch {
      /* biarkan null; UI akan menampilkan error state */
    }
  };

  const logout = async () => {
    await fbLogout();
    setUser(null);
    setAccount(null);
  };

  const value = useMemo<AuthCtx>(
    () => ({ user, account, loading, logout, refreshAccount }),
    [user, account, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
