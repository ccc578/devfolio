import { ArrowUp } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

export function ScrollToTopButton() {
  const reduced = usePrefersReducedMotion();

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 text-[12px] text-muted shadow-soft transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:text-ink hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      回到顶部
      <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
    </button>
  );
}
