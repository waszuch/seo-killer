import Image from "next/image";
import Link from "next/link";
import { getSiteConfig } from "@/lib/config";
import { loadArticles } from "@/lib/articles";

export default function Home() {
  const config = getSiteConfig();
  const articlesDb = loadArticles();
  const articles = articlesDb.articles.filter(a => a.status === 'generated' || a.status === 'published');

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-16">
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

        {articles.length === 0 ? (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Brak artykułów</h2>
            <p className="text-gray-600 mb-6">
              Wygeneruj artykuły w panelu administracyjnym
            </p>
            <Link
              href="/admin"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Przejdź do panelu admin
            </Link>
          </div>
        ) : (
          <>
            <div className="max-w-6xl mx-auto mb-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Najnowsze artykuły</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.slug}`}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
                  >
                    {article.imageUrl && (
                      <div className="w-full h-48 overflow-hidden">
                        <img
                          src={article.imageUrl}
                          alt={article.imageAlt}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-semibold mb-3 text-gray-900 line-clamp-2">
                        {article.meta.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                        {article.lead}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {article.meta.keywords.slice(0, 2).map((keyword, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                      <span className="text-blue-600 text-sm font-medium hover:underline">
                        Czytaj więcej →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="text-center mt-8">
              <Link
                href="/admin"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Panel administracyjny
              </Link>
            </div>
          </>
        )}

        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>SeoKiller by ITMakeovers & Marcin W.</p>
        </div>
      </main>
    </div>
  );
}
