import { MetadataRoute } from 'next';
import { loadArticles } from '@/lib/articles';
import { getSiteUrl } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const articlesDb = loadArticles();
  const articles = articlesDb.articles.filter(
    a => a.status === 'generated' || a.status === 'published'
  );

  const articleEntries: MetadataRoute.Sitemap = articles.map(article => ({
    url: getSiteUrl(`/articles/${article.slug}`),
    lastModified: article.updatedAt || article.publishedAt || article.createdAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: getSiteUrl('/'),
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: getSiteUrl('/admin'),
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.3,
    },
    ...articleEntries,
  ];
}

