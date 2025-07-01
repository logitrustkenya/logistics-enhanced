import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

// GET /api/payments - Get all payments
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const payments = await db.collection('payments').find({}).toArray();
    return NextResponse.json(payments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
  }
}

// POST /api/payments - Create a new payment
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('payments').insertOne({
      amount: data.amount || 0,
      status: data.status || 'pending',
    });
    return NextResponse.json({ ...data, id: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 });
  }
}

// PUT /api/payments - Update a payment
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const client = await clientPromise;
    const db = client.db();
    const { id, ...updateData } = data;
    const result = await db.collection('payments').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Payment updated' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update payment' }, { status: 500 });
  }
}

// DELETE /api/payments - Delete a payment
export async function DELETE(request: NextRequest) {
  try {
    const data = await request.json();
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('payments').deleteOne({ _id: new ObjectId(data.id) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Payment deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete payment' }, { status: 500 });
  }
}
