import Link from 'next/link';
import { Article } from '@/types/article';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'large' | 'minimal' | 'horizontal';
}

export function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  if (variant === 'large') {
    return (
      <Link
        href={`/articles/${article.slug}`}
        className="group block"
      >
        <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
          {article.imageUrl && (
            <div className="relative w-full h-64 overflow-hidden">
              <img
                src={article.imageUrl}
                alt={article.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-3">
              {article.meta.keywords.slice(0, 2).map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
              {article.meta.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {article.lead}
            </p>
            <span className="text-blue-600 font-medium hover:underline">
              Czytaj więcej →
            </span>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === 'minimal') {
    return (
      <Link
        href={`/articles/${article.slug}`}
        className="group block py-6 border-b border-gray-200 hover:bg-gray-50 transition-colors"
      >
        <article>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
            {article.meta.title}
          </h3>
          <p className="text-gray-600 mb-2 line-clamp-2">
            {article.lead}
          </p>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>{new Date(article.createdAt).toLocaleDateString('pl-PL')}</span>
            {article.meta.keywords[0] && (
              <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                {article.meta.keywords[0]}
              </span>
            )}
          </div>
        </article>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link
        href={`/articles/${article.slug}`}
        className="group block"
      >
        <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex">
          {article.imageUrl && (
            <div className="w-48 h-48 flex-shrink-0 overflow-hidden">
              <img
                src={article.imageUrl}
                alt={article.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="p-6 flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {article.meta.title}
              </h3>
              <p className="text-gray-600 line-clamp-3">
                {article.lead}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {article.meta.keywords.slice(0, 2).map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block h-full"
    >
      <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full">
        {article.imageUrl && (
          <div className="w-full h-48 overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.imageAlt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {article.meta.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
            {article.lead}
          </p>
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
          <span className="text-blue-600 text-sm font-medium hover:underline">
            Czytaj więcej →
          </span>
        </div>
      </article>
    </Link>
  );
}

