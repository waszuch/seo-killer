import Link from 'next/link';
import { Article } from '@/types/article';

interface WideArticleLayoutProps {
  article: Article;
}

export function WideArticleLayout({ article }: WideArticleLayoutProps) {
  const formattedDate = new Date(article.publishedAt || article.createdAt).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {article.imageUrl && (
        <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="container mx-auto max-w-6xl">
              <nav className="mb-6 animate-fade-in">
                <Link 
                  href="/" 
                  className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Strona główna
                </Link>
              </nav>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-[var(--accent-primary)] text-white rounded-full">
                  {article.meta.keywords[0]}
                </span>
                <span className="text-sm text-white/70">
                  {formattedDate}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight max-w-4xl animate-slide-up">
                {article.meta.title}
              </h1>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {!article.imageUrl && (
          <nav className="mb-10">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-secondary)] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Strona główna
            </Link>
          </nav>
        )}

        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <article className="animate-fade-in">
              {!article.imageUrl && (
                <header className="mb-12">
                  <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-[var(--text-primary)] leading-tight">
                    {article.meta.title}
                  </h1>
                </header>
              )}

              <p className="text-xl md:text-2xl text-[var(--text-secondary)] leading-relaxed mb-12 font-serif">
                {article.lead}
              </p>

              <div className="prose-dark">
                {article.sections.map((section, index) => (
                  <section key={index} className="mb-12">
                    {section.level === 2 ? (
                      <h2 className="text-2xl md:text-3xl font-semibold mb-5 text-[var(--text-primary)]">
                        {section.heading}
                      </h2>
                    ) : (
                      <h3 className="text-xl md:text-2xl font-medium mb-4 text-[var(--text-primary)]">
                        {section.heading}
                      </h3>
                    )}
                    <div className="text-lg text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </section>
                ))}
              </div>

              {article.faq && article.faq.length > 0 && (
                <section className="mt-16 p-8 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                  <h2 className="text-2xl font-semibold mb-8 text-[var(--text-primary)]">
                    FAQ
                  </h2>
                  <div className="space-y-8">
                    {article.faq.map((item, index) => (
                      <div key={index} className="border-l-2 border-[var(--accent-primary)] pl-6">
                        <h3 className="text-lg font-medium mb-3 text-[var(--text-primary)]">
                          {item.question}
                        </h3>
                        <p className="text-[var(--text-secondary)] leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </article>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              <div className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                <h3 className="text-sm font-medium uppercase tracking-wider text-[var(--text-muted)] mb-4">
                  Tematy
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.meta.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-lg text-sm border border-[var(--border-subtle)]"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {article.internalLinks && article.internalLinks.length > 0 && (
                <div className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                  <h3 className="text-sm font-medium uppercase tracking-wider text-[var(--text-muted)] mb-4">
                    Powiązane
                  </h3>
                  <div className="space-y-3">
                    {article.internalLinks.map((link, index) => (
                      <Link
                        key={index}
                        href={`/articles/${link.slug}`}
                        className="group block p-3 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
                      >
                        <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)] transition-colors">
                          {link.targetTitle}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {article.externalLinks && article.externalLinks.length > 0 && (
                <div className="p-6 rounded-xl bg-[var(--accent-muted)] border border-[var(--accent-primary)]/20">
                  <h3 className="text-sm font-medium uppercase tracking-wider text-[var(--text-muted)] mb-4">
                    Linki
                  </h3>
                  <div className="space-y-2">
                    {article.externalLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-[var(--accent-secondary)] hover:underline"
                      >
                        {link.text}
                        <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
