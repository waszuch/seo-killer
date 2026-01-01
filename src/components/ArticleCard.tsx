import Link from 'next/link';
import { Article } from '@/types/article';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'large' | 'minimal' | 'horizontal';
  index?: number;
}

export function ArticleCard({ article, variant = 'default', index = 0 }: ArticleCardProps) {
  const formattedDate = new Date(article.createdAt).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  if (variant === 'large') {
    return (
      <Link
        href={`/articles/${article.slug}`}
        className="group block animate-fade-in"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <article className="relative overflow-hidden rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-all duration-500">
          <div className="grid md:grid-cols-2">
            {article.imageUrl && (
              <div className="relative h-72 md:h-96 overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/60 via-transparent to-transparent" />
              </div>
            )}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-medium uppercase tracking-wider text-[var(--accent-secondary)]">
                  {article.meta.keywords[0]}
                </span>
                <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                <span className="text-xs text-[var(--text-muted)]">
                  {formattedDate}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)] transition-colors duration-300 leading-tight">
                {article.meta.title}
              </h3>
              <p className="text-[var(--text-secondary)] mb-6 line-clamp-3 leading-relaxed">
                {article.lead}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-secondary)] group-hover:gap-3 transition-all duration-300">
                Czytaj artykuł
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === 'minimal') {
    return (
      <Link
        href={`/articles/${article.slug}`}
        className="group block animate-fade-in"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <article className="py-8 border-b border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--accent-secondary)]">
              {article.meta.keywords[0]}
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              {formattedDate}
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-serif font-medium mb-3 text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)] transition-colors duration-300">
            {article.meta.title}
          </h3>
          <p className="text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
            {article.lead}
          </p>
        </article>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link
        href={`/articles/${article.slug}`}
        className="group block animate-fade-in"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <article className="flex gap-5 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] hover:bg-[var(--bg-card-hover)] transition-all duration-300">
          {article.imageUrl && (
            <div className="w-32 h-24 md:w-40 md:h-28 flex-shrink-0 rounded-lg overflow-hidden">
              <img
                src={article.imageUrl}
                alt={article.imageAlt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          <div className="flex flex-col justify-center min-w-0">
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--accent-secondary)] mb-2">
              {article.meta.keywords[0]}
            </span>
            <h3 className="text-lg font-medium mb-2 text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)] transition-colors duration-300 line-clamp-2">
              {article.meta.title}
            </h3>
            <span className="text-xs text-[var(--text-muted)]">
              {formattedDate}
            </span>
          </div>
        </article>
      </Link>
    );
  }

  // Default card
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block h-full animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <article className="h-full flex flex-col rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] hover:bg-[var(--bg-card-hover)] overflow-hidden transition-all duration-300">
        {article.imageUrl && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.imageAlt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-60" />
          </div>
        )}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--accent-secondary)]">
              {article.meta.keywords[0]}
            </span>
          </div>
          <h3 className="text-lg font-medium mb-3 text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)] transition-colors duration-300 line-clamp-2 leading-snug">
            {article.meta.title}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-3 flex-1">
            {article.lead}
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)]">
            <span className="text-xs text-[var(--text-muted)]">
              {formattedDate}
            </span>
            <span className="text-xs font-medium text-[var(--accent-secondary)] group-hover:translate-x-1 transition-transform duration-300">
              Czytaj →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
