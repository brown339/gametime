import { NextResponse } from 'next/server';
import { GTCheckoutSessionRequest } from '@/app/models/GTCheckoutSession';
import { setDoc } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body: GTCheckoutSessionRequest = await request.json();

    const { userId, event, listing } = body;

    // Convert
    const sessionData = {
      id: crypto.randomUUID(),
      userId,
      event,
      listing,
      createdTimestamp: new Date(),
      expiresTimestamp: new Date(Date.now() + 15 * 60 * 1000), // Expires in 15 minutes
    };

    await setDoc('sessions', sessionData.id, sessionData);

    return NextResponse.json(sessionData, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 },
    );
  }
}
