import { AlertTriangle } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <Card className="flex flex-col items-center gap-3 py-10 text-center">
      <AlertTriangle className="h-8 w-8 text-rose-500" />
      <p className="text-sm text-slate-700 dark:text-slate-200">{message}</p>
      {onRetry && <Button size="sm" variant="secondary" onClick={onRetry}>Coba lagi</Button>}
    </Card>
  );
}
