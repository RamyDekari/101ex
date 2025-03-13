import Image from "next/image"
import Link from "next/link"
import type { Extension } from "@/lib/data"
import { Star } from "lucide-react"

interface ExtensionCardProps {
  extension: Extension
}

export default function ExtensionCard({ extension }: ExtensionCardProps) {
  // Function to get pricing badge color
  const getPricingBadgeColor = (pricing: string) => {
    switch (pricing) {
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
      {/* Card Image - displays the extension image with tags overlay */}
      <div className="relative h-48 w-full">
        <Image src={extension.image || "/placeholder.svg"} alt={extension.name} fill className="object-cover" />

        {/* Tags Overlay - shows up to 3 tags */}
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {extension.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="bg-black/70 text-white text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>

        {/* Pricing Badge */}
        <div className="absolute top-2 right-2">
          <span className={`${getPricingBadgeColor(extension.pricing)} text-white text-xs px-2 py-1 rounded`}>
            {extension.pricing}
          </span>
        </div>
      </div>

      {/* Card Content - extension name, description and platforms */}
      <div className="p-4 flex-grow flex flex-col">
        <Link href={`/extension/${extension.id}`}>
          <h3 className="text-primary text-lg font-semibold mb-2 flex items-center gap-2">
            <span className="text-primary">•</span> {extension.name}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">{extension.description}</p>

        <div className="flex justify-between items-end mt-auto">
          {/* Rating - shows the extension rating */}
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
            <span className="text-sm font-medium">{extension.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground ml-1">({extension.reviews})</span>
          </div>

          {/* Platforms - shows which platforms the extension is available on */}
          <div className="flex flex-wrap gap-1 justify-end">
            {extension.platforms.map((platform, index) => (
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

