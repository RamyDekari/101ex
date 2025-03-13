"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, User, LayoutDashboard, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardHeader() {
  // State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-black border-b border-border py-4">
      <div className="container-custom flex items-center justify-between">


{/* Desktop Navigation - dashboard specific links */}
<nav className="hidden md:flex items-center justify-center gap-6">
  <Link href="/dashboard" className="text-white hover:text-primary transition-colors flex items-center gap-1">
    <LayoutDashboard size={18} />
    <span>Admin</span>
  </Link>
  <Link
    href="/dashboard/users"
    className="text-white hover:text-primary transition-colors flex items-center gap-1"
  >
    <User size={18} />
    <span>Users</span>
  </Link>
</nav>



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
            <Link href="/dashboard" className="text-white hover:text-primary transition-colors flex items-center gap-2">
              <LayoutDashboard size={18} />
              <span>Admin</span>
            </Link>
            <Link
              href="/dashboard/users"
              className="text-white hover:text-primary transition-colors flex items-center gap-2"
            >
              <User size={18} />
              <span>Users</span>
            </Link>
            <Link href="/" className="text-white hover:text-primary transition-colors">
              Back to Site
            </Link>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 w-full flex items-center justify-center gap-1">
              <LogOut size={18} />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

