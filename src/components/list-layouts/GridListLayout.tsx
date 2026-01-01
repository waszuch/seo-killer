import { Article } from '@/types/article';
import { ArticleCard } from '../ArticleCard';

interface GridListLayoutProps {
  articles: Article[];
  title: string;
}

export function GridListLayout({ articles, title }: GridListLayoutProps) {
  return (
    <div>
      <header className="mb-12 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-semibold text-[var(--text-primary)]">
          {title}
        </h1>
        <div className="mt-4 h-px bg-gradient-to-r from-[var(--accent-primary)] via-[var(--border-subtle)] to-transparent" />
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <ArticleCard key={article.id} article={article} index={index} />
        ))}
      </div>
    </div>
  );
}
