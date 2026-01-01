'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Topic {
  id: string;
  title: string;
  slug: string;
  keywords: string[];
  seedKeyword: string;
  status: string;
  createdAt: string;
}

interface Article {
  id: string;
  slug: string;
  status: string;
  meta: {
    title: string;
  };
  imageUrl: string;
  createdAt: string;
}

interface TopicStats {
  total: number;
  pending: number;
  generating: number;
  generated: number;
  published: number;
  error: number;
}

export default function AdminPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [stats, setStats] = useState<TopicStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatingArticle, setGeneratingArticle] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const loadTopics = async () => {
    setLoading(true);
    try {
      const [topicsRes, articlesRes] = await Promise.all([
        fetch('/api/topics'),
        fetch('/api/articles')
      ]);
      
      const topicsData = await topicsRes.json();
      const articlesData = await articlesRes.json();
      
      if (topicsData.success) {
        setTopics(topicsData.topics);
        setStats(topicsData.stats);
      }
      
      if (articlesData.success) {
        setArticles(articlesData.articles);
      }
    } catch (error) {
      setMessage('Błąd podczas wczytywania danych');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTopics();
  }, []);

  const handleGenerateTopics = async () => {
    setGenerating(true);
    setMessage('Generowanie tematów...');
    
    try {
      const response = await fetch('/api/topics/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage(`Wygenerowano ${data.generated} nowych tematów`);
        await loadTopics();
      } else {
        setMessage(`Błąd: ${data.error}`);
      }
    } catch (error) {
      setMessage('Błąd podczas generowania tematów');
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerateArticle = async (slug: string) => {
    setGeneratingArticle(slug);
    setMessage(`Generowanie artykułu dla: ${slug}...`);
    
    try {
      const response = await fetch('/api/articles/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicSlug: slug })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage(`Artykuł wygenerowany pomyślnie`);
        await loadTopics();
      } else {
        setMessage(`Błąd: ${data.error}`);
      }
    } catch (error) {
      setMessage('Błąd podczas generowania artykułu');
    } finally {
      setGeneratingArticle(null);
    }
  };

  const handleGenerateBatch = async (count: number) => {
    setGenerating(true);
    setMessage(`Generowanie ${count} artykułów...`);
    
    try {
      const response = await fetch('/api/articles/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage(`Wygenerowano ${data.success} artykułów`);
        await loadTopics();
      } else {
        setMessage(`Wygenerowano ${data.success}, błędów: ${data.failed}`);
      }
    } catch (error) {
      setMessage('Błąd podczas generowania artykułów');
    } finally {
      setGenerating(false);
    }
  };

  const handleResetTopic = async (topicId: string) => {
    try {
      const response = await fetch('/api/topics/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicId })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage('Status zresetowany');
        await loadTopics();
      } else {
        setMessage(`Błąd: ${data.error}`);
      }
    } catch (error) {
      setMessage('Błąd podczas resetowania statusu');
    }
  };

  const handleLinkArticles = async () => {
    setGenerating(true);
    setMessage('Linkowanie artykułów...');
    
    try {
      const response = await fetch('/api/articles/link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ all: true })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage(`${data.message}`);
        await loadTopics();
      } else {
        setMessage(`Błąd: ${data.error}`);
      }
    } catch (error) {
      setMessage('Błąd podczas linkowania artykułów');
    } finally {
      setGenerating(false);
    }
  };

  const handleDeleteArticle = async (slug: string) => {
    if (!confirm('Czy na pewno chcesz usunąć ten artykuł?')) {
      return;
    }

    try {
      const response = await fetch('/api/articles/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage('Artykuł usunięty pomyślnie');
        await loadTopics();
      } else {
        setMessage(`Błąd: ${data.error}`);
      }
    } catch (error) {
      setMessage('Błąd podczas usuwania artykułu');
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'generating': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'generated': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'published': return 'bg-violet-500/20 text-violet-400 border-violet-500/30';
      case 'error': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Oczekuje';
      case 'generating': return 'Generowanie';
      case 'generated': return 'Wygenerowany';
      case 'published': return 'Opublikowany';
      case 'error': return 'Błąd';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <header className="mb-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white mb-1">Panel administracyjny</h1>
              <p className="text-neutral-500 text-sm">Zarządzanie tematami i artykułami</p>
            </div>
            <Link
              href="/"
              className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Strona główna
            </Link>
          </div>
        </header>

        {stats && (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
            {[
              { label: 'Wszystkie', value: stats.total, color: 'text-white' },
              { label: 'Oczekujące', value: stats.pending, color: 'text-amber-400' },
              { label: 'W trakcie', value: stats.generating, color: 'text-blue-400' },
              { label: 'Wygenerowane', value: stats.generated, color: 'text-emerald-400' },
              { label: 'Opublikowane', value: stats.published, color: 'text-violet-400' },
              { label: 'Błędy', value: stats.error, color: 'text-red-400' },
            ].map((stat, index) => (
              <div key={index} className="bg-[#131316] border border-[#252529] rounded-lg p-4">
                <div className={`text-2xl font-semibold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-neutral-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#131316] border border-[#252529] rounded-xl p-5">
            <h2 className="text-base font-medium text-white mb-2">Generowanie tematów</h2>
            <p className="text-sm text-neutral-500 mb-4">
              Na podstawie seed keywords
            </p>
            <button
              onClick={handleGenerateTopics}
              disabled={generating}
              className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-500 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors"
            >
              {generating ? 'Generowanie...' : 'Generuj tematy'}
            </button>
          </div>

          <div className="bg-[#131316] border border-[#252529] rounded-xl p-5">
            <h2 className="text-base font-medium text-white mb-2">Generowanie artykułów</h2>
            <p className="text-sm text-neutral-500 mb-4">
              Dla oczekujących tematów
            </p>
            <div className="flex gap-2">
              {[3, 5, 10].map((count) => (
                <button
                  key={count}
                  onClick={() => handleGenerateBatch(count)}
                  disabled={generating}
                  className="flex-1 bg-emerald-600 text-white px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-500 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors"
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#131316] border border-[#252529] rounded-xl p-5">
            <h2 className="text-base font-medium text-white mb-2">Linkowanie</h2>
            <p className="text-sm text-neutral-500 mb-4">
              Linki wewnętrzne i zewnętrzne
            </p>
            <button
              onClick={handleLinkArticles}
              disabled={generating}
              className="w-full bg-violet-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-violet-500 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors"
            >
              {generating ? 'Linkowanie...' : 'Przelinkuj wszystkie'}
            </button>
          </div>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg border text-sm ${
            message.includes('Błąd') 
              ? 'bg-red-500/10 border-red-500/30 text-red-400' 
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
          }`}>
            {message}
          </div>
        )}

        {articles.length > 0 && (
          <div className="bg-[#131316] border border-[#252529] rounded-xl mb-8 overflow-hidden">
            <div className="p-5 border-b border-[#252529]">
              <h2 className="text-base font-medium text-white">
                Artykuły <span className="text-neutral-500">({articles.length})</span>
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#252529]">
                    <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Tytuł</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Obrazek</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Data</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Akcje</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#252529]">
                  {articles.map((article) => (
                    <tr key={article.id} className="hover:bg-[#1a1a1f] transition-colors">
                      <td className="px-5 py-4 text-sm text-neutral-200">{article.meta.title}</td>
                      <td className="px-5 py-4">
                        {article.imageUrl ? (
                          <img src={article.imageUrl} alt="" className="w-16 h-10 object-cover rounded" />
                        ) : (
                          <span className="text-xs text-neutral-600">Brak</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-sm text-neutral-500">
                        {new Date(article.createdAt).toLocaleDateString('pl-PL')}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-3">
                          <a
                            href={`/articles/${article.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            Zobacz
                          </a>
                          <button
                            onClick={() => handleDeleteArticle(article.slug)}
                            className="text-sm text-red-400 hover:text-red-300 transition-colors"
                          >
                            Usuń
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="bg-[#131316] border border-[#252529] rounded-xl overflow-hidden">
          <div className="p-5 border-b border-[#252529]">
            <h2 className="text-base font-medium text-white">
              Tematy <span className="text-neutral-500">({topics.length})</span>
            </h2>
          </div>
          
          {loading ? (
            <div className="p-10 text-center text-neutral-500">Ładowanie...</div>
          ) : topics.length === 0 ? (
            <div className="p-10 text-center text-neutral-500">
              Brak tematów. Wygeneruj nowe tematy aby rozpocząć.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#252529]">
                    <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Tytuł</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Slug</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Seed</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Data</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Akcje</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#252529]">
                  {topics.map((topic) => (
                    <tr key={topic.id} className="hover:bg-[#1a1a1f] transition-colors">
                      <td className="px-5 py-4 text-sm text-neutral-200">{topic.title}</td>
                      <td className="px-5 py-4 text-xs text-neutral-500 font-mono">{topic.slug}</td>
                      <td className="px-5 py-4 text-sm text-neutral-400">{topic.seedKeyword}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 text-xs rounded-full border ${getStatusStyle(topic.status)}`}>
                          {getStatusText(topic.status)}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-neutral-500">
                        {new Date(topic.createdAt).toLocaleDateString('pl-PL')}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          {topic.status === 'pending' && (
                            <button
                              onClick={() => handleGenerateArticle(topic.slug)}
                              disabled={generatingArticle === topic.slug}
                              className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-500 disabled:bg-neutral-700 disabled:text-neutral-500 transition-colors"
                            >
                              {generatingArticle === topic.slug ? 'Generowanie...' : 'Generuj'}
                            </button>
                          )}
                          {topic.status === 'error' && (
                            <>
                              <button
                                onClick={() => handleResetTopic(topic.id)}
                                className="text-xs bg-amber-600 text-white px-3 py-1.5 rounded hover:bg-amber-500 transition-colors"
                              >
                                Resetuj
                              </button>
                              <button
                                onClick={() => handleGenerateArticle(topic.slug)}
                                disabled={generatingArticle === topic.slug}
                                className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-500 disabled:bg-neutral-700 transition-colors"
                              >
                                Ponów
                              </button>
                            </>
                          )}
                          {topic.status === 'generated' && (
                            <button
                              onClick={() => handleResetTopic(topic.id)}
                              className="text-xs bg-neutral-700 text-neutral-300 px-3 py-1.5 rounded hover:bg-neutral-600 transition-colors"
                            >
                              Resetuj
                            </button>
                          )}
                          {topic.status === 'generating' && (
                            <span className="text-xs text-blue-400 flex items-center gap-1">
                              <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              Generowanie...
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
