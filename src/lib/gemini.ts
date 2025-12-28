import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GEMINI_API_KEY || '';

if (!API_KEY) {
  console.warn('GEMINI_API_KEY not found in environment variables');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export function getGeminiModel(maxTokens: number = 2000) {
  return genAI.getGenerativeModel({ 
    model: 'models/gemini-2.5-flash',
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: maxTokens,
      topP: 0.95,
      topK: 40,
    }
  });
}

export async function generateWithGemini(prompt: string, maxTokens?: number): Promise<string> {
  const model = getGeminiModel(maxTokens);
  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}

export async function generateTopicIdeas(
  seedKeyword: string,
  niche: string,
  language: string,
  count: number = 5
): Promise<string[]> {
  const prompt = `Jesteś ekspertem SEO. Wygeneruj ${count} unikalnych, ciekawych tematów artykułów związanych z "${seedKeyword}" w niszy "${niche}".

Język: ${language}

Wymagania:
- Każdy temat to konkretny tytuł artykułu gotowy do użycia
- Tematy mają być zróżnicowane i pokrywać różne aspekty słowa kluczowego
- Tytuły mają być angażujące i przyjazne SEO
- Zwróć TYLKO listę tematów, każdy w nowej linii, bez numeracji i dodatkowych znaków

Przykład formatu odpowiedzi:
Jak sztuczna inteligencja zmienia branżę marketingową
Zastosowania AI w codziennym życiu
Przyszłość sztucznej inteligencji w medycynie`;

  const response = await generateWithGemini(prompt);
  
  const topics = response
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0 && !line.match(/^\d+[\.\)]/))
    .filter(line => line.length > 10 && line.length < 200);
  
  return topics.slice(0, count);
}

