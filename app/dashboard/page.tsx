import {
  Users,
  ShoppingCart,
  Star,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"

import { foods } from "../../lib/data" // Add this import


export default function DashboardPage() {

// Get top rated foods sorted by rating
const popularFoods = [...foods]
.sort((a, b) => b.rating - a.rating)
.slice(0, 5)

  return (
    <div className="container-custom">
      {/* Page title */}
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Users Card */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted-foreground text-sm">Total Users</p>
              <h3 className="text-2xl font-bold">24,532</h3>
            </div>
            <div className="bg-primary/20 p-2 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="flex items-center text-green-500">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">12% increase</span>
            <span className="text-xs text-muted-foreground ml-1">vs last month</span>
          </div>
        </div>

        {/* Total Food Card */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted-foreground text-sm">Total Recipes</p>
              <h3 className="text-2xl font-bold">{foods.length}</h3>
            </div>
            <div className="bg-purple-500/20 p-2 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-purple-500" />
            </div>
          </div>
          <div className="flex items-center text-green-500">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{Math.round(((foods.length - 9)/9 * 100))}% increase</span>
            <span className="text-xs text-muted-foreground ml-1">vs initial release</span>
          </div>
        </div>

        {/* Average Rating Card */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted-foreground text-sm">Average Rating</p>
              <h3 className="text-2xl font-bold">
                {(foods.reduce((sum, food) => sum + food.rating, 0) / foods.length).toFixed(1)}
              </h3>
            </div>
            <div className="bg-yellow-500/20 p-2 rounded-lg">
              <Star className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
          <div className="flex items-center text-green-500">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">0.4 increase</span>
            <span className="text-xs text-muted-foreground ml-1">vs last quarter</span>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-card rounded-lg p-6 border border-border">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-muted-foreground text-sm">Total Reviews</p>
            <h3 className="text-2xl font-bold">
              {foods.reduce((sum, food) => sum + food.reviews, 0)}
            </h3>
          </div>
          <div className="bg-green-500/20 p-2 rounded-lg">
            <TrendingUp className="h-6 w-6 text-green-500" />
          </div>
        </div>
        <div className="flex items-center text-green-500">
          <ArrowUpRight className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">22% increase</span>
          <span className="text-xs text-muted-foreground ml-1">vs last month</span>
        </div>
      </div>
      </div>

      {/* Charts and tables section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* User Growth Chart - left column, spans 2 columns on large screens */}
        <div className="bg-card rounded-lg p-6 border border-border lg:col-span-2">
          <h3 className="text-lg font-bold mb-4">User Growth</h3>

          {/* Mock chart - replace with actual chart component */}
          <div className="h-80 flex items-end gap-2 pt-6 pb-2">
            {/* Mock chart bars - these would be replaced by a real chart */}
            {[35, 45, 30, 60, 75, 85, 70, 90, 100, 80, 95, 110].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-primary/80 rounded-t-sm" style={{ height: `${height}%` }}></div>
                <span className="text-xs text-muted-foreground mt-2">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][index]}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              <span className="text-white font-medium">2024</span> - Monthly user growth
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-xs text-muted-foreground">New Users</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-xs text-muted-foreground">Active Users</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity - right column */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 pb-4 border-b border-border">
              <div className="bg-green-500/20 p-1.5 rounded-full">
                <Users className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium">New recipe added</p>
                <p className="text-xs text-muted-foreground">Butter Chicken was submitted</p>
                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-4 border-b border-border">
              <div className="bg-purple-500/20 p-1.5 rounded-full">
                <ShoppingCart className="h-4 w-4 text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Recipe updated</p>
                <p className="text-xs text-muted-foreground">Pad Thai ingredients modified</p>
                <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-4 border-b border-border">
              <div className="bg-yellow-500/20 p-1.5 rounded-full">
                <Star className="h-4 w-4 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm font-medium">New review</p>
                <p className="text-xs text-muted-foreground">Beef Pho received a 5-star review</p>
                <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
              </div>
            </div>
          </div>
          <button className="w-full mt-4 text-sm text-primary hover:underline">View all activity</button>
        </div>
      </div>

      {/* Bottom section - Popular Food and System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Popular Food - left column, spans 2 columns on large screens */}
        <div className="bg-card rounded-lg p-6 border border-border lg:col-span-2">
          <h3 className="text-lg font-bold mb-4">Popular Recipes</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Recipe</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Category</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Rating</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Reviews</th>
                </tr>
              </thead>
              <tbody>
                {popularFoods.map((food) => (
                  <tr key={food.id} className="border-b border-border">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center">
                          <span className="text-xs font-bold">
                            {food.name
                              .split(' ')
                              .map(word => word[0])
                              .join('')
                              .toUpperCase()
                              .slice(0, 2)}
                          </span>
                        </div>
                        <span className="font-medium">{food.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-muted-foreground">{food.category}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span>{food.rating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-muted-foreground">{food.reviews.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Status - right column */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-lg font-bold mb-4">System Status</h3>

          <div className="space-y-4">
            {/* Status items */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="font-medium">Website</span>
              </div>
              <span className="text-sm text-green-500">Operational</span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="font-medium">API</span>
              </div>
              <span className="text-sm text-green-500">Operational</span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="font-medium">Database</span>
              </div>
              <span className="text-sm text-green-500">Operational</span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">Search Service</span>
              </div>
              <span className="text-sm text-yellow-500">Degraded</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="font-medium">Authentication</span>
              </div>
              <span className="text-sm text-green-500">Operational</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last updated:</span>
              <span className="text-sm">Today, 10:45 AM</span>
            </div>
            <button className="w-full mt-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm font-medium">
              View detailed status
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

