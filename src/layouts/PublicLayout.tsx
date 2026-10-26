import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
        <p>© {new Date().getFullYear()} {import.meta.env.VITE_SITE_NAME ?? 'TopUp Saldo'}. Semua hak dilindungi.</p>
        {import.meta.env.VITE_CONTACT_EMAIL && (
          <p className="mt-1">Kontak: {import.meta.env.VITE_CONTACT_EMAIL}</p>
        )}
      </footer>
    </div>
  );
}
