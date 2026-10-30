import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    status: 'ready',
    service: 'servicesplus-frontend',
    env: process.env.NODE_ENV || 'development',
  });
}
