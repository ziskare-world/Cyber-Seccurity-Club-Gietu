
import { NextResponse } from 'next/server';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '@/lib/firebase';

const db = getFirestore(app);

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const eventId = params.id;
  if (!eventId) {
    return new NextResponse(
      JSON.stringify({ message: 'Event ID is required.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const registrationData = await request.json();
    
    const participantsCollectionRef = collection(db, 'events', eventId, 'participants');
    await addDoc(participantsCollectionRef, registrationData);

    return NextResponse.json({ message: 'Registration successful' }, { status: 201 });
  } catch (error) {
    console.error('Error adding registration to Firestore:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Failed to process registration.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
