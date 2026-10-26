import { Card } from '@/components/ui/Card';

const faqs = [
  {
    q: 'Berapa lama saldo bertambah?',
    a: 'Setelah pembayaran berhasil dikonfirmasi backend, saldo akan bertambah otomatis. Jika belum, klik "Periksa Status" di halaman riwayat.',
  },
  {
    q: 'Pembayaran berhasil tetapi saldo belum bertambah, apa yang harus dilakukan?',
    a: 'Buka Riwayat Transaksi, pilih transaksi terkait, dan klik Periksa Status. Jika status menunjukkan SUCCESS namun saldo tetap tidak bertambah, hubungi kontak dukungan dengan menyertakan Order ID.',
  },
  {
    q: 'Apakah saya bisa membatalkan transaksi?',
    a: 'Anda hanya bisa membatalkan transaksi yang masih berstatus PENDING atau PROCESSING dan diizinkan oleh sistem.',
  },
  {
    q: 'Metode pembayaran apa saja yang didukung?',
    a: 'Metode yang tersedia ditentukan oleh konfigurasi akun merchant pada payment gateway.',
  },
];

const statuses = [
  { s: 'Menunggu Pembayaran', d: 'Transaksi dibuat, menunggu Anda menyelesaikan pembayaran.' },
  { s: 'Pembayaran Diproses', d: 'Pembayaran diterima dan sedang dikonfirmasi oleh sistem.' },
  { s: 'Berhasil', d: 'Pembayaran terkonfirmasi dan saldo telah ditambahkan.' },
  { s: 'Gagal', d: 'Pembayaran gagal; saldo tidak bertambah.' },
  { s: 'Kedaluwarsa', d: 'Batas waktu pembayaran habis tanpa pembayaran.' },
  { s: 'Dibatalkan', d: 'Transaksi dibatalkan oleh pengguna atau sistem.' },
];

export function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Bantuan</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Panduan dan pertanyaan umum.</p>
      </div>

      <section>
        <h2 className="text-lg font-semibold">Panduan Top Up</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
          <li>Masuk ke akun Anda.</li>
          <li>Buka menu Top Up Saldo.</li>
          <li>Pilih nominal atau masukkan jumlah lain.</li>
          <li>Klik Lanjutkan Pembayaran, lalu selesaikan pembayaran melalui halaman pembayaran yang muncul.</li>
          <li>Setelah kembali, periksa status transaksi untuk memastikan saldo bertambah.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Arti Status Transaksi</h2>
        <div className="mt-2 space-y-2">
          {statuses.map((s) => (
            <Card key={s.s} className="py-3">
              <p className="text-sm font-medium">{s.s}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{s.d}</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">FAQ</h2>
        <div className="mt-2 space-y-2">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <summary className="cursor-pointer list-none text-sm font-medium">{f.q}</summary>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Kontak</h2>
        <Card className="mt-2 space-y-1 text-sm">
          <p>Email: {import.meta.env.VITE_CONTACT_EMAIL || 'Belum dikonfigurasi'}</p>
          <p>Telepon: {import.meta.env.VITE_CONTACT_PHONE || 'Belum dikonfigurasi'}</p>
        </Card>
      </section>
    </div>
  );
}
