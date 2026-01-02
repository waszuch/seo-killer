import Link from 'next/link';
import Image from 'next/image';
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

  const staggerClass = `stagger-${Math.min(index + 1, 8)}`;

  if (variant === 'large') {
    return (
      <Link
        href={`/articles/${article.slug}`}
        className={`group block animate-fade-in-up ${staggerClass}`}
      >
        <article className="relative overflow-hidden rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-all duration-500 hover:shadow-2xl hover:shadow-black/30">
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[var(--accent-primary)]/20 via-transparent to-[var(--gold)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative grid md:grid-cols-2 min-h-[400px]">
            {article.imageUrl && (
              <div className="relative h-72 md:h-full overflow-hidden">
                <Image
                  src={article.imageUrl}
                  alt={article.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--bg-card)] md:block hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/20 to-transparent md:hidden" />
              </div>
            )}
            <div className="relative p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-5">
                <span className="tag">
                  {article.meta.keywords[0]}
                </span>
                <span className="decoration-dot opacity-50" />
                <span className="text-xs text-[var(--text-muted)]">
                  {formattedDate}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-display mb-5 text-[var(--text-primary)] group-hover:text-gradient transition-all duration-300 leading-tight">
                {article.meta.title}
              </h3>
              <p className="text-[var(--text-secondary)] mb-8 line-clamp-3 leading-relaxed">
                {article.lead}
              </p>
              <span className="inline-flex items-center gap-3 text-sm font-semibold text-[var(--accent-secondary)] group-hover:gap-4 transition-all duration-300">
                <span className="relative">
                  Czytaj artykuł
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent-primary)] group-hover:w-full transition-all duration-300" />
                </span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        className={`group block animate-fade-in-up ${staggerClass}`}
      >
        <article className="relative py-8 border-b border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/30 transition-all duration-300">
          <div className="absolute inset-0 -mx-4 px-4 rounded-lg bg-[var(--accent-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <span className="tag">
                {article.meta.keywords[0]}
              </span>
              <span className="text-xs text-[var(--text-muted)]">
                {formattedDate}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-display mb-3 text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)] transition-colors duration-300">
              {article.meta.title}
            </h3>
            <p className="text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
              {article.lead}
            </p>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link
        href={`/articles/${article.slug}`}
        className={`group block animate-fade-in-up ${staggerClass}`}
      >
        <article className="relative flex gap-5 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] overflow-hidden transition-all duration-400 hover-lift">
          <div className="absolute inset-0 bg-[var(--gradient-shine)] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          
          {article.imageUrl && (
            <div className="relative w-32 h-24 md:w-44 md:h-32 flex-shrink-0 rounded-lg overflow-hidden">
              <Image
                src={article.imageUrl}
                alt={article.imageAlt}
                fill
                sizes="(max-width: 768px) 128px, 176px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}
          <div className="relative flex flex-col justify-center min-w-0 py-1">
            <span className="tag mb-3 self-start">
              {article.meta.keywords[0]}
            </span>
            <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)] transition-colors duration-300 line-clamp-2 leading-snug">
              {article.meta.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formattedDate}</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link
      href={`/articles/${article.slug}`}
      className={`group block h-full animate-fade-in-up ${staggerClass}`}
    >
      <article className="relative h-full flex flex-col rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] overflow-hidden transition-all duration-400 hover-lift">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/5 via-transparent to-[var(--gold)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
        <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-[var(--accent-primary)]/30 via-transparent to-[var(--accent-secondary)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        
        {article.imageUrl && (
          <div className="relative h-52 overflow-hidden">
            <Image
              src={article.imageUrl}
              alt={article.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-all duration-600 group-hover:scale-110 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/30 to-transparent" />
            
            <div className="absolute top-4 left-4">
              <span className="tag">
                {article.meta.keywords[0]}
              </span>
            </div>
          </div>
        )}
        
        <div className="relative p-6 flex-1 flex flex-col">
          {!article.imageUrl && (
            <span className="tag mb-4 self-start">
              {article.meta.keywords[0]}
            </span>
          )}
          
          <h3 className="text-lg font-semibold mb-3 text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)] transition-colors duration-300 line-clamp-2 leading-snug">
            {article.meta.title}
          </h3>
          
          <p className="text-sm text-[var(--text-secondary)] mb-5 line-clamp-3 flex-1 leading-relaxed">
            {article.lead}
          </p>
          
          <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formattedDate}</span>
            </div>
            
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-secondary)] group-hover:gap-2.5 transition-all duration-300">
              Czytaj
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
