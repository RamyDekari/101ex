"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"

// Props to allow passing the search functionality to parent components
interface HeroProps {
  onSearch?: (searchTerm: string) => void
  initialSearchTerm?: string
}

export default function Hero({ onSearch, initialSearchTerm = "" }: HeroProps) {
  // State for search input
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)

  // Update local state when initialSearchTerm changes
  useEffect(() => {
    setSearchTerm(initialSearchTerm)
  }, [initialSearchTerm])

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)

    // Call the onSearch prop if provided
    if (onSearch) {
      onSearch(value)
    }
  }

  return (
    <section className="py-16 text-center">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Featured Tag - customize with your own featured message */}
          <div className="inline-block bg-secondary rounded-full px-4 py-1 mb-8">
            <span className="text-primary">✨ Listing Efficiency & Fun Food ✨</span>
          </div>

          {/* Headline - main marketing message */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Work Less, <span className="text-primary">Create More.</span>
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
            Find the Best <span className="text-primary">Food.</span>
          </h2>

          {/* Subheadline - supporting marketing message */}
          <p className="text-muted-foreground text-lg mb-12">
            Browse Once, Optimize Forever: The Ultimate Food & Plugins Directory.
          </p>

          {/* Search Bar - filters by Food name only */}
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search Food by name..."
              className="w-full bg-secondary border border-border rounded-lg py-3 px-4 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary p-2 rounded-lg">
              <Search className="text-white" size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

