import { getArticleBySlug } from '@/lib/articles';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { generateArticleMetadata, generateArticleJsonLd } from '@/lib/seo';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Artykuł nie znaleziony',
    };
  }

  return generateArticleMetadata(article);
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const jsonLd = generateArticleJsonLd(article);

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Powrót do strony głównej
        </Link>

        {article.imageUrl && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.imageAlt}
              className="w-full h-auto max-h-96 object-cover"
            />
          </div>
        )}

        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            {article.meta.title}
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            {article.lead}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {article.meta.keywords.map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          {article.sections.map((section, index) => (
            <section key={index} className="mb-8">
              {section.level === 2 ? (
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  {section.heading}
                </h2>
              ) : (
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {section.heading}
                </h3>
              )}
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {article.faq && article.faq.length > 0 && (
          <section className="mt-12 bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Najczęściej zadawane pytania
            </h2>
            <div className="space-y-6">
              {article.faq.map((item, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {item.question}
                  </h3>
                  <p className="text-gray-700">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Opublikowano: {new Date(article.publishedAt || article.createdAt).toLocaleDateString('pl-PL')}
          </p>
        </footer>
      </article>
    </div>
  );
}


