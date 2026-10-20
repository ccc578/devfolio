import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SkillMeter } from '@/components/ui/SkillMeter';
import { skillGroups } from '@/config';

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-24 py-16 sm:py-24">
      <Container>
        <SectionHeading
          index="02 — Skills"
          title="技能栈"
          description="按使用场景分组。标注的是熟练程度，不是使用时长。"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.id} className="card p-6 sm:p-7">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="display text-[18px] text-ink">{group.title}</h3>
                <span className="label">{group.skills.length} Skills</span>
              </div>
              {group.description ? (
                <p className="mt-2.5 text-[13px] leading-6 text-muted">{group.description}</p>
              ) : null}
              <ul className="mt-5 space-y-0.5">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center justify-between gap-4 rounded-lg px-2 py-2.5 transition-colors duration-200 hover:bg-subtle"
                  >
                    <span className="text-[13.5px] text-ink">{skill.name}</span>
                    <SkillMeter level={skill.level} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
