import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Forward the request to the external API
    const response = await fetch('https://backend.anoto.my.id/journals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in journals API route:', error);
    
    // Return mock data as fallback
    return NextResponse.json({
      error: false,
      message: "Journal Result (fallback data)",
      data: {
        result: {
          emotions: [
            { name: "nervousness", score: 3 },
            { name: "anxiety", score: 2 },
            { name: "fear", score: 1 }
          ],
          insight: "gelisah lumayan, kesedihan sedikit, rasa malu lumayan",
          validation: "Rasanya berat ya lagi ngerasain gelisah dan malu, aku ngerti kok, kadang kita memang butuh waktu untuk melewati perasaan kayak gini.",
          saran: [
            "Lakukan aktivitas yang menenangkan, seperti mendengarkan musik yang menenangkan, membaca buku, atau mandi air hangat.",
            "Hubungi orang terdekat yang Anda percayai dan bicarakan perasaan Anda. Jangan ragu untuk meminta dukungan."
          ]
        }
      }
    });
  }
}
