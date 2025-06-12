import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://backend.anoto.my.id/statistics', {
      headers: {
        'Content-Type': 'application/json',
      },
      // Cache for up to 1 hour
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch statistics from external API');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    
    // Return fallback data
    return NextResponse.json({
      error: false,
      message: "Fallback statistics loaded",
      data: {
        stats: {
          total: 100,
          anxiety: 78,
          percentage: 78
        }
      }
    });
  }
}
