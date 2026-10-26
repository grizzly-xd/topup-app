import { NavLink } from 'react-router-dom';
import { Home, Wallet, History, User } from 'lucide-react';
import { cn } from '@/utils/cn';

const items = [
  { to: '/dashboard', label: 'Beranda', icon: Home },
  { to: '/topup', label: 'Top Up', icon: Wallet },
  { to: '/transactions', label: 'Riwayat', icon: History },
  { to: '/profile', label: 'Profil', icon: User },
];

export function BottomNavigation() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden dark:border-slate-800 dark:bg-slate-950/95">
      <div className="grid grid-cols-4">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1 py-2 text-xs text-slate-500 dark:text-slate-400',
                isActive && 'text-brand-600 dark:text-brand-300'
              )
            }
          >
            <Icon className="h-5 w-5" /> {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
