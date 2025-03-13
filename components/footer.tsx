import Link from "next/link"
import { Github, Twitter, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-border py-12">
      <div className="container-custom">
        {/* Logo and Tagline - customize with your own branding */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-primary w-8 h-8 rounded flex items-center justify-center">
              <span className="text-white font-bold">e</span>
            </div>
            <span className="text-white text-xl font-bold">Extensions 101</span>
          </div>
          <p className="text-muted-foreground">Unlock Efficiency & Joy</p>

          {/* Social Links - update with your own social media links */}
          <div className="flex gap-4 mt-4">
            <Link href="#" className="text-white hover:text-primary">
              <Github size={20} />
            </Link>
            <Link href="#" className="text-white hover:text-primary">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="text-white hover:text-primary">
              <Mail size={20} />
            </Link>
          </div>
        </div>

        {/* Footer Links - organized by section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Product Links */}
          <div>
            <h3 className="text-white font-bold mb-4">PRODUCT</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/search" className="text-muted-foreground hover:text-white">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/collection" className="text-muted-foreground hover:text-white">
                  Collection
                </Link>
              </li>
              <li>
                <Link href="/category" className="text-muted-foreground hover:text-white">
                  Category
                </Link>
              </li>
              <li>
                <Link href="/tag" className="text-muted-foreground hover:text-white">
                  Tag
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-bold mb-4">RESOURCES</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-muted-foreground hover:text-white">
                  Submit
                </Link>
              </li>
              <li>
                <Link href="/studio" className="text-muted-foreground hover:text-white">
                  Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Pages Links */}
          <div>
            <h3 className="text-white font-bold mb-4">PAGES</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/collection" className="text-muted-foreground hover:text-white">
                  Collection
                </Link>
              </li>
              <li>
                <Link href="/category" className="text-muted-foreground hover:text-white">
                  Category
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-bold mb-4">COMPANY</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-muted-foreground hover:text-white">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright - update with your own copyright information */}
        <div className="mt-12 pt-8 border-t border-border flex justify-between items-center">
          <p className="text-muted-foreground">Copyright © 2025 All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

