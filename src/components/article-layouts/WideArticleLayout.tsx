import Link from 'next/link';
import { Article } from '@/types/article';

interface WideArticleLayoutProps {
  article: Article;
}

export function WideArticleLayout({ article }: WideArticleLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {article.imageUrl && (
        <div className="w-full h-96 md:h-[500px] overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Powrót do strony głównej
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <header className="mb-10">
              <h1 className="text-5xl font-bold mb-6 text-gray-900 leading-tight">
                {article.meta.title}
              </h1>
              
              <p className="text-2xl text-gray-600 leading-relaxed mb-6">
                {article.lead}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-500 border-t border-b py-4">
                <span>
                  Opublikowano: {new Date(article.publishedAt || article.createdAt).toLocaleDateString('pl-PL')}
                </span>
              </div>
            </header>

            <div className="prose prose-xl max-w-none">
              {article.sections.map((section, index) => (
                <section key={index} className="mb-10">
                  {section.level === 2 ? (
                    <h2 className="text-3xl font-bold mb-5 text-gray-900">
                      {section.heading}
                    </h2>
                  ) : (
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                      {section.heading}
                    </h3>
                  )}
                  <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>

            {article.faq && article.faq.length > 0 && (
              <section className="mt-16 bg-gray-50 rounded-xl p-8">
                <h2 className="text-3xl font-bold mb-8 text-gray-900">
                  Najczęściej zadawane pytania
                </h2>
                <div className="space-y-8">
                  {article.faq.map((item, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-6">
                      <h3 className="text-xl font-semibold mb-3 text-gray-900">
                        {item.question}
                      </h3>
                      <p className="text-gray-700 text-lg">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  Tematy
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.meta.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {article.internalLinks && article.internalLinks.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">
                    Powiązane artykuły
                  </h3>
                  <div className="space-y-3">
                    {article.internalLinks.map((link, index) => (
                      <Link
                        key={index}
                        href={`/articles/${link.slug}`}
                        className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all"
                      >
                        <p className="font-medium text-gray-900 hover:text-blue-600 text-sm">
                          {link.targetTitle}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {article.externalLinks && article.externalLinks.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">
                    Przydatne linki
                  </h3>
                  <div className="space-y-2">
                    {article.externalLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        {link.text}
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

