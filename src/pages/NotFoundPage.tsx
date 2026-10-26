import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 p-6 text-center">
      <p className="text-6xl font-bold text-brand-600 dark:text-brand-400">404</p>
      <p className="text-sm text-slate-500">Halaman tidak ditemukan.</p>
      <Link to="/"><Button>Kembali ke Beranda</Button></Link>
    </div>
  );
}
