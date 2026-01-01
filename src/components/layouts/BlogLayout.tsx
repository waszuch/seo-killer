import { Article } from '@/types/article';
import { ArticleCard } from '../ArticleCard';

interface BlogLayoutProps {
  articles: Article[];
  siteName: string;
  niche: string;
}

export function BlogLayout({ articles, siteName, niche }: BlogLayoutProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <header className="text-center mb-16 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4 text-[var(--text-primary)]">
          {siteName}
        </h1>
        <p className="text-lg text-[var(--text-secondary)]">
          {niche}
        </p>
        <div className="mt-8 flex justify-center">
          <div className="w-16 h-px bg-[var(--border-default)]" />
        </div>
      </header>

      <div className="space-y-2">
        {articles.map((article, index) => (
          <ArticleCard key={article.id} article={article} variant="minimal" index={index} />
        ))}
      </div>
    </div>
  );
}
