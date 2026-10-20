import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { DesktopNav } from './DesktopNav';
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from './ThemeToggle';
import { profile, site } from '@/config';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { SECTION_IDS } from '@/lib/constants';
import { cn } from '@/lib/cn';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const activeSection = useScrollSpy(SECTION_IDS);
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const routeActive =
    site.nav.find((item) => item.href.startsWith('/') && location.pathname.startsWith(item.href))
      ?.href ?? '';
  const activeHref = isHome ? (activeSection ? `#${activeSection}` : '') : routeActive;

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-colors duration-300',
        scrolled
          ? 'border-b border-line bg-page/80 backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <Container>
        <div className="flex h-[70px] items-center justify-between gap-4">
          <Link
            to="/"
            className="group flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-page"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-gradient text-[15px] font-semibold text-onaccent shadow-glow transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5">
              {site.author.slice(0, 1)}
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[15px] font-semibold tracking-tight text-ink">
                {site.author}
              </span>
              <span className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                {profile.role}
              </span>
            </span>
          </Link>

          <DesktopNav activeHref={activeHref} />

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <MobileMenu activeHref={activeHref} />
          </div>
        </div>
      </Container>
    </header>
  );
}
