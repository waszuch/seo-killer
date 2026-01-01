import Image from "next/image";
import Link from "next/link";
import { getSiteConfig } from "@/lib/config";
import { loadArticles } from "@/lib/articles";
import { PortalLayout } from "@/components/layouts/PortalLayout";
import { MagazineLayout } from "@/components/layouts/MagazineLayout";
import { BlogLayout } from "@/components/layouts/BlogLayout";

export default function Home() {
  const config = getSiteConfig();
  const articlesDb = loadArticles();
  const articles = articlesDb.articles.filter(a => a.status === 'generated' || a.status === 'published');

  const renderLayout = () => {
    if (articles.length === 0) {
      return (
        <div className="max-w-lg mx-auto text-center py-20 animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center">
            <svg className="w-8 h-8 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-medium mb-3 text-[var(--text-primary)]">
            Brak artykułów
          </h2>
          {config.admin.enabled ? (
            <>
              <p className="text-[var(--text-secondary)] mb-8">
                Wygeneruj artykuły w panelu administracyjnym
              </p>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-primary)] text-white rounded-lg font-medium hover:bg-[var(--accent-secondary)] transition-colors"
              >
                Panel administracyjny
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </>
          ) : (
            <p className="text-[var(--text-secondary)]">
              Strona jest w trakcie przygotowywania treści.
            </p>
          )}
        </div>
      );
    }

    switch (config.layout.homepage) {
      case 'magazine':
        return <MagazineLayout articles={articles} siteName={config.siteName} niche={config.niche} />;
      case 'blog':
        return <BlogLayout articles={articles} siteName={config.siteName} niche={config.niche} />;
      case 'portal':
      default:
        return <PortalLayout articles={articles} siteName={config.siteName} niche={config.niche} />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <main className="container mx-auto px-4 py-12 md:py-16">
        {config.layout.homepage !== 'blog' && (
          <header className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center justify-center w-14 h-14 mb-6 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)]">
              <Image
                src={config.branding.logoUrl}
                alt={config.siteName}
                width={32}
                height={32}
                priority
                className="opacity-90"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold mb-3 text-[var(--text-primary)]">
              {config.siteName}
            </h1>
            <p className="text-lg text-[var(--text-secondary)]">
              {config.niche}
            </p>
          </header>
        )}

        {renderLayout()}

        {articles.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mt-16 animate-fade-in">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--border-default)] hover:bg-[var(--bg-card-hover)] transition-all"
            >
              Wszystkie artykuły
            </Link>
            {config.admin.enabled && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-secondary)] transition-colors"
              >
                Panel administracyjny
              </Link>
            )}
          </div>
        )}

        <footer className="text-center mt-20 pt-10 border-t border-[var(--border-subtle)]">
          <p className="text-sm text-[var(--text-muted)]">
            SeoKiller by ITMakeovers & Marcin W.
          </p>
        </footer>
      </main>
    </div>
  );
}
