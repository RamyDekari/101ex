"use client"

import { useState } from "react"
import { extensions, categories } from "@/lib/data"
import ExtensionCard from "./extension-card"
import { Button } from "@/components/ui/button"
import { ChevronDown, Check, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sort options for the dropdown
const sortOptions = [
  { label: "Sort by Time (dsc)", value: "time-dsc" },
  { label: "Sort by Time (asc)", value: "time-asc" },
  { label: "Sort by Name (dsc)", value: "name-dsc" },
  { label: "Sort by Name (asc)", value: "name-asc" },
  { label: "Sort by Rating (dsc)", value: "rating-dsc" },
  { label: "Sort by Rating (asc)", value: "rating-asc" },
]

interface ExtensionGridProps {
  showCategoryFilter?: boolean
  searchTerm?: string
}

export default function ExtensionGrid({ showCategoryFilter = true, searchTerm = "" }: ExtensionGridProps) {
  // State for category and sort selection
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortOption, setSortOption] = useState(sortOptions[0])
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)

  // Filter extensions based on selected category and search term
  const filteredExtensions = extensions.filter((ext) => {
    // Filter by category
    const matchesCategory =
      selectedCategory === "All" || ext.category === selectedCategory || ext.tags.includes(selectedCategory)

    // Filter by search term
    const matchesSearch =
      searchTerm === "" ||
      ext.name.toLowerCase().includes(searchTerm.toLowerCase()) 

    return matchesCategory && matchesSearch
  })

  // Sort extensions based on selected sort option
  const sortedExtensions = [...filteredExtensions].sort((a, b) => {
    switch (sortOption.value) {
      case "time-asc":
        return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
      case "time-dsc":
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      case "name-asc":
        return a.name.localeCompare(b.name)
      case "name-dsc":
        return b.name.localeCompare(a.name)
      case "rating-asc":
        return a.rating - b.rating
      case "rating-dsc":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return (
    <section className="py-12">
      <div className="container-custom">
       

        {/* Extensions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedExtensions.length > 0 ? (
            sortedExtensions.map((extension) => <ExtensionCard key={extension.id} extension={extension} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No extensions found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Pagination - only show if there are extensions */}
        {sortedExtensions.length > 0 && (
          <div className="flex justify-center mt-12">
            <div className="flex gap-2">
              <Button variant="outline" className="bg-secondary text-white hover:bg-secondary/80 w-10 h-10 p-0">
                &lt;
              </Button>
              <Button className="bg-primary text-white hover:bg-primary/90 w-10 h-10 p-0">1</Button>
              <Button variant="outline" className="bg-secondary text-white hover:bg-secondary/80 w-10 h-10 p-0">
                2
              </Button>
              <Button variant="outline" className="bg-secondary text-white hover:bg-secondary/80 w-10 h-10 p-0">
                3
              </Button>
              <Button variant="outline" className="bg-secondary text-white hover:bg-secondary/80 w-10 h-10 p-0">
                ...
              </Button>
              <Button variant="outline" className="bg-secondary text-white hover:bg-secondary/80 w-10 h-10 p-0">
                10
              </Button>
              <Button variant="outline" className="bg-secondary text-white hover:bg-secondary/80 w-10 h-10 p-0">
                11
              </Button>
              <Button variant="outline" className="bg-secondary text-white hover:bg-secondary/80 w-10 h-10 p-0">
                &gt;
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

