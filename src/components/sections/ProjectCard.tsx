import { Link } from 'react-router-dom';
import { ArrowUpRight, Github } from 'lucide-react';
import { Tag } from '@/components/ui/Tag';
import type { Project } from '@/types';

export function ProjectCard({ project }: { project: Project }) {
  const { links } = project;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-soft transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-accent/35 hover:shadow-lift">
      <Link
        to={`/projects/${project.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block overflow-hidden bg-subtle"
      >
        <img
          src={project.cover}
          alt={project.coverAlt}
          width={1200}
          height={750}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.04]"
        />
        {project.period ? (
          <span className="absolute left-3 top-3 inline-flex items-center rounded-full border border-line/60 bg-page/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink backdrop-blur">
            {project.period}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        {project.role ? <p className="label">{project.role}</p> : null}

        <h3 className="display mt-2 text-[19px] leading-snug text-ink">
          <Link
            to={`/projects/${project.slug}`}
            className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
          >
            {project.title}
          </Link>
        </h3>

        <p className="mt-2.5 flex-1 text-[13.5px] leading-6 text-muted">{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-4 border-t border-line pt-4 font-mono text-[10.5px] uppercase tracking-[0.14em]">
          {links.github ? (
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              源码
            </a>
          ) : null}
          {links.demo ? (
            <a
              href={links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              预览
            </a>
          ) : null}
          <Link
            to={`/projects/${project.slug}`}
            aria-label={`查看 ${project.title} 详情`}
            className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-all duration-200 ease-smooth group-hover:border-accent/40 group-hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
