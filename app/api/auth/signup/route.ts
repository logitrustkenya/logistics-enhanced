import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

// POST /api/auth/signup - Register new user
export async function POST(request: NextRequest) {
  try {
    const { email, password, userType } = await request.json();
    const client = await clientPromise;
    const db = client.db();

    const existingUser = await db.collection('users').findOne({ email, userType });
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email and userType already exists' }, { status: 409 });
    }

    const result = await db.collection('users').insertOne({ email, password, userType });
    return NextResponse.json({ message: 'User registered successfully', userId: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Signup endpoint - use POST to register' });
}
