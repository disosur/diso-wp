"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus, Settings, Home } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  // Don't show navigation on landing page or login page
  if (pathname === "/" || pathname === "/login") {
    return null
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-xl font-semibold text-slate-900">diso-wp</span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/dashboard"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  pathname === "/dashboard"
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/settings"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  pathname === "/settings"
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
            </div>
          </div>

          <Button asChild className="bg-blue-700 hover:bg-blue-800 text-white">
            <Link href="/new" className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>New Site</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
