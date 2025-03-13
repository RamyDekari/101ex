export interface Extension {
  id: string
  name: string
  description: string
  longDescription?: string // More detailed description
  image: string
  tags: string[]
  platforms: string[]
  category: string
  rating: number // Rating out of 5
  reviews: number // Number of reviews
  releaseDate: string // ISO date string for sorting
  pricing: "Free" | "Premium" | "Free Trial" // Pricing model
}

// Mock extension data - replace with your own data or API calls
export const extensions: Extension[] = [
  {
    id: "1",
    name: "SumBuddy",
    description: "AI Summary Assistant for web browsing and content analysis.",
    longDescription:
      "SumBuddy is an intelligent AI-powered browser extension that automatically summarizes web content as you browse. It helps you save time by extracting key information from articles, blog posts, and documents, allowing you to quickly grasp the main points without reading the entire content.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["AI", "Tools"],
    platforms: ["Chrome"],
    category: "Productivity",
    rating: 4.7,
    reviews: 128,
    releaseDate: "2023-11-15",
    pricing: "Free",
  },
  {
    id: "2",
    name: "Twillot",
    description: "Effortlessly Export Your Twitter Data with One Click",
    longDescription:
      "Twillot is a powerful tool that allows you to export your Twitter data with just one click. It preserves your tweets, media, followers, and engagement metrics in various formats including CSV, JSON, and PDF. Perfect for content creators, marketers, and anyone who wants to analyze or archive their Twitter presence.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["AI", "Tools"],
    platforms: ["Chrome"],
    category: "Tools",
    rating: 4.2,
    reviews: 86,
    releaseDate: "2023-08-22",
    pricing: "Premium",
  },
  {
    id: "3",
    name: "DesignPicker Pro",
    description: "Smart web design color analysis and typography recognition tool, helping designers and developers.",
    longDescription:
      "DesignPicker Pro is a comprehensive design tool that analyzes websites and identifies colors, fonts, spacing, and other design elements. It helps designers and developers recreate inspiring designs by providing accurate color codes, font information, and CSS properties. The tool also suggests complementary colors and font pairings to enhance your design workflow.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Workflow & Planning", "AI", "Developer Tools", "Tools"],
    platforms: ["Chrome", "Edge"],
    category: "Design",
    rating: 4.9,
    reviews: 215,
    releaseDate: "2024-01-05",
    pricing: "Free Trial",
  },
  {
    id: "4",
    name: "Obsidian Web Clipper",
    description: "Save and highlight web pages in a private and durable format that you can access anytime.",
    longDescription:
      "Obsidian Web Clipper seamlessly integrates with Obsidian to save web content directly to your knowledge base. It preserves formatting, images, and links while allowing you to highlight important sections and add your own notes. The extension works offline and ensures your clipped content is stored privately in your Obsidian vault.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Workflow & Planning"],
    platforms: ["Chrome", "Obsidian"],
    category: "Productivity",
    rating: 4.5,
    reviews: 173,
    releaseDate: "2023-06-10",
    pricing: "Free",
  },
  {
    id: "5",
    name: "Monica: ChatGPT AI Assistant",
    description: "Your AI assistant with GPT-4, Claude 3.5 & more. Chat, search, write, translate, and analyze.",
    longDescription:
      "Monica is your personal AI assistant powered by multiple language models including GPT-4 and Claude 3.5. It helps you write emails, summarize documents, translate languages, analyze data, and answer questions. The extension integrates with your browser to provide contextual assistance as you work, making it an indispensable productivity tool.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["AI", "Tools"],
    platforms: ["Chrome"],
    category: "AI",
    rating: 4.8,
    reviews: 342,
    releaseDate: "2024-02-28",
    pricing: "Premium",
  },
  {
    id: "6",
    name: "Redplus",
    description: "Search Reddit posts using product info and keywords, and marketing with AI tools.",
    longDescription:
      "Redplus is a specialized marketing tool that helps you find relevant Reddit discussions about products, brands, and topics. It uses AI to analyze sentiment, identify trends, and extract valuable insights from Reddit communities. The extension is perfect for marketers, researchers, and product teams who want to understand what people are saying about their products or industry.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Workflow & Planning", "AI"],
    platforms: ["Chrome"],
    category: "Marketing",
    rating: 4.3,
    reviews: 97,
    releaseDate: "2023-09-14",
    pricing: "Free Trial",
  },
  {
    id: "7",
    name: "VSCode Enhancer",
    description: "Supercharge your VSCode with productivity features and AI-powered code suggestions.",
    longDescription:
      "VSCode Enhancer adds powerful features to Visual Studio Code that help developers write better code faster. It includes AI-powered code completion, advanced syntax highlighting, custom snippets, and integrated documentation. The extension is designed to work with all major programming languages and frameworks.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Developer Tools", "AI"],
    platforms: ["VSCode"],
    category: "Developer Tools",
    rating: 4.6,
    reviews: 205,
    releaseDate: "2023-10-18",
    pricing: "Free",
  },
  {
    id: "8",
    name: "Firefox Privacy Shield",
    description: "Comprehensive privacy protection for Firefox with ad blocking and tracker prevention.",
    longDescription:
      "Firefox Privacy Shield is a comprehensive privacy solution that blocks ads, prevents tracking, and enhances your browsing security. It includes features like cookie management, fingerprint protection, and HTTPS enforcement. The extension is lightweight and doesn't slow down your browsing experience.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Privacy", "Security"],
    platforms: ["Firefox"],
    category: "Privacy",
    rating: 4.7,
    reviews: 312,
    releaseDate: "2023-07-22",
    pricing: "Free",
  },
  {
    id: "9",
    name: "Figma Color Manager",
    description: "Advanced color management and palette generation for Figma designers.",
    longDescription:
      "Figma Color Manager helps designers create, organize, and apply color palettes in Figma. It includes features like color scheme generation, accessibility checking, and automatic application of colors across designs. The extension integrates seamlessly with Figma's interface and workflow.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Design", "Tools"],
    platforms: ["Figma"],
    category: "Design",
    rating: 4.4,
    reviews: 178,
    releaseDate: "2023-09-05",
    pricing: "Premium",
  },
]

// Available categories for filtering
export const categories = [
  "All",
  "AI",
  "Communication",
  "Developer Tools",
  "Education",
  "Workflow & Planning",
  "Tools",
  "Art & Design",
  "Entertainment",
  "Marketing",
  "Design",
  "Productivity",
  "Privacy",
]

// Available platforms for filtering
export const platforms = ["Chrome", "Edge", "Firefox", "Safari", "Obsidian", "VSCode", "Figma", "Raycast"]

// Available pricing options
export const pricingOptions = ["Free", "Premium", "Free Trial"]

