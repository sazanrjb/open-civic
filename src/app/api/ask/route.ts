import { NextRequest, NextResponse } from 'next/server';
import { AI } from '@/app/ai/AI';
import { z } from 'zod';
import { ChatType } from '@/types/ai';

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams;

  const message = searchParams.get('message');
  const type = z
    .nativeEnum(ChatType)
    .parse(searchParams.get('type') || ChatType.GENERAL);

  if (!message) {
    return NextResponse.json({
      data: 'Message is required',
    });
  }
  const aiClient = new AI();

  const result = await aiClient.send(message, type);

  return NextResponse.json({
    data: result,
  });
}
