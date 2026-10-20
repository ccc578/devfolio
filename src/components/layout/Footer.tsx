import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ScrollToTopButton } from './ScrollToTopButton';
import { profile, site } from '@/config';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-4">
      <Container>
        <div className="rule" aria-hidden="true" />
        <div className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-[13px] text-ink">
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-accent-gradient text-[11px] font-semibold text-onaccent">
                {site.author.slice(0, 1)}
              </span>
              © {site.footer.since}–{year} {site.author}
            </p>
            <p className="text-xs leading-6 text-muted">{site.footer.note}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {profile.socials.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target={social.url.startsWith('http') ? '_blank' : undefined}
                rel={social.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group inline-flex h-9 items-center gap-1 rounded-full border border-line bg-surface px-3.5 text-[12px] text-muted shadow-soft transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:text-ink hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {social.label}
                <ArrowUpRight
                  className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </a>
            ))}
            <ScrollToTopButton />
          </div>
        </div>
      </Container>
    </footer>
  );
}
