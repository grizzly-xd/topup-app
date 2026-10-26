import { useEffect } from 'react';
import { Button } from './ui/Button';

export function ConfirmDialog({
  open, title, description, confirmLabel = 'Konfirmasi', cancelLabel = 'Batal',
  onConfirm, onCancel, loading,
}: {
  open: boolean; title: string; description?: string;
  confirmLabel?: string; cancelLabel?: string;
  onConfirm: () => void; onCancel: () => void; loading?: boolean;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel(); };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onCancel]);

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>}
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="ghost" onClick={onCancel} disabled={loading}>{cancelLabel}</Button>
          <Button onClick={onConfirm} loading={loading}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  );
}
