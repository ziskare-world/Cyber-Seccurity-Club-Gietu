
"use client";

import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, UserPlus, CheckCircle, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { getFirestore, collection, getDocs, QueryDocumentSnapshot, DocumentData, doc, getDoc } from 'firebase/firestore';
import { app } from '@/lib/firebase';

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }).refine(email => email.endsWith('@giet.edu'), {
    message: "Only emails from the giet.edu domain are allowed.",
  }),
  rollNo: z.string().min(5, {
    message: "Roll number must be at least 5 characters.",
  }),
  section: z.string().min(1, {
    message: "Section is required.",
  }),
  studyYear: z.string({
    required_error: "Please select a study year.",
  }),
  shift: z.string({
    required_error: "Please select a shift.",
  }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "You need to select a gender.",
  }),
}).refine(data => {
    if (!data.email || !data.rollNo || !data.name) return true;
    const emailPrefix = data.email.split('@')[0].toLowerCase();
    const rollNumber = data.rollNo.toLowerCase();
    const nameSanitized = data.name.toLowerCase().replace(/[^a-z]/g, '');
    return emailPrefix.includes(rollNumber) && emailPrefix.includes(nameSanitized);
}, {
    message: "Email must contain your name (lowercase, no spaces or symbols) and roll number.",
    path: ['email'],
});

type FormValues = z.infer<typeof FormSchema>;

interface AppEvent {
  id: string;
  title: string;
}

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [event, setEvent] = useState<AppEvent | null>(null);
  const [isFetchingEvent, setIsFetchingEvent] = useState(true);

  const { toast } = useToast();
  const params = useParams();
  const eventId = params.id as string;

  useEffect(() => {
    async function fetchEvent() {
        if (!eventId) return;
        try {
            const db = getFirestore(app);
            const eventDocRef = doc(db, 'events', eventId);
            const eventDocSnap = await getDoc(eventDocRef);

            if (eventDocSnap.exists()) {
                setEvent({ id: eventDocSnap.id, ...eventDocSnap.data() } as AppEvent);
            } else {
                toast({ title: "Error", description: "Event not found.", variant: "destructive" });
            }
        } catch (error) {
            console.error("Failed to fetch event:", error);
            toast({ title: "Error", description: "Could not load event details.", variant: "destructive" });
        } finally {
            setIsFetchingEvent(false);
        }
    }
    fetchEvent();
  }, [eventId, toast]);


  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      rollNo: "",
      section: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    try {
      const submissionData = {
        ...data,
        rollNo: data.rollNo.toUpperCase(),
      };

      const response = await fetch(`/api/events/${eventId}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }
      
      setIsSubmitted(true);
      toast({
        title: "Registration Successful!",
        description: "We've received your registration. Check your email for details.",
      });

    } catch (error) {
      console.error("Registration failed:", error);
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
        <Card className="max-w-md w-full text-center animate-in fade-in-50">
            <CardHeader>
                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <CardTitle className="text-2xl font-headline">Registration Confirmed!</CardTitle>
                <CardDescription>
                    Thank you for registering. A confirmation has been sent to your email.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild>
                    <Link href="/events">Back to Events</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <UserPlus className="mx-auto h-12 w-12 text-primary" />
        {isFetchingEvent ? (
            <Skeleton className="h-12 w-3/4 mx-auto mt-4" />
        ) : (
            <h1 className="mt-4 text-4xl font-bold font-headline tracking-tight sm:text-5xl">Register for {event?.title || 'Event'}</h1>
        )}
        <p className="mt-4 text-lg text-muted-foreground">
          Complete the form below to secure your spot.
        </p>
      </div>
      
      <Card className="max-w-xl mx-auto">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="rollno.name@giet.edu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rollNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Roll No.</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., 21CSE001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="section"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., CSE-A" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

               <FormField
                  control={form.control}
                  name="studyYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Study Year</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your study year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1st">1st Year</SelectItem>
                          <SelectItem value="2nd">2nd Year</SelectItem>
                          <SelectItem value="3rd">3rd Year</SelectItem>
                          <SelectItem value="4th">4th Year</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

               <FormField
                control={form.control}
                name="shift"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shift</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your shift" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="morning">Morning</SelectItem>
                        <SelectItem value="afternoon">Afternoon</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="male" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Male
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="female" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Female
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="other" />
                          </FormControl>
                          <FormLabel className="font-normal">Other</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
