import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Newsletter() {
  return (
    <section className="py-16 bg-secondary">
      <div className="container-custom text-center">
        <div className="max-w-2xl mx-auto">
          {/* Section title */}
          <span className="text-primary uppercase font-semibold">NEWSLETTER</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Join the Community</h2>
          <p className="text-muted-foreground mb-8">Subscribe to our newsletter for the latest news and updates</p>

          {/* Email subscription form - implement form submission as needed */}
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow bg-black border border-border rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

