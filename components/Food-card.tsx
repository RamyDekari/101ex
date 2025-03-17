import Image from "next/image"
import Link from "next/link"
import type { Food } from "@/lib/data"
import { Star } from "lucide-react"

interface FoodCardProps {
  Food: Food
}

export default function FoodCard({ Food }: FoodCardProps) {
  // Function to get timeCostOptions badge color
  const gettimeCostOptionsBadgeColor = (timeCostOptions: string) => {
    switch (timeCostOptions) {
      case "Free":
        return "bg-green-600"
      case "Premium":
        return "bg-purple-600"
      case "Free Trial":
        return "bg-blue-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border h-full flex flex-col">
      {/* Card Image - displays the Food image with tags overlay */}
      <div className="relative h-48 w-full">
        <Image src={Food.image || "/placeholder.svg"} alt={Food.name} fill className="object-cover" />

        {/* Tags Overlay - shows up to 3 tags */}
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {Food.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="bg-black/70 text-white text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>

        {/* timeCostOptions Badge */}
        <div className="absolute top-2 right-2">
          <span className={`${gettimeCostOptionsBadgeColor(Food.timeCost)} text-white text-xs px-2 py-1 rounded`}>
            {Food.timeCost}
          </span>
        </div>
      </div>

      {/* Card Content - Food name, description and regions */}
      <div className="p-4 flex-grow flex flex-col">
        <Link href={`/Food/${Food.id}`}>
          <h3 className="text-primary text-lg font-semibold mb-2 flex items-center gap-2">
            <span className="text-primary">•</span> {Food.name}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">{Food.description}</p>

        <div className="flex justify-between items-end mt-auto">
          {/* Rating - shows the Food rating */}
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
            <span className="text-sm font-medium">{Food.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground ml-1">({Food.reviews})</span>
          </div>

          {/* regions - shows which regions the Food is available on */}
          <div className="flex flex-wrap gap-1 justify-end">
            {Food.regions.map((platform, index) => (
              <span key={index} className="text-xs text-muted-foreground">
                # {platform}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

