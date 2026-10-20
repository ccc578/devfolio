import { Check, Copy, Mail } from 'lucide-react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

/* 邮箱以胶囊输入框的形式呈现：整行可点，复制后图标切换为对勾 */
export function EmailButton({ email }: { email: string }) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <div className="flex flex-col gap-2.5">
      <button
        type="button"
        onClick={() => void copy(email)}
        className="group flex h-14 w-full items-center gap-3 rounded-full border border-line bg-surface px-2.5 pr-5 text-left text-ink shadow-soft transition-all duration-200 ease-smooth hover:border-accent/50 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
          <Mail className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="min-w-0 truncate font-mono text-[13.5px] tracking-wide">{email}</span>
        <span className="ml-auto flex shrink-0 items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted transition-colors group-hover:text-accent">
          {copied ? (
            <Check className="h-4 w-4 text-accent" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4" aria-hidden="true" />
          )}
          {copied ? '已复制' : '复制'}
        </span>
      </button>
      <span className="label pl-5" role="status" aria-live="polite">
        {copied ? '邮箱已在剪贴板中' : '点击整行即可复制邮箱'}
      </span>
    </div>
  );
}
