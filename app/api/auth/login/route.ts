import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

// POST /api/auth/login - Authenticate user
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection('users').findOne({ email, password });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    // In real app, generate and return JWT or session token
    return NextResponse.json({ message: 'Login successful', userId: user._id, userType: user.userType });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to login' }, { status: 500 });
  }
}
