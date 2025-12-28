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
  const [stats, setStats] = useState<TopicStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState('');

  const loadTopics = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/topics');
      const data = await response.json();
      if (data.success) {
        setTopics(data.topics);
        setStats(data.stats);
      }
    } catch (error) {
      setMessage('Błąd podczas wczytywania tematów');
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

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Generowanie tematów</h2>
          <p className="text-gray-600 mb-4">
            Wygeneruj nowe tematy artykułów na podstawie seed keywords z konfiguracji
          </p>
          
          <button
            onClick={handleGenerateTopics}
            disabled={generating}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {generating ? 'Generowanie...' : 'Generuj tematy'}
          </button>
          
          {message && (
            <div className={`mt-4 p-3 rounded ${message.includes('Błąd') ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}>
              {message}
            </div>
          )}
        </div>

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

