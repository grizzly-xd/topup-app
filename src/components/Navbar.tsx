import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Wallet, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/Button';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/utils/cn';

const links = [
  { to: '/', label: 'Beranda', end: true },
  { to: '/topup', label: 'Top Up Saldo' },
  { to: '/transactions', label: 'Riwayat' },
  { to: '/help', label: 'Bantuan' },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const onLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold text-brand-700 dark:text-brand-300">
          <Wallet className="h-5 w-5" /> TopUp Saldo
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
                  isActive && 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <Button variant="secondary" size="sm" onClick={onLogout} className="hidden md:inline-flex">
              Keluar
            </Button>
          ) : (
            <Button size="sm" onClick={() => navigate('/login')} className="hidden md:inline-flex">
              Masuk
            </Button>
          )}
          <button
            className="rounded-lg p-2 hover:bg-slate-100 md:hidden dark:hover:bg-slate-800"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white p-4 md:hidden dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {l.label}
              </NavLink>
            ))}
            {user ? (
              <Button variant="secondary" size="sm" onClick={onLogout} className="mt-2">
                Keluar
              </Button>
            ) : (
              <Button size="sm" onClick={() => { setOpen(false); navigate('/login'); }} className="mt-2">
                Masuk
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
