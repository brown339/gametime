import { NextResponse } from 'next/server';
import { getDoc, updateDoc } from '@/lib/db';
import { GTListing } from '@/app/models/GTListing';

export async function GET(
  _request: Request,
  ctx: RouteContext<'/api/events/[eventId]/listings/[listingId]'>,
) {
  const { listingId } = await ctx.params;
  try {
    const listing = await getDoc('listings', listingId, true);

    return NextResponse.json(listing, {
      status: 200,
    });
  } catch (error) {
    console.error(`Error fetching listing with id (${listingId}):`, error);
    return NextResponse.json(
      { error: 'Failed to fetch listing' },
      {
        status: 500,
      },
    );
  }
}

export async function PUT(
  request: Request,
  ctx: RouteContext<'/api/events/[eventId]/listings/[listingId]'>,
) {
  const { listingId } = await ctx.params;
  const body: GTListing = await request.json();
  const { availableSeatsTogether } = body;

  console.log('availableSeatsTogether', availableSeatsTogether);

  try {
    await updateDoc('listings', listingId, {
      availableSeatsTogether,
    });

    return NextResponse.json({
      status: 200,
    });
  } catch (error) {
    console.error(`Error updating listing with id (${listingId}):`, error);
    return NextResponse.json(
      { error: 'Failed to update listing' },
      {
        status: 500,
      },
    );
  }
}
