import Link from 'next/link';
import Image from 'next/image';
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
    <div className="min-h-screen relative">
      {article.imageUrl && (
        <div className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.imageAlt}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/50 to-[var(--bg-primary)]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)]/30 via-transparent to-[var(--bg-primary)]/30" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="container mx-auto max-w-6xl">
              <nav className="mb-8 animate-fade-in-down">
                <Link 
                  href="/" 
                  className="group inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                    <svg className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </div>
                  <span className="font-medium">Strona główna</span>
                </Link>
              </nav>
              
              <div className="flex items-center gap-4 mb-5 animate-fade-in-up">
                <span className="tag tag-gold">
                  {article.meta.keywords[0]}
                </span>
                <span className="text-sm text-white/60 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formattedDate}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display text-white leading-tight max-w-4xl animate-slide-up">
                {article.meta.title}
              </h1>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
        {!article.imageUrl && (
          <nav className="mb-12 animate-fade-in-down">
            <Link 
              href="/" 
              className="group inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-secondary)] transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center group-hover:border-[var(--accent-primary)] transition-all duration-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </div>
              <span className="font-medium">Strona główna</span>
            </Link>
          </nav>
        )}

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <article className="animate-fade-in-up">
              {!article.imageUrl && (
                <header className="mb-14">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="tag">
                      {article.meta.keywords[0]}
                    </span>
                    <span className="text-sm text-[var(--text-muted)]">
                      {formattedDate}
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-display mb-6 text-gradient leading-tight">
                    {article.meta.title}
                  </h1>
                </header>
              )}

              <p className="text-xl md:text-2xl text-[var(--text-secondary)] leading-relaxed mb-14 border-l-2 border-[var(--accent-primary)] pl-6">
                {article.lead}
              </p>

              <div className="prose-dark">
                {article.sections.map((section, index) => (
                  <section key={index} className="mb-12 animate-fade-in-up" style={{ animationDelay: `${0.1 + index * 0.05}s` }}>
                    {section.level === 2 ? (
                      <h2 className="text-2xl md:text-3xl font-display mb-5 text-[var(--text-primary)] flex items-center gap-3">
                        <span className="w-8 h-0.5 bg-gradient-to-r from-[var(--accent-primary)] to-transparent rounded-full" />
                        {section.heading}
                      </h2>
                    ) : (
                      <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[var(--text-primary)]">
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
                <section className="mt-16 p-8 md:p-10 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--gold)]" />
                  
                  <h2 className="text-xl md:text-2xl font-display mb-10 text-[var(--text-primary)] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent-muted)] flex items-center justify-center">
                      <svg className="w-5 h-5 text-[var(--accent-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    FAQ
                  </h2>
                  <div className="space-y-6">
                    {article.faq.map((item, index) => (
                      <div key={index} className="group p-5 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/30 transition-all duration-300">
                        <h3 className="text-lg font-semibold mb-3 text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)] transition-colors duration-300">
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
            <div className="sticky top-8 space-y-6">
              <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                <h3 className="section-title mb-5">
                  Tematy
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.meta.keywords.map((keyword, index) => (
                    <Link
                      key={index}
                      href={`/tag/${encodeURIComponent(keyword)}`}
                      className="px-3 py-1.5 bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-lg text-sm border border-[var(--border-subtle)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-all duration-300"
                    >
                      #{keyword}
                    </Link>
                  ))}
                </div>
              </div>

              {article.internalLinks && article.internalLinks.length > 0 && (
                <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                  <h3 className="section-title mb-5">
                    Powiązane
                  </h3>
                  <div className="space-y-3">
                    {article.internalLinks.map((link, index) => (
                      <Link
                        key={index}
                        href={`/articles/${link.slug}`}
                        className="group flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--bg-tertiary)] transition-all duration-300"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[var(--accent-muted)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--accent-primary)] transition-all duration-300">
                          <svg className="w-4 h-4 text-[var(--accent-secondary)] group-hover:text-[var(--bg-primary)] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)] transition-colors duration-300 line-clamp-2">
                          {link.targetTitle}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {article.externalLinks && article.externalLinks.length > 0 && (
                <div className="p-6 rounded-2xl bg-[var(--accent-muted)] border border-[var(--accent-primary)]/20">
                  <h3 className="section-title mb-5 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Linki zewnętrzne
                  </h3>
                  <div className="space-y-3">
                    {article.externalLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-[var(--accent-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300"
                      >
                        <span className="truncate">{link.text}</span>
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
