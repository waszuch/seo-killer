import { Article } from '@/types/article';
import { ArticleCard } from '../ArticleCard';

interface MagazineLayoutProps {
  articles: Article[];
  siteName: string;
  niche: string;
}

export function MagazineLayout({ articles, siteName, niche }: MagazineLayoutProps) {
  const [featured, ...rest] = articles;
  const secondary = rest.slice(0, 2);
  const remaining = rest.slice(2);

  return (
    <div className="space-y-16">
      {featured && (
        <section className="animate-fade-in">
          <ArticleCard article={featured} variant="large" index={0} />
        </section>
      )}

      {secondary.length > 0 && (
        <section>
          <div className="flex items-center gap-4 mb-8">
            <span className="w-8 h-px bg-[var(--accent-primary)]" />
            <h2 className="text-sm font-medium uppercase tracking-widest text-[var(--text-muted)]">
              Polecane
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {secondary.map((article, index) => (
              <ArticleCard key={article.id} article={article} variant="horizontal" index={index} />
            ))}
          </div>
        </section>
      )}

      {remaining.length > 0 && (
        <section>
          <div className="flex items-center gap-4 mb-8">
            <span className="w-8 h-px bg-[var(--accent-primary)]" />
            <h2 className="text-sm font-medium uppercase tracking-widest text-[var(--text-muted)]">
              Więcej artykułów
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {remaining.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
