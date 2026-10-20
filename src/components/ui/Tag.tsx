import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/* 标签：胶囊形、浅底、发丝边，用于技术栈与文章标签 */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-line bg-subtle px-2.5 py-1 font-mono text-[10.5px] leading-4 tracking-[0.08em] text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}
