import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// This is a development-only API route to demonstrate local data usage
// For production, replace with actual database operations

const DATA_FILE_PATH = path.join(process.cwd(), 'src/data/testimonials.json');

export async function GET() {
  try {
    // Read testimonials from local JSON file
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf8');
    const data = JSON.parse(fileContent);
    
    return NextResponse.json({
      success: true,
      data: data.testimonials
    });
  } catch (error) {
    console.error('Error reading testimonials:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, text, rating } = body;
    
    // Validate required fields
    if (!name || !text || !rating) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Read existing testimonials
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf8');
    const data = JSON.parse(fileContent);
    
    // Create new testimonial
    const newTestimonial = {
      id: Date.now().toString(),
      name,
      text,
      rating: parseInt(rating),
      createdAt: new Date().toISOString()
    };
    
    // Add to testimonials array
    data.testimonials.unshift(newTestimonial);
    
    // Write back to file
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2));
    
    return NextResponse.json({
      success: true,
      data: newTestimonial
    });
  } catch (error) {
    console.error('Error saving testimonial:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save testimonial' },
      { status: 500 }
    );
  }
}