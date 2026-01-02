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
    <div className="space-y-20">
      {featured && (
        <section className="animate-fade-in-up">
          <ArticleCard article={featured} variant="large" index={0} />
        </section>
      )}

      {secondary.length > 0 && (
        <section className="animate-fade-in-up stagger-2">
          <div className="section-divider">
            <div className="flex items-center gap-3">
              <span className="decoration-line" />
              <h2 className="section-title">
                Polecane
              </h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {secondary.map((article, index) => (
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
              <h2 className="section-title">
                Więcej artykułów
              </h2>
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
