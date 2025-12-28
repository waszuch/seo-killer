import { Article } from '@/types/article';
import Link from 'next/link';

interface MasonryListLayoutProps {
  articles: Article[];
  title: string;
}

export function MasonryListLayout({ articles, title }: MasonryListLayoutProps) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-gray-900">{title}</h1>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="block break-inside-avoid mb-6 group"
          >
            <article className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
              {article.imageUrl && (
                <div className="w-full overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.imageAlt}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                  {article.meta.keywords.slice(0, 2).map((keyword, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {article.meta.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {article.lead}
                </p>
                <div className="mt-3 text-sm text-gray-500">
                  {new Date(article.createdAt).toLocaleDateString('pl-PL')}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}

