"use client"

import { useState } from "react"
import { categories } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { ChevronDown, Check } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sort options for the dropdown
const sortOptions = [
  { label: "Sort by Time (dsc)", value: "time-dsc" },
  { label: "Sort by Time (asc)", value: "time-asc" },
  { label: "Sort by Name (dsc)", value: "name-dsc" },
  { label: "Sort by Name (asc)", value: "name-asc" },
]

export default function CategorySection() {
  // State for category and sort selection
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortOption, setSortOption] = useState(sortOptions[0])

  return (
    <section className="py-16">
      <div className="container-custom text-center">
        {/* Section title */}
        <span className="text-primary uppercase font-semibold">CATEGORY</span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-8">Explore by categories</h2>

        {/* Category filters and sort dropdown */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {/* Category buttons */}
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === selectedCategory ? "default" : "outline"}
              className={`rounded-full px-4 py-2 ${
                category === selectedCategory
                  ? "bg-primary text-white"
                  : "bg-secondary text-white hover:bg-secondary/80"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}

          {/* Sort dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="rounded-full px-4 py-2 bg-secondary text-white hover:bg-secondary/80 ml-2"
              >
                {sortOption.label} <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-secondary border-border">
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  className={`flex items-center ${sortOption.value === option.value ? "text-primary" : "text-white"}`}
                  onClick={() => setSortOption(option)}
                >
                  {sortOption.value === option.value && <Check className="mr-2 h-4 w-4" />}
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </section>
  )
}

