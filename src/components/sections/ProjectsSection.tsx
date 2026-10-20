import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { projects } from '@/config';
import { MAX_FEATURED_PROJECTS } from '@/lib/constants';
import { ProjectCard } from './ProjectCard';

export function ProjectsSection() {
  const featured = projects
    .filter((project) => project.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, MAX_FEATURED_PROJECTS);

  return (
    <section id="projects" className="scroll-mt-24 py-16 sm:py-24">
      <Container>
        <SectionHeading
          index="03 — Projects"
          title="精选项目"
          description="每个项目都写清楚了背景、我负责的部分和最终结果。"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <Link
            to="/projects"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-surface px-5 text-[13px] text-muted shadow-soft transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:text-ink hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            全部项目
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
