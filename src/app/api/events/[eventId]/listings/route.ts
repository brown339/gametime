import { NextResponse } from 'next/server';
import { getDocs } from '@/lib/db';
import { where } from 'firebase/firestore';

export async function GET(
  _request: Request,
  ctx: RouteContext<'/api/events/[eventId]/listings'>,
) {
  const { eventId } = await ctx.params;
  try {
    const listings = await getDocs(
      `listingsByEventId__${eventId}`,
      'listings',
      false,
      where('eventId', '==', eventId),
    );

    return NextResponse.json(listings, {
      status: 200,
    });
  } catch (error) {
    console.error(`Error fetching listings with eventId (${eventId}):`, error);
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      {
        status: 500,
      },
    );
  }
}
