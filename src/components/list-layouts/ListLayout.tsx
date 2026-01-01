import { Article } from '@/types/article';
import Link from 'next/link';

interface ListLayoutProps {
  articles: Article[];
  title: string;
}

export function ListLayout({ articles, title }: ListLayoutProps) {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">{title}</h1>
      <div className="space-y-6">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="block group"
          >
            <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
              <div className="flex gap-6">
                {article.imageUrl && (
                  <div className="w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={article.imageUrl}
                      alt={article.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {article.meta.keywords.slice(0, 2).map((keyword, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {article.meta.title}
                  </h2>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {article.lead}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>
                      {new Date(article.createdAt).toLocaleDateString('pl-PL')}
                    </span>
                    <span className="text-blue-600 font-medium group-hover:underline">
                      Czytaj więcej →
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}


