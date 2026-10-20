import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PostCard } from '@/components/blog/PostCard';
import { publishedPosts } from '@/lib/markdown';
import { blogConfig } from '@/config';

export function BlogPreviewSection() {
  const posts = publishedPosts.slice(0, blogConfig.previewCount);

  return (
    <section id="blog" className="scroll-mt-24 py-16 sm:py-24">
      <Container>
        <SectionHeading
          index="04 — Writing"
          title="最近写的"
          description="把踩过的坑整理成可以复用的结论。"
        />

        {posts.length > 0 ? (
          <div className="card mt-12 overflow-hidden">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-sm text-muted">还没有发布的文章。</p>
        )}

        <div className="mt-6 flex justify-end">
          <Link
            to="/blog"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-surface px-5 text-[13px] text-muted shadow-soft transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:text-ink hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            全部文章
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
