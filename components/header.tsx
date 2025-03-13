"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  // State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <div className="bg-black border-b border-border py-4 container-custom flex items-center justify-between">
        {/* Logo - customize with your own logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary w-8 h-8 rounded flex items-center justify-center">
            <span className="text-white font-bold">e</span>
          </div>
          <span className="text-white text-xl font-bold">Extensions 101</span>
        </Link>

        {/* Desktop Navigation - links to all main pages */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/category" className="text-white hover:text-primary transition-colors">
            Category
          </Link>
          <Link href="/search" className="text-white hover:text-primary transition-colors">
            Search
          </Link>
          <Link href="/tag" className="text-white hover:text-primary transition-colors">
            Tag
          </Link>
          <Link href="/collection" className="text-white hover:text-primary transition-colors">
            Collection
          </Link>
          <Link href="/blog" className="text-white hover:text-primary transition-colors">
            Blog
          </Link>
          <Link href="/pricing" className="text-white hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link href="/submit" className="text-white hover:text-primary transition-colors">
            Submit
          </Link>
        </nav>

        {/* Sign In Button and Dashboard Link */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/dashboard" className="text-white hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
            Sign In <span className="ml-1">→</span>
          </Button>
        </div>

        {/* Mobile Menu Button - toggles mobile menu */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu - shown only on small screens when menu is open */}
      {isMenuOpen && (
        <div className="md:hidden bg-black py-4 border-t border-border">
          <div className="container-custom flex flex-col gap-4">
            <Link href="/category" className="text-white hover:text-primary transition-colors">
              Category
            </Link>
            <Link href="/search" className="text-white hover:text-primary transition-colors">
              Search
            </Link>
            <Link href="/tag" className="text-white hover:text-primary transition-colors">
              Tag
            </Link>
            <Link href="/collection" className="text-white hover:text-primary transition-colors">
              Collection
            </Link>
            <Link href="/blog" className="text-white hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/pricing" className="text-white hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/submit" className="text-white hover:text-primary transition-colors">
              Submit
            </Link>
            <Link href="/dashboard" className="text-white hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 w-full">
              Sign In <span className="ml-1">→</span>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

