import { Article } from '@/types/article';
import Link from 'next/link';
import Image from 'next/image';

interface MasonryListLayoutProps {
  articles: Article[];
  title: string;
}

export function MasonryListLayout({ articles, title }: MasonryListLayoutProps) {
  return (
    <div>
      <header className="mb-14 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-display text-gradient mb-4">
          {title}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg">
          {articles.length} {articles.length === 1 ? 'artykuł' : articles.length < 5 ? 'artykuły' : 'artykułów'}
        </p>
        <div className="mt-6 h-px bg-gradient-to-r from-[var(--accent-primary)] via-[var(--border-subtle)] to-transparent" />
      </header>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
        {articles.map((article, index) => {
          const formattedDate = new Date(article.createdAt).toLocaleDateString('pl-PL', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          });
          const staggerClass = `stagger-${Math.min((index % 8) + 1, 8)}`;

          return (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className={`block break-inside-avoid mb-6 group animate-fade-in-up ${staggerClass}`}
            >
              <article className="relative rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] overflow-hidden transition-all duration-400 hover-lift">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/5 via-transparent to-[var(--gold)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                
                <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-[var(--accent-primary)]/30 via-transparent to-[var(--accent-secondary)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                {article.imageUrl && (
                  <div className="relative w-full aspect-video overflow-hidden">
                    <Image
                      src={article.imageUrl}
                      alt={article.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-all duration-600 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-60" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="tag">
                        {article.meta.keywords[0]}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="relative p-5">
                  {!article.imageUrl && (
                    <span className="tag mb-3 inline-flex">
                      {article.meta.keywords[0]}
                    </span>
                  )}
                  
                  <h2 className="text-lg font-semibold mb-3 text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)] transition-colors duration-300 leading-snug">
                    {article.meta.title}
                  </h2>
                  
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-3 mb-4">
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
        })}
      </div>
    </div>
  );
}
