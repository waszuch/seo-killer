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
    <div>
      {featured && (
        <section className="mb-12">
          <ArticleCard article={featured} variant="large" />
        </section>
      )}

      {secondary.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Polecane</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {secondary.map((article) => (
              <ArticleCard key={article.id} article={article} variant="horizontal" />
            ))}
          </div>
        </section>
      )}

      {remaining.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Więcej artykułów</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {remaining.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}


