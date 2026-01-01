import { loadArticles } from '@/lib/articles';
import { getSiteConfig } from '@/lib/config';
import Link from 'next/link';
import { GridListLayout } from '@/components/list-layouts/GridListLayout';
import { ListLayout } from '@/components/list-layouts/ListLayout';
import { MasonryListLayout } from '@/components/list-layouts/MasonryListLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wszystkie artykuły',
  description: 'Przeglądaj wszystkie opublikowane artykuły',
};

export default function ArticlesPage() {
  const config = getSiteConfig();
  const articlesDb = loadArticles();
  const articles = articlesDb.articles.filter(
    (a) => a.status === 'generated' || a.status === 'published'
  );

  const renderLayout = () => {
    switch (config.layout.list) {
      case 'list':
        return <ListLayout articles={articles} title="Wszystkie artykuły" />;
      case 'masonry':
        return <MasonryListLayout articles={articles} title="Wszystkie artykuły" />;
      case 'grid':
      default:
        return <GridListLayout articles={articles} title="Wszystkie artykuły" />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="container mx-auto px-4 py-12">
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

        {articles.length === 0 ? (
          <div className="max-w-lg mx-auto text-center py-20 animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center">
              <svg className="w-8 h-8 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-medium mb-3 text-[var(--text-primary)]">
              Brak artykułów
            </h1>
            <p className="text-[var(--text-secondary)] mb-8">
              Nie znaleziono żadnych opublikowanych artykułów.
            </p>
            {config.admin.enabled && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-primary)] text-white rounded-lg font-medium hover:bg-[var(--accent-secondary)] transition-colors"
              >
                Panel administracyjny
              </Link>
            )}
          </div>
        ) : (
          renderLayout()
        )}
      </div>
    </div>
  );
}
