import { Article } from '@/types/article';
import { ArticleCard } from '../ArticleCard';

interface PortalLayoutProps {
  articles: Article[];
  siteName: string;
  niche: string;
}

export function PortalLayout({ articles, siteName, niche }: PortalLayoutProps) {
  const [heroArticle, ...restArticles] = articles;

  return (
    <div>
      {heroArticle && (
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg overflow-hidden shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {heroArticle.imageUrl && (
                <div className="h-96 overflow-hidden">
                  <img
                    src={heroArticle.imageUrl}
                    alt={heroArticle.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-8 text-white">
                <div className="flex gap-2 mb-4">
                  {heroArticle.meta.keywords.slice(0, 2).map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                <h2 className="text-4xl font-bold mb-4">
                  {heroArticle.meta.title}
                </h2>
                <p className="text-xl mb-6 text-blue-100">
                  {heroArticle.lead}
                </p>
                <a
                  href={`/articles/${heroArticle.slug}`}
                  className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Czytaj artykuł
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {restArticles.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Najnowsze artykuły</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

