import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowRight, Calendar, Newspaper, Users, Shield } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: <Calendar className="h-8 w-8 text-primary" />,
    title: "Events Calendar",
    description: "Stay up-to-date with our workshops, CTF competitions, and guest speaker sessions.",
    href: "/events"
  },
  {
    icon: <Newspaper className="h-8 w-8 text-primary" />,
    title: "News Feed",
    description: "Get the latest announcements, club news, and cybersecurity articles.",
    href: "/news"
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Meet the Team",
    description: "Get to know the dedicated members driving our club's success.",
    href: "/members"
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Our Tools",
    description: "Explore our collection of custom-built utilities to aid in your cybersecurity journey.",
    href: "/tools"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col items-center animate-in fade-in-50 duration-500">
      <section className="w-full py-20 md:py-32 lg:py-40 relative overflow-hidden">
        <Image 
          src="https://fmlfbjzqlyjmabksounn.supabase.co/storage/v1/object/sign/telegram_uploads/Gemini_Generated_Image_9r1c9g9r1c9g9r1c.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kODc1MzdjYi0wYmM1LTQ2ZGUtODM2ZS1lNTA1ODEyMGMzZGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0ZWxlZ3JhbV91cGxvYWRzL0dlbWluaV9HZW5lcmF0ZWRfSW1hZ2VfOXIxYzlnOXIxYzlnOXIxYy5wbmciLCJpYXQiOjE3NTg5ODI4MzgsImV4cCI6MTc5MDUxODgzOH0.L2DPkWV7MOJZSRXzF0Swm8PaQz_YMkSoAIVUg3jsneg"
          alt="Hacker background"
          fill
          className="object-cover"
          data-ai-hint="hacker laptop"
        />
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="absolute inset-0 bg-grid-zinc-700/20 [mask-image:linear-gradient(to_bottom,white_5%,transparent_80%)]"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative">
          <Image src="https://media.licdn.com/dms/image/v2/D560BAQHCabIL2orglA/company-logo_200_200/company-logo_200_200/0/1724434713098/cybersecgietu_logo?e=1761782400&v=beta&t=etTTcdDqfUhHRhdkXISIGqyH01CRZpGQMTMlHSxNh70" alt="Cyber Security Club Logo" width={112} height={112} className="mx-auto h-28 w-28 rounded-full text-primary drop-shadow-[0_0_15px_hsl(var(--primary))] animate-pulse" />
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline mt-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-2">
            Cyber Security Club G I E T University
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
            Welcome to the forefront of cybersecurity exploration. Connect, learn, and innovate with us.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/events">Upcoming Events</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Link href="/news">Read the News</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-background/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center font-headline">What We Offer</h2>
          <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
            Our club provides a platform for students to learn, grow, and excel in the field of cybersecurity.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Link href={feature.href} key={feature.title} className="flex">
              <Card className="w-full bg-card/70 hover:bg-card hover:border-primary transition-all duration-300 group cursor-pointer flex flex-col">
                <CardHeader className="flex items-center text-center">
                  <div className="p-4 bg-secondary rounded-full mb-4 transition-transform group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <CardTitle className="font-headline">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground flex-grow">
                  <p>{feature.description}</p>
                </CardContent>
                <CardFooter className="pt-0 mt-auto">
                  <div className="flex items-center justify-center text-sm text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity w-full">
                    Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardFooter>
              </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
