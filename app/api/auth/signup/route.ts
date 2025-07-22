import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

// POST /api/auth/signup - Register new user
export async function POST(request: NextRequest) {
  try {
    const { email, password, userType } = await request.json();
    const client = await clientPromise;
    const db = client.db();

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
    }

    // Create user with the selected userType
    const result = await db.collection('users').insertOne({ 
      email, 
      password, 
      userType: userType || 'sme', // Use provided userType or default to 'sme'
      createdAt: new Date(),
      profileCompleted: false
    });
    
    return NextResponse.json({ 
      message: 'User registered successfully', 
      userId: result.insertedId 
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Signup endpoint - use POST to register' });
}
