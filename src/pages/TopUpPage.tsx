import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { TopUpAmountSelector } from '@/components/TopUpAmountSelector';
import { PaymentSummary } from '@/components/PaymentSummary';
import { buildTopupSchema, type TopupForm } from '@/schemas/topupSchema';
import { createTopup } from '@/services/topupService';
import { payWithSnap, isSnapConfigured } from '@/services/midtransSnap';
import { extractApiMessage } from '@/utils/errors';
import { toast } from 'sonner';

// Batas default; backend tetap sumber otoritatif.
const MIN = 10_000;
const MAX = 10_000_000;
const schema = buildTopupSchema(MIN, MAX);

export function TopUpPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TopupForm>({
    resolver: zodResolver(schema),
    defaultValues: { amount: 50_000 },
  });
  const amount = watch('amount');

  const onSubmit = async (values: TopupForm) => {
    if (!isSnapConfigured()) {
      toast.error('Pembayaran belum dikonfigurasi.');
      return;
    }
    setSubmitting(true);
    try {
      const created = await createTopup({ amount: values.amount });
      // Arahkan ke halaman status lebih dulu (UX), lalu buka Snap
      navigate(`/payment/${created.orderId}`, { replace: false });
      await payWithSnap(created.snapToken, {
        onSuccess: () => navigate(`/payment/${created.orderId}`),
        onPending: () => navigate(`/payment/${created.orderId}`),
        onError: () => toast.error('Pembayaran gagal. Silakan coba lagi.'),
        onClose: () => toast.info('Anda menutup jendela pembayaran.'),
      });
    } catch (e) {
      toast.error(extractApiMessage(e, 'Gagal membuat transaksi top up.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Top Up Saldo</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Pilih nominal atau masukkan jumlah lain.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Card>
          <TopUpAmountSelector control={control} error={errors.amount?.message} />
        </Card>

        <PaymentSummary
          amount={amount || 0}
          note="Biaya administrasi & total final mengikuti data dari backend."
        />

        <Button type="submit" fullWidth size="lg" loading={submitting}>
          <CreditCard className="h-4 w-4" /> Lanjutkan Pembayaran
        </Button>
      </form>
    </div>
  );
}
