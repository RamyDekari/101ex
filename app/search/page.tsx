"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import Newsletter from "@/components/newsletter"
import FoodGrid from "@/components/Food-grid"

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <>
      <div className="container-custom py-16">
        {/* Page title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Search Food</h1>

        {/* Search input */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <input
            type="text"
            placeholder="Search Food by name or description..."
            className="w-full bg-secondary border border-border rounded-lg py-3 px-4 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary p-2 rounded-lg">
            <Search className="text-white" size={20} />
          </button>
        </div>
      </div>

      {/* Food grid with search filtering */}
      <FoodGrid searchTerm={searchTerm} />

      {/* Newsletter section */}
      <Newsletter />
    </>
  )
}

