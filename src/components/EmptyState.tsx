import type { ReactNode } from 'react';
import { Card } from './ui/Card';
export function EmptyState({ icon, title, description, action }: {
  icon?: ReactNode; title: string; description?: string; action?: ReactNode;
}) {
  return (
    <Card className="flex flex-col items-center justify-center gap-2 py-12 text-center">
      {icon}
      <p className="font-medium">{title}</p>
      {description && <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p>}
      {action}
    </Card>
  );
}
