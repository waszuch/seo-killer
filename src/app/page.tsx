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
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Brak artykułów</h2>
          {config.admin.enabled ? (
            <>
              <p className="text-gray-600 mb-6">
                Wygeneruj artykuły w panelu administracyjnym
              </p>
              <Link
                href="/admin"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Przejdź do panelu admin
              </Link>
            </>
          ) : (
            <p className="text-gray-600">
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
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-16">
        {config.layout.homepage !== 'blog' && (
          <div className="text-center mb-12">
            <Image
              src={config.branding.logoUrl}
              alt={config.siteName}
              width={200}
              height={50}
              priority
              className="mx-auto mb-6"
            />
            <h1 className="text-4xl font-bold mb-4" style={{ color: config.branding.primaryColor }}>
              {config.siteName}
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              {config.niche}
            </p>
          </div>
        )}

        {renderLayout()}

        {articles.length > 0 && (
          <div className="flex justify-center gap-4 mt-12">
            <Link
              href="/articles"
              className="inline-block px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Zobacz wszystkie artykuły
            </Link>
            {config.admin.enabled && (
              <Link
                href="/admin"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Panel administracyjny
              </Link>
            )}
          </div>
        )}

        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>SeoKiller by ITMakeovers & Marcin W.</p>
        </div>
      </main>
    </div>
  );
}
