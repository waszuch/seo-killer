import { Metadata } from 'next';
import { getSiteConfig, getSiteUrl, replaceTemplateVars } from './config';
import { Article } from '@/types/article';

export function generateSiteMetadata(): Metadata {
  const config = getSiteConfig();

  return {
    title: {
      default: config.siteName,
      template: `%s | ${config.siteName}`,
    },
    description: replaceTemplateVars(
      config.seo.defaultMetaDescription,
      { topic: config.niche, siteName: config.siteName }
    ),
    keywords: config.seedKeywords,
    authors: [{ name: config.siteName }],
    creator: config.siteName,
    publisher: config.siteName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      type: 'website',
      locale: config.language,
      url: getSiteUrl('/'),
      siteName: config.siteName,
      title: config.siteName,
      description: replaceTemplateVars(
        config.seo.defaultMetaDescription,
        { topic: config.niche, siteName: config.siteName }
      ),
    },
    twitter: {
      card: config.seo.twitterCard as any,
      title: config.siteName,
      description: replaceTemplateVars(
        config.seo.defaultMetaDescription,
        { topic: config.niche, siteName: config.siteName }
      ),
    },
  };
}

export function generateArticleMetadata(article: Article): Metadata {
  const config = getSiteConfig();
  const url = getSiteUrl(`/articles/${article.slug}`);

  return {
    title: article.meta.metaTitle || article.meta.title,
    description: article.meta.metaDescription,
    keywords: article.meta.keywords,
    authors: [{ name: config.siteName }],
    creator: config.siteName,
    publisher: config.siteName,
    openGraph: {
      type: 'article',
      locale: config.language,
      url,
      siteName: config.siteName,
      title: article.meta.metaTitle || article.meta.title,
      description: article.meta.metaDescription,
      images: [
        {
          url: article.imageUrl,
          width: config.seo.ogImageWidth,
          height: config.seo.ogImageHeight,
          alt: article.imageAlt,
        },
      ],
      publishedTime: article.publishedAt || article.createdAt,
      modifiedTime: article.updatedAt || article.publishedAt || article.createdAt,
    },
    twitter: {
      card: config.seo.twitterCard as any,
      title: article.meta.metaTitle || article.meta.title,
      description: article.meta.metaDescription,
      images: [article.imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateArticleJsonLd(article: Article) {
  const config = getSiteConfig();
  const url = getSiteUrl(`/articles/${article.slug}`);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.meta.title,
    description: article.meta.metaDescription,
    image: article.imageUrl,
    datePublished: article.publishedAt || article.createdAt,
    dateModified: article.updatedAt || article.publishedAt || article.createdAt,
    author: {
      '@type': 'Organization',
      name: config.siteName,
    },
    publisher: {
      '@type': 'Organization',
      name: config.siteName,
      logo: {
        '@type': 'ImageObject',
        url: getSiteUrl(config.branding.logoUrl),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}




