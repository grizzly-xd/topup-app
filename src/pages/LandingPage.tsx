import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Wallet, CreditCard, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const faqs = [
  {
    q: 'Berapa lama proses top up saldo?',
    a: 'Saldo akan bertambah setelah pembayaran berhasil dikonfirmasi oleh sistem pembayaran. Umumnya dalam hitungan detik hingga beberapa menit.',
  },
  {
    q: 'Metode pembayaran apa saja yang tersedia?',
    a: 'Metode pembayaran mengikuti konfigurasi akun merchant (e-wallet, QRIS, virtual account, transfer bank, dan kartu yang didukung).',
  },
  {
    q: 'Apa yang harus saya lakukan jika saldo belum bertambah?',
    a: 'Buka halaman Riwayat Transaksi, periksa status transaksi, lalu klik "Periksa Status". Jika masih bermasalah, hubungi kontak yang tertera.',
  },
  {
    q: 'Apakah data saya aman?',
    a: 'Kami tidak menyimpan PIN, OTP, atau password e-wallet. Semua data sensitif diproses melalui backend dan payment gateway resmi.',
  },
];

export function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
              <Zap className="h-3.5 w-3.5" /> Cepat & Aman
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Top Up Saldo <span className="text-brand-600 dark:text-brand-400">Lebih Mudah</span>
            </h1>
            <p className="mt-4 max-w-lg text-slate-600 dark:text-slate-300">
              Isi saldo kapan saja dengan berbagai metode pembayaran. Proses cepat, transparan, dan aman.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/login"><Button size="lg">Mulai Sekarang</Button></Link>
              <Link to="/help"><Button size="lg" variant="secondary">Pelajari Lebih Lanjut</Button></Link>
            </div>
          </div>
          <div className="relative">
            <Card className="bg-gradient-to-br from-brand-600 to-brand-800 text-white">
              <p className="text-sm text-white/80">Saldo Anda</p>
              <p className="mt-1 text-3xl font-semibold">Rp —</p>
              <p className="mt-6 text-xs text-white/70">
                Saldo akan muncul setelah Anda masuk dan backend mengembalikan data resmi.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Keunggulan */}
      <section className="border-y border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-2xl font-semibold">Mengapa memilih kami?</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { icon: Zap, t: 'Proses Cepat', d: 'Saldo bertambah otomatis setelah pembayaran berhasil dikonfirmasi.' },
              { icon: ShieldCheck, t: 'Aman', d: 'Integrasi payment gateway resmi. Tidak menyimpan data sensitif pengguna.' },
              { icon: CreditCard, t: 'Banyak Metode', d: 'E-wallet, QRIS, virtual account, dan kartu yang didukung.' },
            ].map(({ icon: Icon, t, d }) => (
              <Card key={t}>
                <Icon className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                <p className="mt-3 font-semibold">{t}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Metode pembayaran info */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-semibold">Metode Pembayaran</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
          Metode yang tampil akan menyesuaikan konfigurasi akun merchant Anda.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {['E-Wallet', 'QRIS', 'Virtual Account', 'Kartu Kredit/Debit'].map((m) => (
            <Card key={m} className="flex items-center gap-2 py-4">
              <Wallet className="h-4 w-4 text-brand-600" />
              <span className="text-sm font-medium">{m}</span>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold">
            <HelpCircle className="h-5 w-5 text-brand-600" /> Pertanyaan Umum
          </h2>
          <div className="mt-6 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <summary className="cursor-pointer list-none font-medium">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {f.q}
                  </span>
                </summary>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
