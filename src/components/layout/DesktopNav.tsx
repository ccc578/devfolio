import { Link } from 'react-router-dom';
import { site } from '@/config';
import { cn } from '@/lib/cn';

export function DesktopNav({ activeHref }: { activeHref: string }) {
  return (
    <nav
      aria-label="主导航"
      className="hidden items-center gap-0.5 rounded-full border border-line bg-surface/60 p-1 backdrop-blur lg:flex"
    >
      {site.nav.map((item) => {
        const isAnchor = item.href.startsWith('#');
        const active = activeHref === item.href;
        return (
          <Link
            key={item.href}
            to={isAnchor ? `/${item.href}` : item.href}
            aria-current={active ? 'true' : undefined}
            className={cn(
              'inline-flex h-9 items-center rounded-full px-4 text-[13px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              active
                ? 'bg-accent/10 font-medium text-accent'
                : 'text-muted hover:bg-subtle hover:text-ink',
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
