import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Github, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';
import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { projects, site } from '@/config';

const linkStyle =
  'inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-surface px-4 text-[12.5px] text-ink shadow-soft transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projects.find((item) => item.slug === slug) : undefined;

  useDocumentMeta({
    title: project ? `${project.title} · ${site.author}` : `项目不存在 · ${site.author}`,
    description: project?.summary,
  });

  if (!project) return <NotFoundPage />;

  const meta = [
    project.role ? { label: '角色', value: project.role } : null,
    project.period ? { label: '周期', value: project.period } : null,
    { label: '技术栈', value: project.stack.join(' / ') },
  ].filter((item): item is { label: string; value: string } => item !== null);

  return (
    <Container>
      <article className="py-14 sm:py-20">
        <Link
          to="/projects"
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-surface px-4 text-[12.5px] text-muted shadow-soft transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:text-ink hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          全部项目
        </Link>

        <header className="mt-10 max-w-3xl">
          <span className="chip">Case Study</span>
          <h1 className="display mt-5 text-[30px] leading-[1.12] text-ink sm:text-[44px]">
            {project.title}
          </h1>
          <p className="mt-4 text-[15px] leading-8 text-muted">{project.summary}</p>

          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="label">{item.label}</dt>
                <dd className="mt-1.5 text-[13px] font-medium text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {project.links.github ? (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className={linkStyle}>
                <Github className="h-3.5 w-3.5" aria-hidden="true" />
                源码
              </a>
            ) : null}
            {project.links.demo ? (
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className={linkStyle}>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                在线预览
              </a>
            ) : null}
            {project.links.article ? (
              <a
                href={project.links.article}
                target="_blank"
                rel="noopener noreferrer"
                className={linkStyle}
              >
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                相关文章
              </a>
            ) : null}
          </div>
        </header>

        <img
          src={project.cover}
          alt={project.coverAlt}
          width={1200}
          height={750}
          className="mt-10 aspect-[16/10] w-full rounded-3xl border border-line bg-subtle object-cover shadow-lift"
        />

        {project.highlights?.length ? (
          <section className="card mt-10 p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-[15px] font-semibold text-ink">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-accent/10 text-accent">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              结果
            </h2>
            <ul className="mt-4 grid gap-2.5">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2.5 text-[13.5px] leading-6 text-muted">
                  <span
                    className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-gradient"
                    aria-hidden="true"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="mt-12 max-w-[66ch]">
          <MarkdownRenderer content={project.description} />
        </div>

        <div className="mt-12 flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
      </article>
    </Container>
  );
}
