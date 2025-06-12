import { NextResponse } from 'next/server';

// Handler for GET requests - fetches all testimonials
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

// Handler for POST requests - submits a new testimonial
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch('https://backend.anoto.my.id/testimonials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in testimonials API route:', error);
    
    return NextResponse.json(
      {
        error: true,
        message: "Failed to submit testimonial. Please try again later.",
      },
      { status: 500 }
    );
  }
}
