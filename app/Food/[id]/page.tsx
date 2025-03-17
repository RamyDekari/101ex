import { Food, foods } from "@/lib/data"
import { getReviewsByFoodId } from "@/lib/reviews"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star } from "lucide-react"
import { notFound } from "next/navigation"

interface FoodPageProps {
  params: {
    id: string
  }
}

export default function FoodPage({ params }: FoodPageProps) {
  const Food = foods.find((food) => food.id === params.id)

  if (!Food) {
    notFound()
  }

  // Get reviews for this Food
  const FoodReviews = getReviewsByFoodId(params.id)

  // Format the release date
  const releaseDate = new Date(Food.releaseDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

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

  // Function to format review date
  const formatReviewDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long", 
      day: "numeric",
    })
  }

  return (
    <div className="container-custom py-12">
      <Link href="/" className="inline-flex items-center text-primary mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Food
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Food Image */}
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image src={Food.image || "/placeholder.svg"} alt={Food.name} fill className="object-cover" />

          {/* timeCostOptions Badge */}
          <div className="absolute top-4 right-4">
            <span
              className={`${gettimeCostOptionsBadgeColor(Food.timeCost)} text-white px-3 py-1 rounded-full text-sm font-medium`}
            >
              {Food.timeCost}
            </span>
          </div>
        </div>

        {/* Food Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{Food.name}</h1>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(Food.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                />
              ))}
            </div>
            <span className="ml-2 text-lg font-medium">{Food.rating.toFixed(1)}</span>
            <span className="ml-1 text-muted-foreground">({Food.reviews} reviews)</span>
          </div>

          {/* Release Date */}
          <p className="text-muted-foreground mb-4">Released: {releaseDate}</p>

          {/* Long Description */}
          <p className="text-muted-foreground mb-6">{Food.recipe || Food.description}</p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Category</h3>
            <div className="flex gap-2">
              <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm">{Food.category}</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {Food.tags.map((tag, index) => (
                <span key={index} className="bg-secondary text-white px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Available on</h3>
            <div className="flex flex-wrap gap-2">
              {Food.regions.map((platform, index) => (
                <span key={index} className="bg-secondary text-white px-3 py-1 rounded-full text-sm">
                  {platform}
                </span>
              ))}
            </div>
          </div>

          <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-lg text-lg w-full">
            Install Food
          </Button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">User Reviews</h2>
        
        {FoodReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FoodReviews.map((review) => (
              <div key={review.id} className="bg-secondary/10 rounded-lg p-6">
                <div className="flex items-start mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={review.userImage}
                      alt={review.userName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{review.userName}</h3>
                    <p className="text-sm text-muted-foreground">{formatReviewDate(review.date)}</p>
                  </div>
                  <div className="flex ml-auto">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground">{review.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No reviews yet for this Food.</p>
          </div>
        )}
        
        <div className="mt-8 text-center">
          <Button variant="outline" className="px-8 py-2">
            Write a Review
          </Button>
        </div>
      </div>
    </div>
  )
}