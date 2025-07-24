import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import PWAInstallButton from "./pwa-install-button"

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col gap-8 py-8 md:flex-row md:py-12">
        <div className="flex-1 space-y-4">
          <h2 className="font-bold">Cyber Physical Lab</h2>
          <p className="text-sm text-muted-foreground">Advancing research in Cyber Physical Systems and IoT technologies.</p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-12 sm:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Research</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/research" className="text-muted-foreground transition-colors hover:text-primary">
                  Research Areas
                </Link>
              </li>
              <li>
                <Link href="/publications" className="text-muted-foreground transition-colors hover:text-primary">
                  Publications
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-muted-foreground transition-colors hover:text-primary">
                  Lab News
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Team</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/team" className="text-muted-foreground transition-colors hover:text-primary">
                  All Members
                </Link>
              </li>
              <li>
                <Link href="/profile/1" className="text-muted-foreground transition-colors hover:text-primary">
                  Dr. John Smith
                </Link>
              </li>
              <li>
                <Link href="/profile/2" className="text-muted-foreground transition-colors hover:text-primary">
                  Dr. Jane Doe
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Lab</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/admin" className="text-muted-foreground transition-colors hover:text-primary">
                  Admin Portal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground transition-colors hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/get-started" className="text-muted-foreground transition-colors hover:text-primary">
                  Join Lab
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Connect</h3>
            <div className="flex flex-col space-y-3">
              <Link
                href="https://github.com/cyberphysicallab"
                className="text-muted-foreground transition-colors hover:text-primary text-sm flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Link>
              <Link
                href="https://twitter.com/cyberphysicallab"
                className="text-muted-foreground transition-colors hover:text-primary text-sm flex items-center gap-2"
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </Link>
              <Link
                href="https://linkedin.com/company/cyberphysicallab"
                className="text-muted-foreground transition-colors hover:text-primary text-sm flex items-center gap-2"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container border-t py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Cyber Physical Lab. All rights reserved.
          </p>
          <PWAInstallButton />
        </div>
      </div>
    </footer>
  )
}
