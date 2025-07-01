import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

// GET /api/shipments - Get all shipments
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const shipments = await db.collection('shipments').find({}).toArray();
    return NextResponse.json(shipments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch shipments' }, { status: 500 });
  }
}

// POST /api/shipments - Create a new shipment
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('shipments').insertOne({
      description: data.description || '',
      status: data.status || 'pending',
    });
    return NextResponse.json({ _id: result.insertedId, ...data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create shipment' }, { status: 500 });
  }
}

// PUT /api/shipments - Update a shipment
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    if (!data._id) {
      return NextResponse.json({ error: 'Missing shipment _id' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('shipments').updateOne(
      { _id: new ObjectId(data._id) },
      { $set: { description: data.description, status: data.status } }
    );
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
    }
    const updatedShipment = await db.collection('shipments').findOne({ _id: new ObjectId(data._id) });
    return NextResponse.json(updatedShipment);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update shipment' }, { status: 500 });
  }
}

// DELETE /api/shipments - Delete a shipment
export async function DELETE(request: NextRequest) {
  try {
    const data = await request.json();
    if (!data._id) {
      return NextResponse.json({ error: 'Missing shipment _id' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('shipments').deleteOne({ _id: new ObjectId(data._id) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Shipment deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete shipment' }, { status: 500 });
  }
}
