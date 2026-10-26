const SNAP_URL = import.meta.env.VITE_MIDTRANS_SNAP_URL;
const CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
const IS_PROD = import.meta.env.VITE_MIDTRANS_IS_PRODUCTION === 'true';

let loadingPromise: Promise<void> | null = null;

export function isSnapConfigured(): boolean {
  return Boolean(SNAP_URL && CLIENT_KEY);
}

export function loadSnap(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.snap) return Promise.resolve();
  if (loadingPromise) return loadingPromise;
  if (!SNAP_URL) return Promise.reject(new Error('VITE_MIDTRANS_SNAP_URL belum diisi.'));

  loadingPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-snap]');
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Gagal memuat Snap.')));
      return;
    }
    const s = document.createElement('script');
    s.src = SNAP_URL;
    s.async = true;
    s.dataset.snap = 'true';
    if (CLIENT_KEY) s.dataset.clientKey = CLIENT_KEY;
    if (IS_PROD) s.dataset.clientKey = CLIENT_KEY; // konsisten; flag dipakai backend juga
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Gagal memuat Snap.js'));
    document.head.appendChild(s);
  });
  return loadingPromise;
}

export interface SnapCallbacks {
  onSuccess?: (result: unknown) => void;
  onPending?: (result: unknown) => void;
  onError?: (result: unknown) => void;
  onClose?: () => void;
}

export async function payWithSnap(token: string, cb: SnapCallbacks = {}): Promise<void> {
  await loadSnap();
  if (!window.snap) throw new Error('Snap tidak tersedia.');
  window.snap.pay(token, cb);
}
