import { Article } from '@/types/article';
import { ArticleCard } from '../ArticleCard';
import Link from 'next/link';

interface PortalLayoutProps {
  articles: Article[];
  siteName: string;
  niche: string;
}

export function PortalLayout({ articles, siteName, niche }: PortalLayoutProps) {
  const [heroArticle, ...restArticles] = articles;
  const featured = restArticles.slice(0, 2);
  const remaining = restArticles.slice(2);

  return (
    <div className="space-y-16">
      {heroArticle && (
        <section className="animate-fade-in">
          <Link href={`/articles/${heroArticle.slug}`} className="group block">
            <div className="relative rounded-2xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-all duration-500">
              <div className="grid lg:grid-cols-5 min-h-[480px]">
                {heroArticle.imageUrl && (
                  <div className="lg:col-span-3 relative h-72 lg:h-auto overflow-hidden">
                    <img
                      src={heroArticle.imageUrl}
                      alt={heroArticle.imageAlt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--bg-card)] hidden lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent lg:hidden" />
                  </div>
                )}
                <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-[var(--accent-muted)] text-[var(--accent-secondary)] rounded-full">
                      {heroArticle.meta.keywords[0]}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">
                      {new Date(heroArticle.createdAt).toLocaleDateString('pl-PL')}
                    </span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-semibold mb-5 text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)] transition-colors duration-300 leading-tight">
                    {heroArticle.meta.title}
                  </h2>
                  <p className="text-lg text-[var(--text-secondary)] mb-8 line-clamp-3 leading-relaxed">
                    {heroArticle.lead}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-secondary)] group-hover:gap-3 transition-all duration-300">
                    Czytaj artykuł
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {featured.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-medium text-[var(--text-primary)]">
              Wyróżnione
            </h2>
            <div className="h-px flex-1 ml-6 bg-[var(--border-subtle)]" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((article, index) => (
              <ArticleCard key={article.id} article={article} variant="horizontal" index={index} />
            ))}
          </div>
        </section>
      )}

      {remaining.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-medium text-[var(--text-primary)]">
              Najnowsze artykuły
            </h2>
            <div className="h-px flex-1 ml-6 bg-[var(--border-subtle)]" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remaining.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
