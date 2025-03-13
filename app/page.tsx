"use client"

import { useState, useEffect } from "react"
import Hero from "@/components/hero"
import ExtensionCard from "@/components/extension-card"
import Newsletter from "@/components/newsletter"
import { extensions, platforms, pricingOptions } from "@/lib/data"
import { Button } from "@/components/ui/button"
import ExpandableFilter from "@/components/expandable-filter"
import CheckboxFilter from "@/components/checkbox-filter"
import { RefreshCw } from "lucide-react"

export default function Home() {
  // State for search term
  const [searchTerm, setSearchTerm] = useState("")

  // State for selected platforms
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])

  // State for selected pricing options
  const [selectedPricing, setSelectedPricing] = useState<string[]>([])

  // State for "Select All" platforms
  const [selectAllPlatforms, setSelectAllPlatforms] = useState(false)

  // Handle search from Hero component (only filter by name)
  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  // Handle platform checkbox changes
  const handlePlatformChange = (platform: string, checked: boolean) => {
    if (checked) {
      setSelectedPlatforms([...selectedPlatforms, platform])
    } else {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform))
    }
  }

  // Handle pricing checkbox changes
  const handlePricingChange = (pricing: string, checked: boolean) => {
    if (checked) {
      setSelectedPricing([...selectedPricing, pricing])
    } else {
      setSelectedPricing(selectedPricing.filter((p) => p !== pricing))
    }
  }

  // Handle "Select All" platforms checkbox
  const handleSelectAllPlatforms = (checked: boolean) => {
    setSelectAllPlatforms(checked)
    if (checked) {
      setSelectedPlatforms([...platforms])
    } else {
      setSelectedPlatforms([])
    }
  }

  // Update "Select All" state when individual platforms change
  useEffect(() => {
    if (selectedPlatforms.length === platforms.length) {
      setSelectAllPlatforms(true)
    } else {
      setSelectAllPlatforms(false)
    }
  }, [selectedPlatforms])

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("")
    setSelectedPlatforms([])
    setSelectedPricing([])
    setSelectAllPlatforms(false)
  }

  // Filter extensions based on search term, platforms, and pricing
  const filteredExtensions = extensions.filter((ext) => {
    // Filter by name (case insensitive)
    const matchesSearch = searchTerm === "" || ext.name.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by platforms (if any selected)
    const matchesPlatform =
      selectedPlatforms.length === 0 || ext.platforms.some((platform) => selectedPlatforms.includes(platform))

    // Filter by pricing (if any selected)
    const matchesPricing = selectedPricing.length === 0 || selectedPricing.includes(ext.pricing)

    return matchesSearch && matchesPlatform && matchesPricing
  })

  return (
    <>
      {/* Hero section with search functionality */}
      <Hero onSearch={handleSearch} />

      {/* Filters and Extensions Grid */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="md:col-span-1">
              {/* Platform Filter */}
              <ExpandableFilter title="Select Tag">
                {/* Select All option */}
                <CheckboxFilter
                  id="select-all-platforms"
                  label="Select All"
                  checked={selectAllPlatforms}
                  onChange={handleSelectAllPlatforms}
                />

                {/* Individual platform options */}
                {platforms.map((platform) => (
                  <CheckboxFilter
                    key={platform}
                    id={`platform-${platform}`}
                    label={platform}
                    checked={selectedPlatforms.includes(platform)}
                    onChange={(checked) => handlePlatformChange(platform, checked)}
                  />
                ))}
              </ExpandableFilter>

              {/* Pricing Filter */}
              <ExpandableFilter title="Filter">
                {pricingOptions.map((option) => (
                  <CheckboxFilter
                    key={option}
                    id={`pricing-${option}`}
                    label={option}
                    checked={selectedPricing.includes(option)}
                    onChange={(checked) => handlePricingChange(option, checked)}
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

            {/* Extensions Grid */}
            <div className="md:col-span-3">
              {/* Show message when no extensions match filters */}
              {filteredExtensions.length === 0 ? (
                <div className="text-center py-12 bg-secondary rounded-lg">
                  <p className="text-muted-foreground text-lg">No extensions found matching your criteria.</p>
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
                  {filteredExtensions.map((extension) => (
                    <ExtensionCard key={extension.id} extension={extension} />
                  ))}
                </div>
              )}

              {/* Pagination - only show if there are extensions */}
              {filteredExtensions.length > 0 && (
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

