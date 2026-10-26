import { deleteDoc, getDoc } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  ctx: RouteContext<'/api/sessions/[sessionId]'>,
) {
  try {
    const { sessionId } = await ctx.params;
    const sessionData = await getDoc('sessions', sessionId);

    console.log('sessionData', sessionData);
    if (sessionData) {
      sessionData.createdTimestamp = sessionData.createdTimestamp.toDate();
      sessionData.expiresTimestamp = sessionData.expiresTimestamp.toDate();
    }
    return NextResponse.json(sessionData, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch session' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  ctx: RouteContext<'/api/sessions/[sessionId]'>,
) {
  try {
    const { sessionId } = await ctx.params;
    await deleteDoc('sessions', sessionId);

    return NextResponse.json({
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch session' },
      { status: 500 },
    );
  }
}
