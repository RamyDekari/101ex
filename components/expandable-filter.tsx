"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

// Props for the ExpandableFilter component
interface ExpandableFilterProps {
  title: string
  children: React.ReactNode
}

export default function ExpandableFilter({ title, children }: ExpandableFilterProps) {
  // State to track if the filter is expanded
  const [isExpanded, setIsExpanded] = useState(false)

  // Toggle the expanded state
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="bg-secondary rounded-lg overflow-hidden mb-3">
      {/* Filter header with toggle button */}
      <Button
        variant="ghost"
        className="w-full flex justify-between items-center p-3 text-white hover:bg-secondary/80"
        onClick={toggleExpanded}
      >
        <span className="font-medium">{title}</span>
        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </Button>

      {/* Filter content - only shown when expanded */}
      {isExpanded && <div className="p-3 border-t border-border">{children}</div>}
    </div>
  )
}

