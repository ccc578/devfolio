import type { SkillLevel } from '@/types';

const LABELS: Record<SkillLevel, string> = {
  expert: '精通',
  advanced: '熟练',
  proficient: '熟悉',
  learning: '了解',
};

const PERCENT: Record<SkillLevel, number> = {
  expert: 100,
  advanced: 80,
  proficient: 58,
  learning: 34,
};

export function SkillMeter({ level }: { level: SkillLevel }) {
  return (
    <span className="flex shrink-0 items-center gap-2.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        {LABELS[level]}
      </span>
      <span
        className="relative h-1.5 w-16 overflow-hidden rounded-full bg-subtle"
        aria-hidden="true"
      >
        <span
          className="absolute inset-y-0 left-0 rounded-full bg-accent-gradient"
          style={{ width: `${PERCENT[level]}%` }}
        />
      </span>
    </span>
  );
}
