import { NextRequest, NextResponse } from 'next/server';

const GAD7_API_ENDPOINT = 'https://gad7.anoto.my.id/predict';
const HTTP_METHODS = {
  POST: 'POST'
};
const CONTENT_TYPES = {
  JSON: 'application/json'
};

interface GAD7RequestPayload {
  merasa_gugup_cemas_atau_gelisah: string;
  tidak_dapat_menghentikan_kekhawatiran: string;
  banyak_mengkhawatirkan_berbagai_hal: string;
  sulit_merasa_santai: string;
  sangat_gelisah_sehingga_sulit_untuk_diam: string;
  mudah_tersinggung_dan_mudah_marah: string;
  merasa_takut_seolah_olah_sesuatu_buruk_akan_terjadi: string;
}

interface GAD7Response {
  total_score: number;
  anxiety_level: string;
  anxiety_label_encoded: number;
  message: string;
}

/**
 * Forwards a request to the GAD7 API and returns the response
 */
async function forwardToGAD7Api(payload: GAD7RequestPayload): Promise<GAD7Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
  
  try {
    const response = await fetch(GAD7_API_ENDPOINT, {
      method: HTTP_METHODS.POST,
      headers: {
        'Content-Type': CONTENT_TYPES.JSON,
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      
      switch (response.status) {
        case 400:
          throw new Error(`Invalid request data: ${errorText}`);
        case 422:
          throw new Error(`Validation error: ${errorText}`);
        case 500:
          throw new Error('GAD7 API server error');
        default:
          throw new Error(`GAD7 API responded with status ${response.status}: ${errorText}`);
      }
    }
    
    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Proxies requests to the external GAD7 API to avoid CORS issues
 */
export async function POST(request: NextRequest) {
  try {
    const requestPayload = await request.json();
    console.log('Proxying request to GAD7 API:', requestPayload);
    
    const apiResponse = await forwardToGAD7Api(requestPayload);
    console.log('GAD7 API response:', apiResponse);
    
    return NextResponse.json(apiResponse);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error in GAD7 API proxy:', errorMessage);
    
    return NextResponse.json(
      { error: 'Failed to process anxiety assessment request', details: errorMessage },
      { status: 500 }
    );
  }
}
