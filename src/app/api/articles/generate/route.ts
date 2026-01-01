import { NextRequest, NextResponse } from 'next/server';
import { generateArticleFromTopic, generateMultipleArticles } from '@/lib/article-generator';
import { getPendingTopics } from '@/lib/topics';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topicSlug, topicSlugs, count } = body;

    if (topicSlug) {
      const article = await generateArticleFromTopic(topicSlug);
      return NextResponse.json({
        success: true,
        article
      });
    }
    
    if (topicSlugs && Array.isArray(topicSlugs)) {
      const result = await generateMultipleArticles(topicSlugs);
      return NextResponse.json({
        success: result.failed === 0,
        ...result
      });
    }
    
    if (count) {
      const pendingTopics = getPendingTopics(count);
      const slugs = pendingTopics.map(t => t.slug);
      const result = await generateMultipleArticles(slugs);
      return NextResponse.json({
        success: result.failed === 0,
        ...result
      });
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Missing required parameters: topicSlug, topicSlugs, or count' 
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error in generate articles API:', error);
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




