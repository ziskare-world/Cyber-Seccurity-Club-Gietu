import { Suspense } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Linkedin, Github, Users, UserSquare } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { getFirestore, collection, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { app } from '@/lib/firebase';

interface Member {
    id: string;
    name: string;
    role: string;
    avatarUrl: string;
    socials: {
        linkedin?: string;
        github?: string;
        instagram?: string;
        facebook?: string;
    }
}

async function getMembers(): Promise<Member[]> {
    try {
        const db = getFirestore(app);
        const membersCollection = collection(db, 'members');
        const memberSnapshot = await getDocs(membersCollection);
        
        const members: Member[] = memberSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name || 'No Name',
                role: data.role || 'Club Member',
                avatarUrl: data.avatar || '',
                socials: {
                    linkedin: data.linkedin,
                    github: data.github,
                    instagram: data.instagram,
                    facebook: data.facebook,
                },
            };
        });
        return members;
    } catch (error) {
        console.error('Error fetching members from Firestore:', error);
        return [];
    }
}

export default function MembersPage() {
    return (
        <div className="container mx-auto px-4 py-12 animate-in fade-in-50 duration-500">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">Meet the Team</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    The driving force behind the Cyber Security Club.
                </p>
            </div>
            <Suspense fallback={<MembersLoading />}>
                <MembersList />
            </Suspense>
        </div>
    );
}

async function MembersList() {
    const members = await getMembers();

    if (!members || members.length === 0) {
        return (
            <div className="text-center py-16">
                <Users className="mx-auto h-16 w-16 text-muted-foreground/50" />
                <h2 className="mt-6 text-2xl font-semibold">No Members Found</h2>
                <p className="mt-2 text-muted-foreground">Please check back later, or add new members to the 'member' collection in Firestore.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {members.map((member) => (
                <Card key={member.id} className="text-center bg-card/70 hover:bg-card transition-all duration-300 flex flex-col group">
                     <CardHeader className="items-center">
                        <Avatar className="h-24 w-24 border-2 border-primary/50 group-hover:border-primary transition-colors">
                            <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint="person avatar" />
                            <AvatarFallback>
                                <UserSquare className="h-12 w-12 text-muted-foreground" />
                            </AvatarFallback>
                        </Avatar>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <h3 className="text-xl font-bold font-headline">{member.name}</h3>
                        <p className="text-primary font-medium">{member.role}</p>
                    </CardContent>
                    <CardFooter className="justify-center gap-2 pt-4 border-t border-border/50">
                        {member.socials.linkedin && (
                            <Button variant="ghost" size="icon" asChild>
                                <Link href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
                                    <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </Link>
                            </Button>
                        )}
                        {member.socials.github && (
                            <Button variant="ghost" size="icon" asChild>
                                <Link href={member.socials.github} target="_blank" rel="noopener noreferrer">
                                    <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </Link>
                            </Button>
                        )}
                        {member.socials.instagram && (
                             <Button variant="ghost" size="icon" asChild>
                                <Link href={member.socials.instagram} target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-primary transition-colors"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                                </Link>
                            </Button>
                        )}
                        {member.socials.facebook && (
                             <Button variant="ghost" size="icon" asChild>
                                <Link href={member.socials.facebook} target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-muted-foreground group-hover:text-primary transition-colors"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89H8.354v-2.89h2.084V9.56c0-2.067 1.234-3.2 3.11-3.2 1.486 0 2.222.112 2.522.162v2.585h-1.52c-1.001 0-1.195.476-1.195 1.172v1.53h2.857l-.371 2.89h-2.486v7.008C18.343 21.128 22 16.991 22 12z"/></svg>
                                </Link>
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

function MembersLoading() {
    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
                <Card key={i} className="text-center">
                    <CardHeader className="items-center">
                       <Skeleton className="h-24 w-24 rounded-full" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-6 w-3/4 mx-auto" />
                        <Skeleton className="h-4 w-1/2 mx-auto mt-2" />
                    </CardContent>
                    <CardFooter className="justify-center gap-2">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
