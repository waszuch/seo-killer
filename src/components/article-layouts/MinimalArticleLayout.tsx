import Link from 'next/link';
import { Article } from '@/types/article';

interface MinimalArticleLayoutProps {
  article: Article;
}

export function MinimalArticleLayout({ article }: MinimalArticleLayoutProps) {
  const formattedDate = new Date(article.publishedAt || article.createdAt).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <nav className="mb-16 animate-fade-in">
          <Link 
            href="/" 
            className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-secondary)] transition-colors"
          >
            ← Powrót
          </Link>
        </nav>

        <article className="animate-slide-up">
          <header className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-widest text-[var(--accent-secondary)] mb-6 block">
              {article.meta.keywords[0]}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium mb-8 text-[var(--text-primary)] leading-tight">
              {article.meta.title}
            </h1>
            
            <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed font-serif italic">
              {article.lead}
            </p>

            <div className="mt-10 text-sm text-[var(--text-muted)]">
              {formattedDate}
            </div>

            <div className="mt-10 flex justify-center">
              <div className="w-12 h-px bg-[var(--border-default)]" />
            </div>
          </header>

          {article.imageUrl && (
            <figure className="mb-16">
              <img
                src={article.imageUrl}
                alt={article.imageAlt}
                className="w-full h-auto rounded-sm"
              />
            </figure>
          )}

          <div className="prose-dark">
            {article.sections.map((section, index) => (
              <section key={index} className="mb-14">
                {section.level === 2 ? (
                  <h2 className="text-2xl font-serif font-medium mb-6 text-[var(--text-primary)] text-center">
                    {section.heading}
                  </h2>
                ) : (
                  <h3 className="text-xl font-serif font-medium mb-5 text-[var(--text-primary)]">
                    {section.heading}
                  </h3>
                )}
                <div className="text-[var(--text-secondary)] text-lg leading-relaxed whitespace-pre-line font-serif">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          {article.faq && article.faq.length > 0 && (
            <section className="mt-20 pt-16 border-t border-[var(--border-subtle)]">
              <h2 className="text-xl font-serif font-medium mb-10 text-[var(--text-primary)] text-center">
                Pytania i odpowiedzi
              </h2>
              <div className="space-y-10">
                {article.faq.map((item, index) => (
                  <div key={index} className="text-center">
                    <h3 className="text-lg font-medium mb-3 text-[var(--text-primary)]">
                      {item.question}
                    </h3>
                    <p className="text-[var(--text-secondary)] font-serif leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {article.internalLinks && article.internalLinks.length > 0 && (
            <section className="mt-20 pt-16 border-t border-[var(--border-subtle)]">
              <h2 className="text-sm font-medium uppercase tracking-widest text-[var(--text-muted)] mb-8 text-center">
                Przeczytaj również
              </h2>
              <div className="space-y-4 text-center">
                {article.internalLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={`/articles/${link.slug}`}
                    className="block py-3 text-[var(--text-primary)] hover:text-[var(--accent-secondary)] transition-colors font-medium"
                  >
                    {link.targetTitle}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {article.externalLinks && article.externalLinks.length > 0 && (
            <footer className="mt-20 pt-10 border-t border-[var(--border-subtle)] text-center">
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-4">
                Źródła
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {article.externalLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--accent-secondary)] hover:underline"
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            </footer>
          )}
        </article>
      </div>
    </div>
  );
}
