import { NextRequest, NextResponse } from 'next/server';
import { generateTopicsFromSeeds, generateTopicsForKeyword } from '@/lib/topic-generator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { keyword, count } = body;

    let result;
    
    if (keyword) {
      result = await generateTopicsForKeyword(keyword, count || 5);
    } else {
      result = await generateTopicsFromSeeds(count || 3);
    }

    if (!result.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to generate topics', 
          details: result.errors 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      generated: result.generated,
      topics: result.topics,
      errors: result.errors
    });
  } catch (error) {
    console.error('Error in generate topics API:', error);
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


