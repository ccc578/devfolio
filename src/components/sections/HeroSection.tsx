import { ArrowDown, Download, Mail } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { profile, projects } from '@/config';
import { publishedPosts } from '@/lib/markdown';

export function HeroSection() {
  const stats = [
    { label: '项目', value: String(projects.length).padStart(2, '0') },
    { label: '文章', value: String(publishedPosts.length).padStart(2, '0') },
    { label: '坐标', value: profile.location },
  ];

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="dot-field pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />

      <Container className="relative">
        <div className="grid items-center gap-14 py-12 sm:py-16 lg:grid-cols-[1.12fr_0.88fr] lg:gap-20 lg:py-24">
          <div>
            <span className="chip">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {profile.availability.text}
            </span>

            <h1 className="display mt-7 text-[clamp(3rem,8vw,5.2rem)] leading-[0.95] text-ink">
              {profile.name}
              <span className="text-gradient">.</span>
            </h1>

            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-lg font-medium sm:text-xl">
              <span className="text-ink">{profile.role}</span>
              <span className="hidden h-4 w-px bg-line sm:block" aria-hidden="true" />
              <span className="text-muted">{profile.headline.join(' / ')}</span>
            </p>

            <p className="mt-6 max-w-[44ch] text-[15.5px] leading-8 text-muted">
              {profile.slogan}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="#projects">
                查看项目
                <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href={profile.resumeUrl} variant="secondary" download>
                下载简历
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="#contact" variant="ghost">
                联系我
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              </ButtonLink>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="label">{stat.label}</dt>
                  <dd className="mt-2 text-[22px] font-semibold tracking-tight text-ink">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-[340px] pb-4 lg:max-w-[380px]">
            <div
              className="absolute -inset-6 rounded-[42px] bg-accent-gradient opacity-[0.14] blur-2xl"
              aria-hidden="true"
            />
            <div className="relative rounded-3xl border border-line bg-surface p-2 shadow-lift">
              <img
                src={profile.avatar}
                alt={profile.avatarAlt}
                width={400}
                height={400}
                className="aspect-square w-full rounded-[20px] bg-subtle object-cover"
              />
            </div>

            <div className="relative z-10 mx-auto -mt-9 w-[88%] rounded-2xl border border-line bg-surface/95 px-5 py-4 shadow-soft backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="label">城市</p>
                  <p className="mt-1.5 text-[13px] font-medium text-ink">{profile.location}</p>
                </div>
                <span className="h-9 w-px bg-line" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="label">正在</p>
                  <p className="mt-1.5 truncate text-[13px] font-medium text-ink">
                    {profile.availability.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
