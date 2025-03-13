import Newsletter from "@/components/newsletter"

export default function TagPage() {
  return (
    <div className="container-custom py-16">
      {/* Page title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Tags</h1>

      {/* Placeholder content - customize as needed */}
      <div className="bg-secondary rounded-lg p-12 text-center">
        <p className="text-muted-foreground">
          This is a placeholder for the Tag page. Customize this content as needed.
        </p>
      </div>

      {/* Newsletter section */}
      <Newsletter />
    </div>
  )
}

