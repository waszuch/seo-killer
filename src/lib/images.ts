const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || '';

interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
  };
  alt_description: string | null;
  user: {
    name: string;
    username: string;
  };
}

export async function searchUnsplashImage(query: string): Promise<string | null> {
  if (!UNSPLASH_ACCESS_KEY) {
    console.warn('UNSPLASH_ACCESS_KEY not configured, using placeholder');
    return null;
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      console.error('Unsplash API error:', response.status);
      return null;
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const image: UnsplashImage = data.results[0];
      return `${image.urls.raw}&w=1200&h=630&fit=crop`;
    }

    return null;
  } catch (error) {
    console.error('Error fetching from Unsplash:', error);
    return null;
  }
}

export function generatePlaceholderImage(text: string, width: number = 1200, height: number = 630): string {
  const encodedText = encodeURIComponent(text.substring(0, 50));
  return `https://placehold.co/${width}x${height}/2563eb/white?text=${encodedText}`;
}

export async function getImageForArticle(
  title: string,
  keywords: string[]
): Promise<{ url: string; alt: string; source: 'unsplash' | 'placeholder' }> {
  const searchQuery = keywords.length > 0 ? keywords[0] : title;
  
  const unsplashUrl = await searchUnsplashImage(searchQuery);
  
  if (unsplashUrl) {
    return {
      url: unsplashUrl,
      alt: title,
      source: 'unsplash'
    };
  }
  
  return {
    url: generatePlaceholderImage(title),
    alt: title,
    source: 'placeholder'
  };
}



