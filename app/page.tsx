"use client"

import { useState, useEffect } from "react"
import Hero from "@/components/hero"
import Newsletter from "@/components/newsletter"
import { Food, regions, timeCostOptions, foods  } from "@/lib/data"
import { Button } from "@/components/ui/button"
import ExpandableFilter from "@/components/expandable-filter"
import CheckboxFilter from "@/components/checkbox-filter"
import { RefreshCw } from "lucide-react"
import FoodCard from "@/components/Food-card"

export default function Home() {
  // State for search term
  const [searchTerm, setSearchTerm] = useState("")

  // State for selected regions
  const [selectedregions, setSelectedregions] = useState<string[]>([])

  // State for selected timeCostOptions options
  const [selectedtimeCostOptions, setSelectedtimeCostOptions] = useState<string[]>([])

  // State for "Select All" regions
  const [selectAllregions, setSelectAllregions] = useState(false)

  // Handle search from Hero component (only filter by name)
  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  // Handle platform checkbox changes
  const handlePlatformChange = (platform: string, checked: boolean) => {
    if (checked) {
      setSelectedregions([...selectedregions, platform])
    } else {
      setSelectedregions(selectedregions.filter((p) => p !== platform))
    }
  }

  // Handle timeCostOptions checkbox changes
  const handletimeCostOptionsChange = (timeCostOptions: string, checked: boolean) => {
    if (checked) {
      setSelectedtimeCostOptions([...selectedtimeCostOptions, timeCostOptions])
    } else {
      setSelectedtimeCostOptions(selectedtimeCostOptions.filter((p) => p !== timeCostOptions))
    }
  }

  // Handle "Select All" regions checkbox
  const handleSelectAllregions = (checked: boolean) => {
    setSelectAllregions(checked)
    if (checked) {
      setSelectedregions([...regions])
    } else {
      setSelectedregions([])
    }
  }

  // Update "Select All" state when individual regions change
  useEffect(() => {
    if (selectedregions.length === regions.length) {
      setSelectAllregions(true)
    } else {
      setSelectAllregions(false)
    }
  }, [selectedregions])

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("")
    setSelectedregions([])
    setSelectedtimeCostOptions([])
    setSelectAllregions(false)
  }

  // Filter Food based on search term, regions, and timeCostOptions
  const filteredFood = foods.filter((food) => {
    // Filter by name (case insensitive)
    const matchesSearch = searchTerm === "" || food.name.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by regions (if any selected)
    const matchesPlatform =
      selectedregions.length === 0 || food.regions.some((platform) => selectedregions.includes(platform))

    // Filter by timeCostOptions (if any selected)
    const matchestimeCostOptions = selectedtimeCostOptions.length === 0 || selectedtimeCostOptions.includes(food.timeCost)

    return matchesSearch && matchesPlatform && matchestimeCostOptions
  })

  return (
    <>
      {/* Hero section with search functionality */}
      <Hero onSearch={handleSearch} />

      {/* Filters and Food Grid */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="md:col-span-1">
              {/* Platform Filter */}
              <ExpandableFilter title="Select Tag">
                {/* Select All option */}
                <CheckboxFilter
                  id="select-all-regions"
                  label="Select All"
                  checked={selectAllregions}
                  onChange={handleSelectAllregions}
                />

                {/* Individual platform options */}
                {regions.map((platform) => (
                  <CheckboxFilter
                    key={platform}
                    id={`platform-${platform}`}
                    label={platform}
                    checked={selectedregions.includes(platform)}
                    onChange={(checked) => handlePlatformChange(platform, checked)}
                  />
                ))}
              </ExpandableFilter>

              {/* timeCostOptions Filter */}
              <ExpandableFilter title="Filter">
                {timeCostOptions.map((option) => (
                  <CheckboxFilter
                    key={option}
                    id={`timeCostOptions-${option}`}
                    label={option}
                    checked={selectedtimeCostOptions.includes(option)}
                    onChange={(checked) => handletimeCostOptionsChange(option, checked)}
                  />
                ))}
              </ExpandableFilter>

              {/* Reset Button */}
              <Button
                variant="outline"
                className="w-full bg-secondary text-white hover:bg-secondary/80 mt-3"
                onClick={resetFilters}
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Reset Filters
              </Button>
            </div>

            {/* Food Grid */}
            <div className="md:col-span-3">
              {/* Show message when no Food match filters */}
              {filteredFood.length === 0 ? (
                <div className="text-center py-12 bg-secondary rounded-lg">
                  <p className="text-muted-foreground text-lg">No Food found matching your criteria.</p>
                  <Button
                    variant="outline"
                    className="mt-4 bg-primary text-white hover:bg-primary/90"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredFood.map((Food) => (
                    <FoodCard key={Food.id} Food={Food} />
                  ))}
                </div>
              )}

              {/* Pagination - only show if there are Food */}
              {filteredFood.length > 0 && (
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
          </div>
        </div>
      </section>

      {/* Newsletter signup section */}
      <Newsletter />
    </>
  )
}

