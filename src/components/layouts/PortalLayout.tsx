import { Article } from '@/types/article';
import { ArticleCard } from '../ArticleCard';
import Link from 'next/link';
import Image from 'next/image';

interface PortalLayoutProps {
  articles: Article[];
  siteName: string;
  niche: string;
}

export function PortalLayout({ articles, siteName, niche }: PortalLayoutProps) {
  const [heroArticle, ...restArticles] = articles;
  const featured = restArticles.slice(0, 2);
  const remaining = restArticles.slice(2);

  const formattedDate = heroArticle ? new Date(heroArticle.createdAt).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) : '';

  return (
    <div className="space-y-20">
      {heroArticle && (
        <section className="animate-fade-in-up">
          <Link href={`/articles/${heroArticle.slug}`} className="group block">
            <div className="relative rounded-3xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-all duration-600">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[var(--accent-primary)]/20 via-transparent to-[var(--gold)]/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
              
              <div className="relative grid lg:grid-cols-5 min-h-[520px]">
                {heroArticle.imageUrl && (
                  <div className="lg:col-span-3 relative h-80 lg:h-auto overflow-hidden">
                    <Image
                      src={heroArticle.imageUrl}
                      alt={heroArticle.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--bg-card)] hidden lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/30 to-transparent lg:hidden" />
                    
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--accent-primary)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden lg:block" />
                  </div>
                )}
                
                <div className="lg:col-span-2 p-10 lg:p-14 flex flex-col justify-center relative">
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-10 right-10 w-24 h-24 rounded-full border border-[var(--border-subtle)]" />
                    <div className="absolute bottom-20 right-20 w-12 h-12 rounded-full border border-[var(--border-subtle)]" />
                  </div>
                  
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-7">
                      <span className="tag tag-gold">
                        {heroArticle.meta.keywords[0]}
                      </span>
                      <span className="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formattedDate}
                      </span>
                    </div>
                    
                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display mb-6 text-[var(--text-primary)] group-hover:text-gradient transition-all duration-300 leading-tight">
                      {heroArticle.meta.title}
                    </h2>
                    
                    <p className="text-lg text-[var(--text-secondary)] mb-10 line-clamp-3 leading-relaxed">
                      {heroArticle.lead}
                    </p>
                    
                    <span className="inline-flex items-center gap-3 text-sm font-semibold text-[var(--accent-secondary)] group-hover:gap-4 transition-all duration-300">
                      <span className="relative">
                        Czytaj artykuł
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] group-hover:w-full transition-all duration-400" />
                      </span>
                      <div className="w-10 h-10 rounded-full bg-[var(--accent-muted)] flex items-center justify-center group-hover:bg-[var(--accent-primary)] transition-all duration-300">
                        <svg className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {featured.length > 0 && (
        <section className="animate-fade-in-up stagger-2">
          <div className="section-divider">
            <div className="flex items-center gap-3">
              <span className="decoration-line" />
              <h2 className="section-title">Wyróżnione</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((article, index) => (
              <ArticleCard key={article.id} article={article} variant="horizontal" index={index + 1} />
            ))}
          </div>
        </section>
      )}

      {remaining.length > 0 && (
        <section className="animate-fade-in-up stagger-4">
          <div className="section-divider">
            <div className="flex items-center gap-3">
              <span className="decoration-line" />
              <h2 className="section-title">Najnowsze artykuły</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remaining.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index + 3} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
