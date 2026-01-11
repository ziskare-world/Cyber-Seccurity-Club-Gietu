"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/members", label: "Members" },
  { href: "/tools", label: "Tools" },
];

export function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={cn("sticky top-0 z-50 w-full transition-all duration-300", isScrolled ? "bg-background/90 backdrop-blur-sm" : "bg-transparent")}>
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <Image src="https://media.licdn.com/dms/image/v2/D560BAQHCabIL2orglA/company-logo_200_200/company-logo_200_200/0/1724434713098/cybersecgietu_logo?e=1761782400&v=beta&t=etTTcdDqfUhHRhdkXISIGqyH01CRZpGQMTMlHSxNh70" alt="Cyber Security Club Logo" width={28} height={28} className="h-7 w-7 rounded-full text-primary" />
          <span className="hidden font-bold sm:inline-block font-headline text-xl">Cyber Security Club</span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-6 text-sm font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname === href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-6 p-6">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsSheetOpen(false)}>
                  <Image src="https://media.licdn.com/dms/image/v2/D560BAQHCabIL2orglA/company-logo_200_200/company-logo_200_200/0/1724434713098/cybersecgietu_logo?e=1761782400&v=beta&t=etTTcdDqfUhHRhdkXISIGqyH01CRZpGQMTMlHSxNh70" alt="Cyber Security Club Logo" width={28} height={28} className="h-7 w-7 rounded-full text-primary" />
                  <span className="font-bold font-headline text-xl">Cyber Security Club</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map(({ href, label }) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setIsSheetOpen(false)}
                      className={cn(
                        "text-lg transition-colors hover:text-primary",
                        pathname === href ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
