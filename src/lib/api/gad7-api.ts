// GAD7 API Service

// Types for API request and response
export interface GAD7FormData {
  merasa_gugup_cemas_atau_gelisah: string;
  tidak_dapat_menghentikan_kekhawatiran: string;
  banyak_mengkhawatirkan_berbagai_hal: string;
  sulit_merasa_santai: string;
  sangat_gelisah_sehingga_sulit_untuk_diam: string;
  mudah_tersinggung_dan_mudah_marah: string;
  merasa_takut_seolah_olah_sesuatu_buruk_akan_terjadi: string;
}

export interface GAD7ApiResponse {
  total_score: number;
  anxiety_level: string;
  anxiety_label_encoded: number;
  message: string;
}

export type AnxietyLevel = 'normal' | 'anxious_light' | 'anxious_moderate' | 'anxious_severe';

const API_CONFIG = {
  ENDPOINT: '/api/gad7/predict',
  METHODS: {
    POST: 'POST'
  },
  HEADERS: {
    CONTENT_TYPE: 'application/json'
  }
};

const ANXIETY_LEVEL_MAPPING: Record<string, AnxietyLevel> = {
  'Normal': 'normal',
  'Ringan': 'anxious_light',
  'Sedang': 'anxious_moderate',
  'Berat': 'anxious_severe'
};

/**
 * Submits GAD7 assessment data and returns anxiety prediction
 */
export async function predictAnxiety(formData: GAD7FormData): Promise<GAD7ApiResponse> {
  try {
    const response = await fetch(API_CONFIG.ENDPOINT, {
      method: API_CONFIG.METHODS.POST,
      headers: {
        'Content-Type': API_CONFIG.HEADERS.CONTENT_TYPE,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to predict anxiety:', error);
    
    if (process.env.NODE_ENV === 'development') {
      return createMockResponse();
    }
    
    throw error;
  }
}

/**
 * Maps API anxiety level to UI representation
 */
export function mapAnxietyLevelToUi(level: string): AnxietyLevel {
  return ANXIETY_LEVEL_MAPPING[level] || 'normal';
}

/**
 * Creates a mock response for development environment
 */
function createMockResponse(): GAD7ApiResponse {
  return {
    total_score: 5,
    anxiety_level: "Ringan",
    anxiety_label_encoded: 1,
    message: "Tingkat kecemasan Anda tergolong ringan. Perlu mulai memperhatikan tanda-tanda stres dan mengelolanya dengan baik."
  };
}
