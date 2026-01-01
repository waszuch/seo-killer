import { Article } from '@/types/article';
import Link from 'next/link';

interface ListLayoutProps {
  articles: Article[];
  title: string;
}

export function ListLayout({ articles, title }: ListLayoutProps) {
  return (
    <div className="max-w-4xl">
      <header className="mb-12 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-semibold text-[var(--text-primary)]">
          {title}
        </h1>
        <div className="mt-4 h-px bg-gradient-to-r from-[var(--accent-primary)] via-[var(--border-subtle)] to-transparent" />
      </header>

      <div className="space-y-6">
        {articles.map((article, index) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="group block animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <article className="flex gap-6 p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] hover:bg-[var(--bg-card-hover)] transition-all duration-300">
              {article.imageUrl && (
                <div className="w-44 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex-1 flex flex-col justify-center min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium uppercase tracking-wider text-[var(--accent-secondary)]">
                    {article.meta.keywords[0]}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                  <span className="text-xs text-[var(--text-muted)]">
                    {new Date(article.createdAt).toLocaleDateString('pl-PL')}
                  </span>
                </div>
                <h2 className="text-xl font-medium mb-2 text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)] transition-colors line-clamp-2">
                  {article.meta.title}
                </h2>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
                  {article.lead}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
