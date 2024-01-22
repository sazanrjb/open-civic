import { NextRequest, NextResponse } from 'next/server';
import { AI } from '@/app/ai/AI';

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams;

  const message = searchParams.get('message');

  if (!message) {
    return NextResponse.json({
      data: 'Message is required',
    });
  }
  const aiClient = new AI();

  const result = await aiClient.send(message);

  return NextResponse.json({
    data: result,
  });
}
