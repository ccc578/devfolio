import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { EmailButton } from '@/components/ui/EmailButton';
import { FALLBACK_SOCIAL_ICON, SOCIAL_ICONS } from '@/lib/social-icons';
import { profile } from '@/config';

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-7 shadow-lift sm:p-12">
          <div
            className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-36 -left-20 h-72 w-72 rounded-full bg-accent2/15 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative">
            <span className="chip">05 — Contact</span>

            <h2 className="display mt-6 max-w-2xl text-[30px] leading-[1.1] text-ink sm:text-[42px]">
              有合适的机会，<span className="text-gradient">聊聊？</span>
            </h2>
            <p className="mt-4 max-w-measure text-[14.5px] leading-7 text-muted">
              前端岗位、技术合作或者只是想交流某个实现思路，都欢迎直接发邮件。通常一个工作日内回复。
            </p>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <EmailButton email={profile.email} />

              <ul className="space-y-2">
                {profile.socials.map((social) => {
                  const Icon = SOCIAL_ICONS[social.icon] ?? FALLBACK_SOCIAL_ICON;
                  const external = social.url.startsWith('http');
                  return (
                    <li key={social.id}>
                      <a
                        href={social.url}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        className="group flex items-center gap-3 rounded-xl px-3 py-3 text-[13.5px] text-ink transition-colors duration-200 hover:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line bg-surface text-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
                          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                        <span>{social.label}</span>
                        {social.handle ? (
                          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                            {social.handle}
                          </span>
                        ) : null}
                        <ArrowUpRight
                          className="ml-auto h-3.5 w-3.5 text-muted opacity-0 transition-all duration-200 group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
