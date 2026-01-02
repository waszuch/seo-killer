import { Article } from '@/types/article';
import { ArticleCard } from '../ArticleCard';

interface GridListLayoutProps {
  articles: Article[];
  title: string;
}

export function GridListLayout({ articles, title }: GridListLayoutProps) {
  return (
    <div>
      <header className="mb-14 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-display text-gradient mb-4">
          {title}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg">
          {articles.length} {articles.length === 1 ? 'artykuł' : articles.length < 5 ? 'artykuły' : 'artykułów'}
        </p>
        <div className="mt-6 h-px bg-gradient-to-r from-[var(--accent-primary)] via-[var(--border-subtle)] to-transparent" />
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <ArticleCard key={article.id} article={article} index={index} />
        ))}
      </div>
    </div>
  );
}
