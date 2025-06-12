import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const values = Object.entries(body).map(([question, answer]) => ({
      question,
      answer
    }));

    const response = await fetch('https://backend.anoto.my.id/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ values }),
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data && data.error === false && data.data && data.data.result) {
      return NextResponse.json(data.data.result);
    } else {
      throw new Error('Invalid API response format');
    }
  } catch (error) {
    console.error('API proxy error:', error);
    return NextResponse.json({
      error: true,
      message: 'Failed to process test results',
    }, { status: 500 });
  }
}
