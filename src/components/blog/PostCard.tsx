import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Tag } from '@/components/ui/Tag';
import { formatDate } from '@/lib/format';
import type { BlogPostMeta } from '@/types';

export function PostCard({ post }: { post: BlogPostMeta }) {
  return (
    <article className="group border-b border-line last:border-b-0">
      <div className="grid gap-2 px-5 py-6 transition-colors duration-200 hover:bg-subtle/60 sm:grid-cols-[116px_1fr] sm:gap-8 sm:px-7 sm:py-7">
        <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted sm:block">
          <time dateTime={post.date} className="sm:block">
            {formatDate(post.date)}
          </time>
          <span className="text-line sm:hidden" aria-hidden="true">
            /
          </span>
          <span className="sm:mt-1.5 sm:block">{post.readingTime} 分钟</span>
        </div>

        <div>
          <h3 className="display text-[17px] leading-snug text-ink">
            <Link
              to={`/blog/${post.slug}`}
              className="inline-flex items-start gap-1.5 transition-colors group-hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
            >
              {post.title}
              <ArrowUpRight
                className="mt-1 h-3.5 w-3.5 shrink-0 text-muted opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent group-hover:opacity-100"
                aria-hidden="true"
              />
            </Link>
          </h3>
          <p className="mt-2 max-w-measure text-[13.5px] leading-6 text-muted">{post.summary}</p>
          {post.tags.length > 0 ? (
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
