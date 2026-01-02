import Link from 'next/link';
import Image from 'next/image';
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
    <div className="min-h-screen relative">
      <div className="hero-glow top-0 left-1/2 -translate-x-1/2 opacity-30" />
      
      <div className="relative container mx-auto px-4 py-16 md:py-20 max-w-2xl">
        <nav className="mb-16 animate-fade-in-down text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-secondary)] transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Powrót</span>
          </Link>
        </nav>

        <article className="animate-slide-up">
          <header className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--accent-secondary)] mb-8">
              <span className="w-6 h-px bg-[var(--accent-primary)]" />
              {article.meta.keywords[0]}
              <span className="w-6 h-px bg-[var(--accent-primary)]" />
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display mb-10 text-gradient leading-tight">
              {article.meta.title}
            </h1>
            
            <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed italic max-w-xl mx-auto">
              {article.lead}
            </p>

            <div className="mt-10 flex items-center justify-center gap-3 text-sm text-[var(--text-muted)]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formattedDate}
            </div>

            <div className="mt-12 flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-gradient-to-l from-[var(--border-default)] to-transparent" />
              <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
              <div className="w-12 h-px bg-gradient-to-r from-[var(--border-default)] to-transparent" />
            </div>
          </header>

          {article.imageUrl && (
            <figure className="relative mb-16 rounded-xl overflow-hidden border border-[var(--border-subtle)]">
              <div className="relative h-80 md:h-96">
                <Image
                  src={article.imageUrl}
                  alt={article.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                  priority
                />
              </div>
            </figure>
          )}

          <div className="prose-dark">
            {article.sections.map((section, index) => (
              <section key={index} className="mb-14 animate-fade-in-up" style={{ animationDelay: `${0.1 + index * 0.05}s` }}>
                {section.level === 2 ? (
                  <h2 className="text-2xl md:text-3xl font-display mb-6 text-[var(--text-primary)] text-center">
                    {section.heading}
                  </h2>
                ) : (
                  <h3 className="text-xl md:text-2xl font-semibold mb-5 text-[var(--text-primary)]">
                    {section.heading}
                  </h3>
                )}
                <div className="text-[var(--text-secondary)] text-lg leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          {article.faq && article.faq.length > 0 && (
            <section className="mt-20 pt-16 border-t border-[var(--border-subtle)]">
              <h2 className="text-xl md:text-2xl font-display mb-12 text-[var(--text-primary)] text-center flex items-center justify-center gap-3">
                <span className="w-8 h-px bg-gradient-to-l from-[var(--accent-primary)] to-transparent" />
                Pytania i odpowiedzi
                <span className="w-8 h-px bg-gradient-to-r from-[var(--accent-primary)] to-transparent" />
              </h2>
              <div className="space-y-8">
                {article.faq.map((item, index) => (
                  <div key={index} className="text-center p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                    <h3 className="text-lg font-semibold mb-4 text-[var(--accent-secondary)]">
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

          {article.internalLinks && article.internalLinks.length > 0 && (
            <section className="mt-20 pt-16 border-t border-[var(--border-subtle)]">
              <h2 className="section-title text-center mb-10">
                Przeczytaj również
              </h2>
              <div className="space-y-4">
                {article.internalLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={`/articles/${link.slug}`}
                    className="group block text-center py-4 px-6 rounded-xl hover:bg-[var(--bg-card)] border border-transparent hover:border-[var(--border-subtle)] transition-all duration-300"
                  >
                    <span className="text-[var(--text-primary)] font-medium group-hover:text-[var(--accent-secondary)] transition-colors duration-300">
                      {link.targetTitle}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {article.externalLinks && article.externalLinks.length > 0 && (
            <footer className="mt-20 pt-10 border-t border-[var(--border-subtle)] text-center">
              <p className="section-title mb-6">
                Źródła
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {article.externalLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[var(--accent-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300"
                  >
                    {link.text}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
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
