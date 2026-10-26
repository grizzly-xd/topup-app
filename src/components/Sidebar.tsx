import { NavLink } from 'react-router-dom';
import { Home, Wallet, History, User, HelpCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/topup', label: 'Top Up', icon: Wallet },
  { to: '/transactions', label: 'Riwayat', icon: History },
  { to: '/profile', label: 'Profil', icon: User },
  { to: '/help', label: 'Bantuan', icon: HelpCircle },
];

export function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white p-4 md:block dark:border-slate-800 dark:bg-slate-950">
      <nav className="flex flex-col gap-1">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
                isActive && 'bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200'
              )
            }
          >
            <Icon className="h-4 w-4" /> {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
