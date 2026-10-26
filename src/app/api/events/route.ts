import { NextResponse } from 'next/server';
import { getDocs } from '@/lib/db';

export async function GET() {
  try {
    const events = await getDocs('events', 'events');

    return NextResponse.json(events, {
      status: 200,
    });
  } catch (err) {
    console.error('Error fetching events:', err);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      {
        status: 500,
      },
    );
  }
}
