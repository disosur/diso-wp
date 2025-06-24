"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Globe, Settings, Play, Square, Trash2, ExternalLink } from "lucide-react"

// Mock data - in real app this would come from API
const mockSites = [
  {
    id: "1",
    name: "my-blog",
    status: "running",
    url: "https://my-blog.diso-wp.com",
    adminUrl: "https://my-blog.diso-wp.com/wp-admin",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "client-portfolio",
    status: "stopped",
    url: "https://client-portfolio.diso-wp.com",
    adminUrl: "https://client-portfolio.diso-wp.com/wp-admin",
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    name: "test-site",
    status: "failed",
    url: "https://test-site.diso-wp.com",
    adminUrl: "https://test-site.diso-wp.com/wp-admin",
    createdAt: "2024-01-08",
  },
]

export default function Dashboard() {
  const [sites] = useState(mockSites)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-100 text-green-800"
      case "stopped":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const EmptyState = () => (
    <div className="text-center py-16 wave-pattern">
      <div className="wave-animation inline-block mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto">
          <Globe className="w-12 h-12 text-white" />
        </div>
      </div>
      <h3 className="text-2xl font-semibold text-slate-900 mb-4">Welcome to diso-wp</h3>
      <p className="text-slate-600 mb-8 max-w-md mx-auto">
        Deploy your first WordPress site in seconds. No server setup, no complexity—just pure simplicity.
      </p>
      <Button asChild size="lg" className="bg-blue-700 hover:bg-blue-800 text-white">
        <Link href="/new" className="flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Deploy Your First Site</span>
        </Link>
      </Button>
    </div>
  )

  if (sites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EmptyState />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Your WordPress Sites</h1>
        <p className="text-slate-600">Manage and monitor your deployed WordPress websites</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sites.map((site) => (
          <Card
            key={site.id}
            className="group hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-blue-200"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {site.name}
                  </CardTitle>
                  <p className="text-sm text-slate-500 mt-1">Created {new Date(site.createdAt).toLocaleDateString()}</p>
                </div>
                <Badge className={getStatusColor(site.status)}>{site.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Globe className="w-4 h-4" />
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors truncate"
                >
                  {site.url.replace("https://", "")}
                </a>
                <ExternalLink className="w-3 h-3" />
              </div>

              <div className="flex items-center space-x-2">
                <Button asChild variant="outline" size="sm" className="flex-1 bg-white hover:bg-slate-50">
                  <Link href={`/site/${site.id}`}>
                    <Settings className="w-4 h-4 mr-2" />
                    Manage
                  </Link>
                </Button>

                {site.status === "running" && (
                  <Button variant="outline" size="sm" className="bg-white hover:bg-slate-50">
                    <Square className="w-4 h-4" />
                  </Button>
                )}

                {site.status === "stopped" && (
                  <Button variant="outline" size="sm" className="bg-white hover:bg-slate-50">
                    <Play className="w-4 h-4" />
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
