import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900',
        className
      )}
      {...rest}
    />
  );
}
