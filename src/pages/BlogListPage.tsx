import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PostCard } from '@/components/blog/PostCard';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { getAllTags, publishedPosts } from '@/lib/markdown';
import { site } from '@/config';
import { cn } from '@/lib/cn';

const ALL = '全部';

export default function BlogListPage() {
  useDocumentMeta({
    title: `文章 · ${site.author}`,
    description: '关于前端工程化、构建工具与可访问性的实践记录。',
  });

  const [activeTag, setActiveTag] = useState(ALL);
  const tags = useMemo(() => [ALL, ...getAllTags()], []);
  const posts = useMemo(
    () =>
      activeTag === ALL
        ? publishedPosts
        : publishedPosts.filter((post) => post.tags.includes(activeTag)),
    [activeTag],
  );

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
          <span className="chip">Writing</span>
        </div>
        <h1 className="display mt-5 text-[34px] leading-[1.05] text-ink sm:text-[46px]">文章</h1>
        <p className="mt-4 max-w-2xl text-[14.5px] leading-7 text-muted">
          共 {publishedPosts.length} 篇。内容关于构建、部署、类型设计，以及踩过的坑。
        </p>

        <div className="mt-9 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              aria-pressed={activeTag === tag}
              className={cn(
                'inline-flex h-9 items-center rounded-full border px-4 text-[12.5px] transition-all duration-200 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                activeTag === tag
                  ? 'border-transparent bg-accent text-onaccent shadow-glow'
                  : 'border-line bg-surface text-muted shadow-soft hover:-translate-y-0.5 hover:text-ink hover:shadow-lift',
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="card mt-8 overflow-hidden">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.slug} post={post} />)
          ) : (
            <p className="px-6 py-12 text-sm text-muted">该标签下暂无文章。</p>
          )}
        </div>
      </div>
    </Container>
  );
}
