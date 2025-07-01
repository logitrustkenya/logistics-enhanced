import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

// GET /api/tracking - Get all tracking records
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const records = await db.collection('tracking').find({}).toArray();
    return NextResponse.json(records);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tracking records' }, { status: 500 });
  }
}

// POST /api/tracking - Create a new tracking record
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('tracking').insertOne({
      shipmentId: data.shipmentId || '',
      location: data.location || '',
      status: data.status || 'in transit',
    });
    return NextResponse.json({ ...data, id: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create tracking record' }, { status: 500 });
  }
}

// PUT /api/tracking - Update a tracking record
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const client = await clientPromise;
    const db = client.db();
    const { id, ...updateData } = data;
    const result = await db.collection('tracking').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Tracking record not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Tracking record updated' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update tracking record' }, { status: 500 });
  }
}

// DELETE /api/tracking - Delete a tracking record
export async function DELETE(request: NextRequest) {
  try {
    const data = await request.json();
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('tracking').deleteOne({ _id: new ObjectId(data.id) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Tracking record not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Tracking record deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete tracking record' }, { status: 500 });
  }
}
