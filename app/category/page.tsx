"use client"

import { useState } from "react"
import { Food, categories, foods  } from "@/lib/data"
import Newsletter from "@/components/newsletter"
import { Button } from "@/components/ui/button"
import { ChevronDown, Check, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import FoodCard from "@/components/Food-card"

// Sort options for the dropdown
const sortOptions = [
  { label: "Sort by Time (dsc)", value: "time-dsc" },
  { label: "Sort by Time (asc)", value: "time-asc" },
  { label: "Sort by Name (dsc)", value: "name-dsc" },
  { label: "Sort by Name (asc)", value: "name-asc" },
  { label: "Sort by Rating (dsc)", value: "rating-dsc" },
  { label: "Sort by Rating (asc)", value: "rating-asc" },
]

export default function CategoryPage() {
  // State for category and sort selection
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortOption, setSortOption] = useState(sortOptions[0])
  const [searchTerm, setSearchTerm] = useState("")

  // Filter Food based on selected category and search term
  const filteredFood = foods.filter((food) => {
    // Filter by category
    const matchesCategory =
      selectedCategory === "All" || food.category === selectedCategory || food.tags.includes(selectedCategory)

    // Filter by search term (if any)
    const matchesSearch =
      searchTerm === "" ||
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.description.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesCategory && matchesSearch
  })

  // Sort Food based on selected sort option
  const sortedFood = [...filteredFood].sort((a, b) => {
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
    <>
      {/* Category section with title */}
      <section className="py-16">
        <div className="container-custom text-center">
          {/* Section title */}
          <span className="text-primary uppercase font-semibold">CATEGORY</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-8">Explore by categories</h2>

          {/* Category filters and sort dropdown */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {/* Mobile Category Dropdown */}
            <div className="md:hidden w-full mb-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-secondary text-white hover:bg-secondary/80"
                  >
                    {selectedCategory} <Filter className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-secondary border-border w-[200px]">
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      className={`${selectedCategory === category ? "text-primary" : "text-white"}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {selectedCategory === category && <Check className="mr-2 h-4 w-4" />}
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Desktop Category Buttons */}
            <div className="hidden md:flex flex-wrap justify-center gap-2">
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
            </div>

            {/* Sort dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full px-4 py-2 bg-secondary text-white hover:bg-secondary/80 md:ml-2"
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

      {/* Food Grid */}
      <section className="py-12">
        <div className="container-custom">
          {/* Food Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedFood.length > 0 ? (
              sortedFood.map((Food) => <FoodCard key={Food.id} Food={Food} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">No Food found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {sortedFood.length > 0 && (
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

      {/* Newsletter signup section */}
      <Newsletter />
    </>
  )
}

