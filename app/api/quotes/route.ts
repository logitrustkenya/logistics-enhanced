import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

// GET /api/quotes - Get all quotes
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const quotes = await db.collection('quotes').find({}).toArray();
    return NextResponse.json(quotes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 });
  }
}

// POST /api/quotes - Create a new quote
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('quotes').insertOne({
      description: data.description || '',
      price: data.price || 0,
    });
    return NextResponse.json({ ...data, id: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create quote' }, { status: 500 });
  }
}

// PUT /api/quotes - Update a quote
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const client = await clientPromise;
    const db = client.db();
    const { id, ...updateData } = data;
    const result = await db.collection('quotes').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Quote updated' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update quote' }, { status: 500 });
  }
}

// DELETE /api/quotes - Delete a quote
export async function DELETE(request: NextRequest) {
  try {
    const data = await request.json();
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('quotes').deleteOne({ _id: new ObjectId(data.id) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Quote deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete quote' }, { status: 500 });
  }
}
