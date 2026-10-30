import { NextResponse } from 'next/server';
import { RegisterSchema, authAdapter } from '../../../../server/auth-adapter';
import { checkRateLimit } from '../../../../lib/security';

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    if (!checkRateLimit(`register-${ip}`, 5, 0.2)) {
      return NextResponse.json(
        { error: 'Too many registration requests. Please try again shortly.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = RegisterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid registration information', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const result = await authAdapter.register(parsed.data);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal Server Error', message: err.message },
      { status: 500 }
    );
  }
}
