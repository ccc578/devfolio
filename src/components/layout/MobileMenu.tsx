import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { site } from '@/config';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { cn } from '@/lib/cn';

export function MobileMenu({ activeHref }: { activeHref: string }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);
  const location = useLocation();

  useLockBodyScroll(open);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (wasOpenRef.current && !open) triggerRef.current?.focus();
    wasOpenRef.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const collect = () =>
      Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;

      const items = collect();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const raf = window.requestAnimationFrame(() => collect()[0]?.focus());

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.cancelAnimationFrame(raf);
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="打开导航菜单"
        aria-expanded={open}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:bg-subtle hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="站点导航"
            className="absolute inset-x-3 top-3 rounded-3xl border border-line bg-page/95 p-5 shadow-lift backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <span className="label">导航</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="关闭导航菜单"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-subtle hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="移动端主导航" className="mt-3 flex flex-col gap-1">
              {site.nav.map((item) => {
                const isAnchor = item.href.startsWith('#');
                const active = activeHref === item.href;
                return (
                  <Link
                    key={item.href}
                    to={isAnchor ? `/${item.href}` : item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'true' : undefined}
                    className={cn(
                      'flex items-center justify-between rounded-xl px-3 py-3.5 text-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                      active
                        ? 'bg-accent/10 font-medium text-accent'
                        : 'text-ink hover:bg-subtle',
                    )}
                  >
                    {item.label}
                    <span className="font-mono text-[11px] text-muted">→</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
