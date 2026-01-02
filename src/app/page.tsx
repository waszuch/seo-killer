import Image from "next/image";
import Link from "next/link";
import { getSiteConfig } from "@/lib/config";
import { loadArticles } from "@/lib/articles";
import { PortalLayout } from "@/components/layouts/PortalLayout";
import { MagazineLayout } from "@/components/layouts/MagazineLayout";
import { BlogLayout } from "@/components/layouts/BlogLayout";

export const revalidate = 300;

export default function Home() {
  const config = getSiteConfig();
  const articlesDb = loadArticles();
  const articles = articlesDb.articles.filter(a => a.status === 'generated' || a.status === 'published');

  const renderLayout = () => {
    if (articles.length === 0) {
      return (
        <div className="max-w-lg mx-auto text-center py-24 animate-fade-in-up">
          <div className="relative w-20 h-20 mx-auto mb-8">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-tertiary)] opacity-20 blur-xl" />
            <div className="relative w-20 h-20 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center">
              <svg className="w-9 h-9 text-[var(--accent-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-display mb-4 text-[var(--text-primary)]">
            Brak artykułów
          </h2>
          {config.admin.enabled ? (
            <>
              <p className="text-[var(--text-secondary)] mb-10 text-lg">
                Wygeneruj artykuły w panelu administracyjnym
              </p>
              <Link
                href="/admin"
                className="btn btn-primary"
              >
                <span>Panel administracyjny</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </>
          ) : (
            <p className="text-[var(--text-secondary)] text-lg">
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
    <div className="min-h-screen relative">
      <div className="hero-glow -top-64 -left-32 opacity-50" />
      <div className="hero-glow top-1/4 -right-64 opacity-30" />
      
      <main className="relative container mx-auto px-4 py-16 md:py-20">
        {config.layout.homepage !== 'blog' && (
          <header className="text-center mb-20 animate-fade-in-up">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 rounded-2xl bg-[var(--accent-primary)] opacity-20 blur-2xl scale-150" />
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-default)] glow-sm">
                <Image
                  src={config.branding.logoUrl}
                  alt={config.siteName}
                  width={36}
                  height={36}
                  priority
                  className="opacity-90"
                />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-5 text-gradient">
              {config.siteName}
            </h1>
            
            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-xl mx-auto">
              {config.niche}
            </p>
            
            <div className="mt-10 flex justify-center">
              <div className="w-24 h-0.5 rounded-full bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent" />
            </div>
          </header>
        )}

        {renderLayout()}

        {articles.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mt-20 animate-fade-in stagger-5">
            <Link href="/articles" className="btn btn-secondary">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>Wszystkie artykuły</span>
            </Link>
            {config.admin.enabled && (
              <Link href="/admin" className="btn btn-primary">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Panel administracyjny</span>
              </Link>
            )}
          </div>
        )}

        <footer className="text-center mt-24 pt-12 border-t border-[var(--border-subtle)]">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="decoration-line" />
            <span className="text-[var(--accent-secondary)] text-sm font-medium">SeoKiller</span>
            <div className="decoration-line" />
          </div>
          <p className="text-sm text-[var(--text-muted)]">
            by ITMakeovers & Marcin W.
          </p>
        </footer>
      </main>
    </div>
  );
}
