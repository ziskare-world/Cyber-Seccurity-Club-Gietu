import { Button } from "@/components/ui/button"
import { Linkedin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center gap-2 mb-2">
                <Image src="https://media.licdn.com/dms/image/v2/D560BAQHCabIL2orglA/company-logo_200_200/company-logo_200_200/0/1724434713098/cybersecgietu_logo?e=1761782400&v=beta&t=etTTcdDqfUhHRhdkXISIGqyH01CRZpGQMTMlHSxNh70" alt="Cyber Security Club Logo" width={44} height={44} className="h-11 w-11 rounded-full text-primary drop-shadow-[0_0_5px_hsl(var(--primary))]" />
                <span className="text-xl font-bold font-headline">Cyber Security Club</span>
            </Link>
            <p className="text-muted-foreground mt-2 text-sm max-w-xs">The premier cybersecurity hub for enthusiasts and professionals at GIET University.</p>
          </div>
          <div className="md:ml-auto flex flex-col items-center md:items-end">
            <h4 className="font-semibold text-lg font-headline">Follow Us</h4>
            <div className="flex gap-2 mt-3">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" asChild>
                <Link href="https://www.linkedin.com/company/cybersecgietu/" aria-label="LinkedIn" target="_blank">
                    <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" asChild>
                <Link href="https://www.instagram.com/cybersecgietu?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" aria-label="Instagram" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Cyber Security Club G I E T University. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
