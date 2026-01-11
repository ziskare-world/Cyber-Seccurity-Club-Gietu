
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import placeholderData from "@/app/lib/placeholder-images.json";

const newsItems = [
  {
    title: "The Importance of Strong Passwords",
    category: "Cybersecurity 101",
    date: "2024-11-10",
    author: "Jane Doe",
    authorAvatar: placeholderData.avatars[0].image,
    excerpt: "Learn why using complex and unique passwords for your accounts is one of the most effective ways to protect your digital life from unauthorized access.",
    image: placeholderData.news[0].image,
    imageHint: placeholderData.news[0].imageHint,
    href: "#",
  },
  {
    title: "Understanding Phishing Attacks",
    category: "Threat Analysis",
    date: "2024-11-08",
    author: "John Smith",
    authorAvatar: placeholderData.avatars[1].image,
    excerpt: "Phishing remains a common threat. This article breaks down how to spot phishing emails and text messages to avoid falling victim to scams.",
    image: placeholderData.news[1].image,
    imageHint: placeholderData.news[1].imageHint,
    href: "#",
  },
  {
    title: "Keeping Your Software Updated",
    category: "Best Practices",
    date: "2024-11-05",
    author: "Alex Ray",
    authorAvatar: placeholderData.avatars[2].image,
    excerpt: "Software updates often contain critical security patches. Discover why timely updates are essential for protecting your devices from known vulnerabilities.",
    image: placeholderData.news[2].image,
    imageHint: placeholderData.news[2].imageHint,
    href: "#",
  },
  {
    title: "Zero-Day Vulnerability in Popular Web Browser",
    category: "Breaking News",
    date: "2024-11-12",
    author: "Emily Carter",
    authorAvatar: placeholderData.avatars[3].image,
    excerpt: "A critical zero-day exploit has been discovered in a widely-used web browser, allowing arbitrary code execution. Users are urged to update immediately.",
    image: placeholderData.news[3].image,
    imageHint: placeholderData.news[3].imageHint,
    href: "#",
  },
  {
    title: "The Rise of AI in Cybersecurity",
    category: "Future Tech",
    date: "2024-11-11",
    author: "Michael Brown",
    authorAvatar: placeholderData.avatars[4].image,
    excerpt: "Artificial intelligence is a double-edged sword, offering new defensive capabilities while also empowering attackers. We explore the implications.",
    image: placeholderData.news[4].image,
    imageHint: placeholderData.news[4].imageHint,
    href: "#",
  },
  {
    title: "Data Breach at Major Retailer Exposes Millions",
    category: "Data Breaches",
    date: "2024-11-09",
    author: "Jane Doe",
    authorAvatar: placeholderData.avatars[0].image,
    excerpt: "A massive data breach has compromised the personal and financial information of millions of customers. The company is now facing scrutiny.",
    image: placeholderData.news[5].image,
    imageHint: placeholderData.news[5].imageHint,
    href: "#",
  },
  {
    title: "How to Secure Your Home Wi-Fi Network",
    category: "Tutorial",
    date: "2024-11-07",
    author: "John Smith",
    authorAvatar: placeholderData.avatars[1].image,
    excerpt: "Your home network is a gateway to your digital life. Follow these simple steps to ensure your Wi-Fi is secure from intruders.",
    image: placeholderData.news[6].image,
    imageHint: placeholderData.news[6].imageHint,
    href: "#",
  },
  {
    title: "The Future of Quantum Cryptography",
    category: "Deep Dive",
    date: "2024-11-06",
    author: "Alex Ray",
    authorAvatar: placeholderData.avatars[2].image,
    excerpt: "Quantum computers pose a threat to current encryption standards. Learn how quantum cryptography aims to create unbreakable codes.",
    image: placeholderData.news[7].image,
    imageHint: placeholderData.news[7].imageHint,
    href: "#",
  },
  {
    title: "Social Engineering: The Art of Human Hacking",
    category: "Psychology",
    date: "2024-11-04",
    author: "Emily Carter",
    authorAvatar: placeholderData.avatars[3].image,
    excerpt: "Attackers often exploit human psychology rather than software flaws. Understand the tactics of social engineering to protect yourself.",
    image: placeholderData.news[8].image,
    imageHint: placeholderData.news[8].imageHint,
    href: "#",
  },
  {
    title: "New Ransomware Strain Targeting Hospitals",
    category: "Threat Analysis",
    date: "2024-11-03",
    author: "Michael Brown",
    authorAvatar: placeholderData.avatars[4].image,
    excerpt: "A new and aggressive ransomware variant is disrupting healthcare services worldwide, putting patient data and lives at risk.",
    image: placeholderData.news[9].image,
    imageHint: placeholderData.news[9].imageHint,
    href: "#",
  },
];

export default function NewsPage() {
  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in-50 duration-500">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">News & Announcements</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          The latest updates from the world of cybersecurity and our club.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {newsItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <Card className="overflow-hidden h-full flex flex-col group bg-card/70 hover:bg-card transition-colors duration-300">
              <div className="overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  width={600} 
                  height={400} 
                  data-ai-hint={item.imageHint}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">{item.title}</CardTitle>
                <CardDescription className="text-primary font-semibold pt-1">{item.category}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">{item.excerpt}</p>
              </CardContent>
              <CardFooter className="flex items-center gap-4 mt-auto pt-4 border-t border-border/50">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={item.authorAvatar} data-ai-hint="person avatar" alt={item.author} />
                  <AvatarFallback>{item.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{item.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
