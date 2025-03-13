import Newsletter from "@/components/newsletter"

export default function BlogPage() {
  return (
    <div className="container-custom py-16">
      {/* Page title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Blog</h1>

      {/* Placeholder content - customize as needed */}
      <div className="bg-secondary rounded-lg p-12 text-center">
        <p className="text-muted-foreground">
          This is a placeholder for the Blog page. Customize this content as needed.
        </p>
      </div>

      {/* Newsletter section */}
      <Newsletter />
    </div>
  )
}

