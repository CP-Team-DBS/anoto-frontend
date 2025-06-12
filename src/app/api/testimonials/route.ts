import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://backend.anoto.my.id/testimonials', {
      headers: {
        'accept': 'application/json'
      },
      // Cache for up to 1 hour
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    
    return NextResponse.json(
      {
        error: true,
        message: "Failed to fetch testimonials",
        data: { testimonials: [] }
      },
      { status: 500 }
    );
  }
}
