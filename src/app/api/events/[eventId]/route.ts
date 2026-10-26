import { NextResponse } from 'next/server';
import { getDoc } from '@/lib/db';

export async function GET(
  _request: Request,
  ctx: RouteContext<'/api/events/[eventId]'>,
) {
  const { eventId } = await ctx.params;
  try {
    const event = await getDoc('events', eventId);

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    return NextResponse.json(event, {
      status: 200,
    });
  } catch (error) {
    console.error(`Error fetching event with id (${eventId}):`, error);
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      {
        status: 500,
      },
    );
  }
}
