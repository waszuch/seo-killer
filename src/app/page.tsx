import Image from "next/image";
import { getSiteConfig } from "@/lib/config";

export default function Home() {
  const config = getSiteConfig();

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
          <p className="text-sm text-gray-500">
            Język: {config.language.toUpperCase()} | Layout: {config.layout.homepage}
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6" style={{ color: config.branding.secondaryColor }}>
            Etap 1: Konfiguracja zakończona
          </h2>
          
          <div className="space-y-4">
            <div className="border-l-4 pl-4" style={{ borderColor: config.branding.accentColor }}>
              <h3 className="font-semibold text-lg mb-2">Seed Keywords ({config.seedKeywords.length})</h3>
              <div className="flex flex-wrap gap-2">
                {config.seedKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-l-4 pl-4" style={{ borderColor: config.branding.accentColor }}>
              <h3 className="font-semibold text-lg mb-2">Konfiguracja treści</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Artykuły na generację: {config.content.articlesPerGeneration}</li>
                <li>Długość artykułu: {config.content.articleLength}</li>
                <li>Styl pisania: {config.content.writingStyle}</li>
                <li>FAQ: {config.content.generateFaq ? 'Tak' : 'Nie'}</li>
                <li>Linki wewnętrzne: {config.content.minInternalLinks}-{config.content.maxInternalLinks}</li>
              </ul>
            </div>

            <div className="border-l-4 pl-4" style={{ borderColor: config.branding.accentColor }}>
              <h3 className="font-semibold text-lg mb-2">Linki zewnętrzne</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {config.externalLinks.allowedDomains.map((domain, index) => (
                  <li key={index}>
                    <strong>{domain.domain}</strong> ({domain.anchors.length} anchorów)
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded">
              <p className="text-green-800">
                Konfiguracja działa poprawnie. System odczytuje dane z <code className="bg-green-100 px-2 py-1 rounded">site.config.json</code>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href="/admin"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Panel administracyjny
          </a>
        </div>

        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>SeoKiller by ITMakeovers & Marcin W.</p>
        </div>
      </main>
    </div>
  );
}
