import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatDateTime } from '@/utils/date';

export function ProfilePage() {
  const { account, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <h1 className="text-2xl font-semibold">Profil</h1>
      <Card className="space-y-3 text-sm">
        <div className="flex justify-between"><span className="text-slate-500">Nama</span><span className="font-medium">{account?.displayName || '-'}</span></div>
        <div className="flex justify-between"><span className="text-slate-500">Email</span><span className="font-medium">{account?.email ?? '-'}</span></div>
        <div className="flex justify-between"><span className="text-slate-500">ID Akun</span><span className="font-mono text-xs">{account?.id ?? '-'}</span></div>
        <div className="flex justify-between"><span className="text-slate-500">Terdaftar</span><span className="font-medium">{formatDateTime(account?.createdAt)}</span></div>
      </Card>

      <Button variant="danger" onClick={onLogout}>
        <LogOut className="h-4 w-4" /> Keluar
      </Button>
    </div>
  );
}
