import fs from 'fs';
import path from 'path';
import { Article, ArticlesDatabase } from '@/types/article';
import { generateId } from './slug';

const ARTICLES_DIR = path.join(process.cwd(), 'data', 'articles');
const ARTICLES_FILE = path.join(ARTICLES_DIR, 'articles.json');

export function ensureArticlesDir(): void {
  if (!fs.existsSync(ARTICLES_DIR)) {
    fs.mkdirSync(ARTICLES_DIR, { recursive: true });
  }
}

export function loadArticles(): ArticlesDatabase {
  ensureArticlesDir();
  
  if (!fs.existsSync(ARTICLES_FILE)) {
    const emptyDb: ArticlesDatabase = {
      articles: [],
      lastUpdated: new Date().toISOString(),
      totalCount: 0
    };
    saveArticles(emptyDb);
    return emptyDb;
  }
  
  const data = fs.readFileSync(ARTICLES_FILE, 'utf-8');
  return JSON.parse(data) as ArticlesDatabase;
}

export function saveArticles(database: ArticlesDatabase): void {
  ensureArticlesDir();
  database.lastUpdated = new Date().toISOString();
  database.totalCount = database.articles.length;
  fs.writeFileSync(ARTICLES_FILE, JSON.stringify(database, null, 2), 'utf-8');
}

export function addArticle(article: Article): Article {
  const db = loadArticles();
  db.articles.push(article);
  saveArticles(db);
  return article;
}

export function getArticleBySlug(slug: string): Article | null {
  const db = loadArticles();
  return db.articles.find(a => a.slug === slug) || null;
}

export function updateArticleStatus(id: string, status: Article['status'], error?: string): void {
  const db = loadArticles();
  const article = db.articles.find(a => a.id === id);
  
  if (article) {
    article.status = status;
    if (error) {
      article.updatedAt = new Date().toISOString();
    }
    if (status === 'published') {
      article.publishedAt = new Date().toISOString();
    }
    article.updatedAt = new Date().toISOString();
    saveArticles(db);
  }
}

export function getArticleStats() {
  const db = loadArticles();
  return {
    total: db.articles.length,
    pending: db.articles.filter(a => a.status === 'pending').length,
    generating: db.articles.filter(a => a.status === 'generating').length,
    generated: db.articles.filter(a => a.status === 'generated').length,
    published: db.articles.filter(a => a.status === 'published').length,
    error: db.articles.filter(a => a.status === 'error').length
  };
}

export function getPendingArticles(limit?: number): Article[] {
  const db = loadArticles();
  const pending = db.articles.filter(a => a.status === 'pending');
  return limit ? pending.slice(0, limit) : pending;
}


