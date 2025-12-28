import fs from 'fs';
import path from 'path';
import { Topic, TopicsDatabase } from '@/types/article';
import { generateUniqueSlug, generateId } from './slug';

const TOPICS_DIR = path.join(process.cwd(), 'data', 'topics');
const TOPICS_FILE = path.join(TOPICS_DIR, 'topics.json');

export function ensureTopicsDir(): void {
  if (!fs.existsSync(TOPICS_DIR)) {
    fs.mkdirSync(TOPICS_DIR, { recursive: true });
  }
}

export function loadTopics(): TopicsDatabase {
  ensureTopicsDir();
  
  if (!fs.existsSync(TOPICS_FILE)) {
    const emptyDb: TopicsDatabase = {
      topics: [],
      lastUpdated: new Date().toISOString(),
      totalCount: 0
    };
    saveTopics(emptyDb);
    return emptyDb;
  }
  
  const data = fs.readFileSync(TOPICS_FILE, 'utf-8');
  return JSON.parse(data) as TopicsDatabase;
}

export function saveTopics(database: TopicsDatabase): void {
  ensureTopicsDir();
  database.lastUpdated = new Date().toISOString();
  database.totalCount = database.topics.length;
  fs.writeFileSync(TOPICS_FILE, JSON.stringify(database, null, 2), 'utf-8');
}

export function addTopics(newTopics: Omit<Topic, 'id' | 'slug' | 'createdAt'>[]): Topic[] {
  const db = loadTopics();
  const existingSlugs = db.topics.map(t => t.slug);
  const existingTitles = new Set(db.topics.map(t => t.title.toLowerCase()));
  
  const topicsToAdd: Topic[] = [];
  
  for (const topicData of newTopics) {
    const normalizedTitle = topicData.title.toLowerCase();
    
    if (existingTitles.has(normalizedTitle)) {
      continue;
    }
    
    const topic: Topic = {
      id: generateId(),
      title: topicData.title,
      slug: generateUniqueSlug(topicData.title, existingSlugs),
      keywords: topicData.keywords,
      seedKeyword: topicData.seedKeyword,
      status: topicData.status,
      createdAt: new Date().toISOString()
    };
    
    topicsToAdd.push(topic);
    existingSlugs.push(topic.slug);
    existingTitles.add(normalizedTitle);
  }
  
  db.topics.push(...topicsToAdd);
  saveTopics(db);
  
  return topicsToAdd;
}

export function getTopicBySlug(slug: string): Topic | null {
  const db = loadTopics();
  return db.topics.find(t => t.slug === slug) || null;
}

export function updateTopicStatus(id: string, status: Topic['status'], error?: string): void {
  const db = loadTopics();
  const topic = db.topics.find(t => t.id === id);
  
  if (topic) {
    topic.status = status;
    if (error) topic.error = error;
    if (status === 'generated') {
      topic.generatedAt = new Date().toISOString();
    }
    saveTopics(db);
  }
}

export function getPendingTopics(limit?: number): Topic[] {
  const db = loadTopics();
  const pending = db.topics.filter(t => t.status === 'pending');
  return limit ? pending.slice(0, limit) : pending;
}

export function getTopicStats() {
  const db = loadTopics();
  return {
    total: db.topics.length,
    pending: db.topics.filter(t => t.status === 'pending').length,
    generating: db.topics.filter(t => t.status === 'generating').length,
    generated: db.topics.filter(t => t.status === 'generated').length,
    published: db.topics.filter(t => t.status === 'published').length,
    error: db.topics.filter(t => t.status === 'error').length
  };
}


