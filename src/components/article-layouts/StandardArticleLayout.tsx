import Link from 'next/link';
import { Article } from '@/types/article';

interface StandardArticleLayoutProps {
  article: Article;
}

export function StandardArticleLayout({ article }: StandardArticleLayoutProps) {
  const formattedDate = new Date(article.publishedAt || article.createdAt).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <nav className="mb-10 animate-fade-in">
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

        <article className="animate-slide-up">
          {article.imageUrl && (
            <figure className="mb-10 rounded-xl overflow-hidden">
              <img
                src={article.imageUrl}
                alt={article.imageAlt}
                className="w-full h-auto max-h-[480px] object-cover"
              />
            </figure>
          )}

          <header className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-medium uppercase tracking-wider text-[var(--accent-secondary)]">
                {article.meta.keywords[0]}
              </span>
              <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
              <span className="text-xs text-[var(--text-muted)]">
                {formattedDate}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-[var(--text-primary)] leading-tight">
              {article.meta.title}
            </h1>
            
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
              {article.lead}
            </p>
          </header>

          <div className="prose-dark">
            {article.sections.map((section, index) => (
              <section key={index} className="mb-10">
                {section.level === 2 ? (
                  <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">
                    {section.heading}
                  </h2>
                ) : (
                  <h3 className="text-xl font-medium mb-3 text-[var(--text-primary)]">
                    {section.heading}
                  </h3>
                )}
                <div className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          {article.meta.keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-[var(--border-subtle)]">
              {article.meta.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-lg text-sm border border-[var(--border-subtle)]"
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}

          {article.faq && article.faq.length > 0 && (
            <section className="mt-16 p-8 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
              <h2 className="text-xl font-semibold mb-8 text-[var(--text-primary)]">
                Najczęściej zadawane pytania
              </h2>
              <div className="space-y-8">
                {article.faq.map((item, index) => (
                  <div key={index} className="border-l-2 border-[var(--accent-primary)] pl-5">
                    <h3 className="text-lg font-medium mb-2 text-[var(--text-primary)]">
                      {item.question}
                    </h3>
                    <p className="text-[var(--text-secondary)]">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {article.internalLinks && article.internalLinks.length > 0 && (
            <section className="mt-16">
              <h2 className="text-lg font-medium mb-6 text-[var(--text-muted)] uppercase tracking-wider">
                Zobacz także
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {article.internalLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={`/articles/${link.slug}`}
                    className="group p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)] hover:bg-[var(--bg-card-hover)] transition-all duration-300"
                  >
                    <h3 className="font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)] transition-colors">
                      {link.targetTitle}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {article.externalLinks && article.externalLinks.length > 0 && (
            <section className="mt-10 p-6 rounded-xl bg-[var(--accent-muted)] border border-[var(--accent-primary)]/20">
              <h3 className="text-sm font-medium mb-4 text-[var(--text-muted)] uppercase tracking-wider">
                Przydatne linki
              </h3>
              <div className="flex flex-wrap gap-3">
                {article.externalLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-sm text-[var(--accent-secondary)] hover:border-[var(--accent-primary)] transition-colors"
                  >
                    {link.text}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </div>
  );
}
