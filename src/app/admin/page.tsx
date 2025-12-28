'use client';

import { useState, useEffect } from 'react';

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
        setMessage('Status zresetowany - możesz spróbować ponownie');
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'generating': return 'bg-blue-100 text-blue-800';
      case 'generated': return 'bg-green-100 text-green-800';
      case 'published': return 'bg-purple-100 text-purple-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Panel administracyjny</h1>
          <p className="text-gray-600">Zarządzanie tematami i artykułami</p>
        </div>

        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-gray-600">Wszystkie</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-gray-600">Oczekujące</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-blue-600">{stats.generating}</div>
              <div className="text-sm text-gray-600">W trakcie</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-green-600">{stats.generated}</div>
              <div className="text-sm text-gray-600">Wygenerowane</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-purple-600">{stats.published}</div>
              <div className="text-sm text-gray-600">Opublikowane</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-red-600">{stats.error}</div>
              <div className="text-sm text-gray-600">Błędy</div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Generowanie tematów</h2>
            <p className="text-gray-600 mb-4">
              Wygeneruj nowe tematy artykułów na podstawie seed keywords
            </p>
            
            <button
              onClick={handleGenerateTopics}
              disabled={generating}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {generating ? 'Generowanie...' : 'Generuj tematy'}
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Generowanie artykułów</h2>
            <p className="text-gray-600 mb-4">
              Wygeneruj artykuły dla oczekujących tematów
            </p>
            
            <div className="flex gap-2">
              <button
                onClick={() => handleGenerateBatch(3)}
                disabled={generating}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Generuj 3
              </button>
              <button
                onClick={() => handleGenerateBatch(5)}
                disabled={generating}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Generuj 5
              </button>
              <button
                onClick={() => handleGenerateBatch(10)}
                disabled={generating}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Generuj 10
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Linkowanie</h2>
            <p className="text-gray-600 mb-4">
              Automatycznie dodaj linki wewnętrzne i zewnętrzne do artykułów
            </p>
            
            <button
              onClick={handleLinkArticles}
              disabled={generating}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {generating ? 'Linkowanie...' : 'Przelinkuj wszystkie artykuły'}
            </button>
          </div>
        </div>

        {message && (
          <div className={`mb-6 p-3 rounded ${message.includes('Błąd') ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}>
            {message}
          </div>
        )}

        {articles.length > 0 && (
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Wygenerowane artykuły ({articles.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tytuł</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Obrazek</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Akcje</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {articles.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{article.meta.title}</td>
                      <td className="px-6 py-4">
                        {article.imageUrl ? (
                          <img src={article.imageUrl} alt="" className="w-20 h-12 object-cover rounded" />
                        ) : (
                          <span className="text-xs text-gray-500">Brak obrazka</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(article.createdAt).toLocaleDateString('pl-PL')}
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={`/articles/${article.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Zobacz
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Lista tematów</h2>
          </div>
          
          {loading ? (
            <div className="p-6 text-center text-gray-600">Ładowanie...</div>
          ) : topics.length === 0 ? (
            <div className="p-6 text-center text-gray-600">
              Brak tematów. Wygeneruj nowe tematy aby rozpocząć.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tytuł</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seed Keyword</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Akcje</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {topics.map((topic) => (
                    <tr key={topic.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{topic.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 font-mono">{topic.slug}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{topic.seedKeyword}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(topic.status)}`}>
                          {getStatusText(topic.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(topic.createdAt).toLocaleDateString('pl-PL')}
                      </td>
                      <td className="px-6 py-4">
                        {topic.status === 'pending' && (
                          <button
                            onClick={() => handleGenerateArticle(topic.slug)}
                            disabled={generatingArticle === topic.slug}
                            className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:bg-gray-400"
                          >
                            {generatingArticle === topic.slug ? 'Generowanie...' : 'Generuj artykuł'}
                          </button>
                        )}
                        {topic.status === 'error' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleResetTopic(topic.id)}
                              className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                            >
                              Resetuj
                            </button>
                            <button
                              onClick={() => handleGenerateArticle(topic.slug)}
                              disabled={generatingArticle === topic.slug}
                              className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:bg-gray-400"
                            >
                              Spróbuj ponownie
                            </button>
                          </div>
                        )}
                        {topic.status === 'generated' && (
                          <span className="text-sm text-green-600">Gotowy</span>
                        )}
                        {topic.status === 'generating' && (
                          <span className="text-sm text-blue-600">Generowanie...</span>
                        )}
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

