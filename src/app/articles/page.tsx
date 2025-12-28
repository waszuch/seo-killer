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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="text-blue-600 hover:underline mb-8 inline-block">
          ← Powrót do strony głównej
        </Link>

        {articles.length === 0 ? (
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4 text-gray-900">Brak artykułów</h1>
            <p className="text-gray-600 mb-8">
              Nie znaleziono żadnych opublikowanych artykułów.
            </p>
            <Link
              href="/admin"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Przejdź do panelu admin
            </Link>
          </div>
        ) : (
          renderLayout()
        )}
      </div>
    </div>
  );
}

