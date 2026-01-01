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

        {renderLayout()}

        <div className="mt-12 text-center">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm text-[var(--accent-secondary)] hover:underline"
          >
            Zobacz wszystkie artykuły
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
