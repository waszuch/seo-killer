import { Article } from '@/types/article';
import Link from 'next/link';

interface MasonryListLayoutProps {
  articles: Article[];
  title: string;
}

export function MasonryListLayout({ articles, title }: MasonryListLayoutProps) {
  return (
    <div>
      <header className="mb-12 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-semibold text-[var(--text-primary)]">
          {title}
        </h1>
        <div className="mt-4 h-px bg-gradient-to-r from-[var(--accent-primary)] via-[var(--border-subtle)] to-transparent" />
      </header>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
        {articles.map((article, index) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="block break-inside-avoid mb-6 group animate-fade-in"
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <article className="rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] hover:bg-[var(--bg-card-hover)] overflow-hidden transition-all duration-300">
              {article.imageUrl && (
                <div className="w-full overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.imageAlt}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium uppercase tracking-wider text-[var(--accent-secondary)]">
                    {article.meta.keywords[0]}
                  </span>
                </div>
                <h2 className="text-lg font-medium mb-2 text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)] transition-colors leading-snug">
                  {article.meta.title}
                </h2>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-3 mb-3">
                  {article.lead}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)]">
                  <span className="text-xs text-[var(--text-muted)]">
                    {new Date(article.createdAt).toLocaleDateString('pl-PL')}
                  </span>
                  <span className="text-xs font-medium text-[var(--accent-secondary)]">
                    Czytaj →
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
