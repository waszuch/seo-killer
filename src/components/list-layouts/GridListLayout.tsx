import { Article } from '@/types/article';
import { ArticleCard } from '../ArticleCard';

interface GridListLayoutProps {
  articles: Article[];
  title: string;
}

export function GridListLayout({ articles, title }: GridListLayoutProps) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-gray-900">{title}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

