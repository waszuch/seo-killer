import Link from 'next/link';
import { Article } from '@/types/article';

interface MinimalArticleLayoutProps {
  article: Article;
}

export function MinimalArticleLayout({ article }: MinimalArticleLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <nav className="mb-12">
          <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
            ← Strona główna
          </Link>
        </nav>

        <article>
          <header className="mb-12 text-center">
            <div className="mb-6">
              {article.meta.keywords.slice(0, 1).map((keyword, index) => (
                <span
                  key={index}
                  className="text-sm uppercase tracking-wider text-blue-600 font-medium"
                >
                  {keyword}
                </span>
              ))}
            </div>

            <h1 className="text-5xl font-serif font-bold mb-8 text-gray-900 leading-tight">
              {article.meta.title}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed font-light">
              {article.lead}
            </p>

            <div className="mt-8 text-sm text-gray-400">
              {new Date(article.publishedAt || article.createdAt).toLocaleDateString('pl-PL', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </header>

          {article.imageUrl && (
            <figure className="mb-12">
              <img
                src={article.imageUrl}
                alt={article.imageAlt}
                className="w-full h-auto rounded-sm"
              />
            </figure>
          )}

          <div className="prose prose-lg prose-gray max-w-none">
            {article.sections.map((section, index) => (
              <section key={index} className="mb-12">
                {section.level === 2 ? (
                  <h2 className="text-3xl font-serif font-bold mb-6 text-gray-900">
                    {section.heading}
                  </h2>
                ) : (
                  <h3 className="text-2xl font-serif font-semibold mb-5 text-gray-800">
                    {section.heading}
                  </h3>
                )}
                <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line font-light">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          {article.faq && article.faq.length > 0 && (
            <section className="mt-16 pt-12 border-t border-gray-200">
              <h2 className="text-2xl font-serif font-bold mb-8 text-gray-900 text-center">
                Pytania i odpowiedzi
              </h2>
              <div className="space-y-8">
                {article.faq.map((item, index) => (
                  <div key={index}>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      {item.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {(article.internalLinks && article.internalLinks.length > 0) && (
            <section className="mt-16 pt-12 border-t border-gray-200">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 text-center">
                Przeczytaj również
              </h2>
              <div className="space-y-4">
                {article.internalLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={`/articles/${link.slug}`}
                    className="block text-center py-3 hover:text-blue-600 transition-colors"
                  >
                    <span className="font-medium">{link.targetTitle}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        {article.externalLinks && article.externalLinks.length > 0 && (
          <footer className="mt-16 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500 mb-4">Źródła i dodatkowe informacje:</p>
            <div className="flex flex-wrap justify-center gap-4">
              {article.externalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

