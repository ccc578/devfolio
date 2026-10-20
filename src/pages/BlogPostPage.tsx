import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';
import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { getPost } from '@/lib/markdown';
import { formatDate } from '@/lib/format';
import { site } from '@/config';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  useDocumentMeta({
    title: post ? `${post.title} · ${site.author}` : `文章不存在 · ${site.author}`,
    description: post?.summary,
  });

  if (!post) return <NotFoundPage />;

  return (
    <Container>
      <article className="py-14 sm:py-20">
        <Link
          to="/blog"
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-surface px-4 text-[12.5px] text-muted shadow-soft transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:text-ink hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          全部文章
        </Link>

        <header className="mt-10 max-w-3xl">
          <span className="chip">Writing</span>
          <h1 className="display mt-5 text-[28px] leading-[1.18] text-ink sm:text-[40px]">
            {post.title}
          </h1>
          <p className="mt-4 text-[15px] leading-8 text-muted">{post.summary}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="h-1 w-1 rounded-full bg-line" aria-hidden="true" />
            <span>{post.readingTime} 分钟阅读</span>
            {post.updated ? (
              <>
                <span className="h-1 w-1 rounded-full bg-line" aria-hidden="true" />
                <span>更新于 {formatDate(post.updated)}</span>
              </>
            ) : null}
          </div>

          {post.tags.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          ) : null}
        </header>

        <div className="mt-10 max-w-[66ch]">
          <MarkdownRenderer content={post.content} />
        </div>

        <footer className="mt-14 max-w-[66ch]">
          <div className="rule" aria-hidden="true" />
          <Link
            to="/blog"
            className="mt-6 inline-flex h-10 items-center gap-1.5 rounded-full border border-line bg-surface px-4 text-[12.5px] text-muted shadow-soft transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:text-ink hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            返回文章列表
          </Link>
        </footer>
      </article>
    </Container>
  );
}
