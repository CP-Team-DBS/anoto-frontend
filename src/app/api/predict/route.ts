import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch('https://gad7.anoto.my.id/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API proxy error:', error);
    
    // // Return a fallback response for development
    // return NextResponse.json({
    //   total_score: 5,
    //   anxiety_level: "Ringan",
    //   anxiety_label_encoded: 2,
    //   message: "Tingkat kecemasan Anda tergolong ringan. Perlu mulai memperhatikan tanda-tanda stres dan mengelolanya dengan baik."
    // }, { status: 200 });
  }
}
