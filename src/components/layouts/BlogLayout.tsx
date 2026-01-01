import { Article } from '@/types/article';
import { ArticleCard } from '../ArticleCard';

interface BlogLayoutProps {
  articles: Article[];
  siteName: string;
  niche: string;
}

export function BlogLayout({ articles, siteName, niche }: BlogLayoutProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{siteName}</h1>
        <p className="text-xl text-gray-600">{niche}</p>
      </div>

      <div className="space-y-8">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} variant="minimal" />
        ))}
      </div>
    </div>
  );
}


