import { extensions } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star } from "lucide-react"
import { notFound } from "next/navigation"

interface ExtensionPageProps {
  params: {
    id: string
  }
}

export default function ExtensionPage({ params }: ExtensionPageProps) {
  const extension = extensions.find((ext) => ext.id === params.id)

  if (!extension) {
    notFound()
  }

  // Format the release date
  const releaseDate = new Date(extension.releaseDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

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
    <div className="container-custom py-12">
      <Link href="/" className="inline-flex items-center text-primary mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to extensions
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Extension Image */}
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image src={extension.image || "/placeholder.svg"} alt={extension.name} fill className="object-cover" />

          {/* Pricing Badge */}
          <div className="absolute top-4 right-4">
            <span
              className={`${getPricingBadgeColor(extension.pricing)} text-white px-3 py-1 rounded-full text-sm font-medium`}
            >
              {extension.pricing}
            </span>
          </div>
        </div>

        {/* Extension Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{extension.name}</h1>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(extension.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                />
              ))}
            </div>
            <span className="ml-2 text-lg font-medium">{extension.rating.toFixed(1)}</span>
            <span className="ml-1 text-muted-foreground">({extension.reviews} reviews)</span>
          </div>

          {/* Release Date */}
          <p className="text-muted-foreground mb-4">Released: {releaseDate}</p>

          {/* Long Description */}
          <p className="text-muted-foreground mb-6">{extension.longDescription || extension.description}</p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Category</h3>
            <div className="flex gap-2">
              <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm">{extension.category}</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {extension.tags.map((tag, index) => (
                <span key={index} className="bg-secondary text-white px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Available on</h3>
            <div className="flex flex-wrap gap-2">
              {extension.platforms.map((platform, index) => (
                <span key={index} className="bg-secondary text-white px-3 py-1 rounded-full text-sm">
                  {platform}
                </span>
              ))}
            </div>
          </div>

          <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-lg text-lg w-full">
            Install Extension
          </Button>
        </div>
      </div>
    </div>
  )
}

