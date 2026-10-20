import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Timeline } from '@/components/ui/Timeline';
import { experiences, profile } from '@/config';

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 py-16 sm:py-24">
      <Container>
        <SectionHeading
          index="01 — About"
          title="关于我"
          description="一段自我介绍，以及走到今天的时间线。"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <div className="max-w-measure space-y-5">
              {profile.bio.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={
                    index === 0
                      ? 'text-[15.5px] leading-8 text-ink'
                      : 'text-[15px] leading-8 text-muted'
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <dl className="mt-10 grid gap-3 sm:grid-cols-2">
              <div className="card px-5 py-4">
                <dt className="label">所在城市</dt>
                <dd className="mt-2 text-sm font-medium text-ink">{profile.location}</dd>
              </div>
              <div className="card px-5 py-4">
                <dt className="label">当前状态</dt>
                <dd className="mt-2 text-sm font-medium text-ink">{profile.availability.text}</dd>
              </div>
            </dl>
          </div>

          <div className="card p-6 sm:p-8">
            <h3 className="display text-[18px] text-ink">时间线</h3>
            <div className="mt-7">
              <Timeline items={experiences} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
