import { loadArticles } from '@/lib/articles';
import { getSiteConfig } from '@/lib/config';
import Link from 'next/link';
import { GridListLayout } from '@/components/list-layouts/GridListLayout';
import { ListLayout } from '@/components/list-layouts/ListLayout';
import { MasonryListLayout } from '@/components/list-layouts/MasonryListLayout';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  
  return {
    title: `Artykuły: ${decodedTag}`,
    description: `Przeglądaj artykuły z kategorii: ${decodedTag}`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  
  const config = getSiteConfig();
  const articlesDb = loadArticles();
  
  const articles = articlesDb.articles.filter(
    (article) =>
      (article.status === 'generated' || article.status === 'published') &&
      article.meta.keywords.some(
        (keyword) => keyword.toLowerCase() === decodedTag.toLowerCase()
      )
  );

  if (articles.length === 0) {
    notFound();
  }

  const renderLayout = () => {
    const title = `Artykuły: ${decodedTag}`;
    switch (config.layout.list) {
      case 'list':
        return <ListLayout articles={articles} title={title} />;
      case 'masonry':
        return <MasonryListLayout articles={articles} title={title} />;
      case 'grid':
      default:
        return <GridListLayout articles={articles} title={title} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="text-blue-600 hover:underline mb-8 inline-block">
          ← Powrót do strony głównej
        </Link>

        {renderLayout()}

        <div className="mt-12 text-center">
          <Link
            href="/articles"
            className="text-blue-600 hover:underline"
          >
            Zobacz wszystkie artykuły →
          </Link>
        </div>
      </div>
    </div>
  );
}

