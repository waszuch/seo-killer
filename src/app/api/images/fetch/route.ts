import { NextRequest, NextResponse } from 'next/server';
import { getImageForArticle } from '@/lib/images';
import { getArticleBySlug, loadArticles, saveArticles } from '@/lib/articles';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug } = body;

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Missing slug parameter' },
        { status: 400 }
      );
    }

    const article = getArticleBySlug(slug);

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }

    const imageData = await getImageForArticle(
      article.meta.title,
      article.meta.keywords
    );

    const db = loadArticles();
    const articleIndex = db.articles.findIndex(a => a.slug === slug);
    
    if (articleIndex !== -1) {
      db.articles[articleIndex].imageUrl = imageData.url;
      db.articles[articleIndex].imageAlt = imageData.alt;
      saveArticles(db);
    }

    return NextResponse.json({
      success: true,
      image: imageData
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}



