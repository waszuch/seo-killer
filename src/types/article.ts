export type ArticleStatus = 'pending' | 'generating' | 'generated' | 'published' | 'error';

export interface Topic {
  id: string;
  title: string;
  slug: string;
  keywords: string[];
  seedKeyword: string;
  status: ArticleStatus;
  createdAt: string;
  generatedAt?: string;
  error?: string;
}

export interface ArticleMeta {
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ArticleSection {
  heading: string;
  level: 2 | 3;
  content: string;
}

export interface InternalLink {
  text: string;
  slug: string;
  targetTitle: string;
}

export interface ExternalLink {
  text: string;
  url: string;
  domain: string;
}

export interface Article {
  id: string;
  slug: string;
  status: ArticleStatus;
  meta: ArticleMeta;
  lead: string;
  sections: ArticleSection[];
  faq?: FaqItem[];
  internalLinks: InternalLink[];
  externalLinks: ExternalLink[];
  imageUrl: string;
  imageAlt: string;
  createdAt: string;
  publishedAt?: string;
  updatedAt?: string;
}

export interface TopicsDatabase {
  topics: Topic[];
  lastUpdated: string;
  totalCount: number;
}

export interface ArticlesDatabase {
  articles: Article[];
  lastUpdated: string;
  totalCount: number;
}


