import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { projects, site } from '@/config';

export default function ProjectsPage() {
  useDocumentMeta({
    title: `项目 · ${site.author}`,
    description: '全部项目作品：背景、职责、技术方案与结果。',
  });

  const sorted = [...projects].sort((a, b) => a.order - b.order);

  return (
    <Container>
      <div className="py-14 sm:py-20">
        <Link
          to="/"
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-surface px-4 text-[12.5px] text-muted shadow-soft transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:text-ink hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          返回首页
        </Link>

        <div className="mt-10">
          <span className="chip">Projects</span>
        </div>
        <h1 className="display mt-5 text-[34px] leading-[1.05] text-ink sm:text-[46px]">项目</h1>
        <p className="mt-4 max-w-2xl text-[14.5px] leading-7 text-muted">
          共 {sorted.length} 个项目。每个条目都包含背景、我负责的部分和技术结果。
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </Container>
  );
}
