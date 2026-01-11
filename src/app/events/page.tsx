import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Calendar, Clock, MapPin, Target } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { getFirestore, collection, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { app } from '@/lib/firebase';

const iconMap: { [key: string]: React.ReactNode } = {
  Award: <Award className="h-8 w-8 text-primary" />,
  Target: <Target className="h-8 w-8 text-primary" />,
  Calendar: <Calendar className="h-8 w-8 text-primary" />,
};

interface AppEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  icon: string;
  registrationOpen: boolean;
}

async function getEvents(): Promise<AppEvent[]> {
  try {
    const db = getFirestore(app);
    const eventsCollection = collection(db, 'events');
    const eventSnapshot = await getDocs(eventsCollection);
    
    const events: AppEvent[] = eventSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
        const data = doc.data();
        return {
            id: doc.id,
            title: data.title || '',
            description: data.description || '',
            startDate: data.startDate || '',
            endDate: data.endDate || '',
            startTime: data.startTime || '',
            endTime: data.endTime || '',
            location: data.location || '',
            icon: data.icon || 'Calendar', // Default icon
            registrationOpen: data.registrationOpen || false
        }
    });
    return events;
  } catch (error) {
    console.error('Error fetching events from Firestore:', error);
    return [];
  }
}

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in-50 duration-500">
      <Suspense fallback={<EventsLoading />}>
        <EventsList />
      </Suspense>
    </div>
  );
}

async function EventsList() {
  const events = await getEvents();
  const hasLiveEvents = events.some(event => event.registrationOpen);

  return (
    <>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">
          {hasLiveEvents ? 'Live Events' : 'Upcoming Events'}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Join our events to learn, compete, and network with fellow cybersecurity enthusiasts.
        </p>
      </div>
      
      {!events || events.length === 0 ? (
        <div className="text-center py-16">
          <Calendar className="mx-auto h-16 w-16 text-muted-foreground/50" />
          <h2 className="mt-6 text-2xl font-semibold">No Upcoming Events</h2>
          <p className="mt-2 text-muted-foreground">Please check back soon for new events and workshops, or add new events to the 'events' collection in Firestore.</p>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-2">
          {events.map((event) => (
            <Card key={event.id} className="bg-card/70 hover:bg-card transition-all duration-300 flex flex-col group">
              <div className="flex-grow flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-secondary rounded-full transition-transform group-hover:scale-110">
                      {iconMap[event.icon] || <Calendar className="h-8 w-8 text-primary" />}
                    </div>
                    <CardTitle className="font-headline text-xl flex-1">{event.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow space-y-3 text-sm">
                   <p className="text-muted-foreground line-clamp-3">{event.description}</p>
                   <div className="border-t border-border/50 pt-4 space-y-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>
                          {event.startDate ? new Date(event.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) : ''}
                          {event.endDate && event.endDate !== event.startDate ? ` - ${new Date(event.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}` : event.startDate ? `, ${new Date(event.startDate).getFullYear()}`: 'Date TBD'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{event.startTime && event.endTime ? `${event.startTime} - ${event.endTime}` : 'Time TBD'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{event.location}</span>
                      </div>
                   </div>
                </CardContent>
              </div>
               {event.registrationOpen && (
                  <CardFooter className="pt-4 border-t border-border/50">
                    <Button asChild className="w-full">
                      <Link href={`/events/${event.id}/register`}>Register Now</Link>
                    </Button>
                  </CardFooter>
                )}
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

function EventsLoading() {
  return (
    <>
      <div className="text-center mb-12">
        <Skeleton className="h-12 w-3/4 mx-auto" />
        <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader><Skeleton className="h-8 w-full" /></CardHeader>
          <CardContent className="space-y-2 flex-grow">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
        <Card className="flex flex-col">
          <CardHeader><Skeleton className="h-8 w-full" /></CardHeader>
          <CardContent className="space-y-2 flex-grow">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
