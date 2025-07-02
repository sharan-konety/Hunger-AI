import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'API is working!', 
    timestamp: new Date().toISOString() 
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json({ 
    message: 'POST endpoint working!', 
    received: body,
    timestamp: new Date().toISOString() 
  });
} 