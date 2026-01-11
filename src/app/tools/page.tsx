import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Code } from "lucide-react";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ToolCard } from "./ToolCard";
import { getFirestore, collection, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { app } from '@/lib/firebase';

interface ToolLink {
  name: string;
  url: string;
}

export interface ToolCategory {
  id: string;
  title: string;
  description: string;
  links: ToolLink[];
  icon: string;
}

async function getTools(): Promise<ToolCategory[]> {
    try {
        const db = getFirestore(app);
        const resourcesCollection = collection(db, 'resources');
        const resourceSnapshot = await getDocs(resourcesCollection);
        
        const categories: ToolCategory[] = resourceSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title || 'Unnamed Category',
                description: data.description || '',
                links: data.links || [],
                icon: data.icon || 'Code',
            };
        });
        return categories;
    } catch (error) {
        console.error('Error fetching tools from Firestore:', error);
        return [];
    }
}

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in-50 duration-500">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">Our Tools</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          A collection of custom-built utilities to aid in your cybersecurity journey.
        </p>
      </div>
      
      <Suspense fallback={<ToolsLoading/>}>
        <ToolsList/>
      </Suspense>
      
    </div>
  );
}

async function ToolsList() {
  const tools = await getTools();

  return (
    <>
      {tools.length === 0 ? (
        <div className="text-center py-16">
          <Code className="mx-auto h-16 w-16 text-muted-foreground/50" />
          <h2 className="mt-6 text-2xl font-semibold">No Tools Available</h2>
          <p className="mt-2 text-muted-foreground">Check back later for new utilities, or add new tools to the 'resources' collection in Firestore.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </>
  )
}

function ToolsLoading() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex items-start gap-4">
              <Skeleton className="h-14 w-14 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full mt-2" />
          </CardContent>
          <div className="p-6 pt-0 flex flex-row flex-wrap gap-2">
             <Skeleton className="h-9 w-24" />
             <Skeleton className="h-9 w-24" />
          </div>
        </Card>
      ))}
    </div>
  )
}
