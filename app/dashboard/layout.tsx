import type { ReactNode } from "react"
import DashboardHeader from "@/components/dashboard-header"

// Dashboard layout - includes only dashboard header but no main site header or footer
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* Dashboard-specific header only */}
      <DashboardHeader />

      {/* Main content area */}
      <main className="flex-grow py-8">{children}</main>

      {/* No footer in dashboard layout */}
    </div>
  )
}

