import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Extensions 101 - Find the Best Browser Extensions",
  description: "Browse, discover and find the best browser extensions to optimize your workflow.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if the current path is in the dashboard section
  const isDashboard = false // This will be replaced by server-side logic in a real app

  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white min-h-screen flex flex-col`}>
        {/* Only show the main header if not in dashboard */}
        {!isDashboard && <Header />}
        <main className="flex-grow">{children}</main>
        {/* Only show the footer if not in dashboard */}
        {!isDashboard && <Footer />}
      </body>
    </html>
  )
}

