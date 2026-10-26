import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { loginWithEmail, isFirebaseConfigured } from '@/services/authService';
import { extractApiMessage } from '@/utils/errors';
import { toast } from 'sonner';

const schema = z.object({
  email: z.string().email('Format email tidak valid.'),
  password: z.string().min(1, 'Password wajib diisi.'),
});
type Form = z.infer<typeof schema>;

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: string } };
  const [showPwd, setShowPwd] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Form>({ resolver: zodResolver(schema), defaultValues: { email: '', password: '' } });

  const onSubmit = async (values: Form) => {
    if (!isFirebaseConfigured) {
      toast.error('Autentikasi belum dikonfigurasi. Hubungi administrator.');
      return;
    }
    try {
      await loginWithEmail(values.email.trim(), values.password);
      toast.success('Berhasil masuk.');
      navigate(location.state?.from ?? '/dashboard', { replace: true });
    } catch (e) {
      toast.error(extractApiMessage(e, 'Email atau password salah.'));
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center px-4 py-10">
      <Card className="w-full space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Masuk</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Gunakan email dan password akun Anda.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="nama@email.com"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Password"
            type={showPwd ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
            error={errors.password?.message}
            trailing={
              <button
                type="button"
                aria-label={showPwd ? 'Sembunyikan password' : 'Tampilkan password'}
                onClick={() => setShowPwd((v) => !v)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
            {...register('password')}
          />

          <Button type="submit" fullWidth size="lg" loading={isSubmitting}>
            <LogIn className="h-4 w-4" /> Masuk
          </Button>
        </form>
      </Card>
    </div>
  );
}
