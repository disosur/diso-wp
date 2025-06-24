"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Settings, Play, Square, RotateCcw, Trash2, ExternalLink, Copy, Terminal } from "lucide-react"

// Mock data
const siteData = {
  id: "1",
  name: "my-blog",
  status: "running",
  url: "https://my-blog.diso-wp.com",
  adminUrl: "https://my-blog.diso-wp.com/wp-admin",
  createdAt: "2024-01-15",
  lastDeployed: "2024-01-15T10:30:00Z",
  credentials: {
    username: "admin",
    password: "wp_admin_2024",
  },
}

const mockLogs = [
  "[2024-01-15 10:30:15] Site started successfully",
  "[2024-01-15 10:30:10] SSL certificate renewed",
  "[2024-01-15 10:25:33] Database backup completed",
  "[2024-01-15 10:20:45] WordPress core updated to 6.4.2",
  "[2024-01-15 10:15:22] Plugin updates available",
  "[2024-01-15 10:10:18] Site health check passed",
  "[2024-01-15 10:05:44] Automated backup initiated",
  "[2024-01-15 10:00:12] Site monitoring active",
]

export default function SiteOverview({ params }: { params: { id: string } }) {
  const [site] = useState(siteData)
  const [logs] = useState(mockLogs)

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{site.name}</h1>
            <div className="flex items-center space-x-4 text-sm text-slate-600">
              <span>Created {new Date(site.createdAt).toLocaleDateString()}</span>
              <span>•</span>
              <span>Last deployed {new Date(site.lastDeployed).toLocaleString()}</span>
            </div>
          </div>
          <Badge className={getStatusColor(site.status)}>{site.status}</Badge>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-3">
          <Button asChild variant="outline" className="bg-white">
            <a href={site.url} target="_blank" rel="noopener noreferrer">
              <Globe className="w-4 h-4 mr-2" />
              Visit Site
              <ExternalLink className="w-3 h-3 ml-2" />
            </a>
          </Button>
          <Button asChild variant="outline" className="bg-white">
            <a href={site.adminUrl} target="_blank" rel="noopener noreferrer">
              <Settings className="w-4 h-4 mr-2" />
              WP Admin
              <ExternalLink className="w-3 h-3 ml-2" />
            </a>
          </Button>
          <Button variant="outline" className="bg-white">
            <RotateCcw className="w-4 h-4 mr-2" />
            Redeploy
          </Button>
          {site.status === "running" ? (
            <Button variant="outline" className="bg-white">
              <Square className="w-4 h-4 mr-2" />
              Stop
            </Button>
          ) : (
            <Button variant="outline" className="bg-white">
              <Play className="w-4 h-4 mr-2" />
              Start
            </Button>
          )}
          <Button variant="outline" className="bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="environment">Environment</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Site Info */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900">Site Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Site URL</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-mono">{site.url}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(site.url)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Admin URL</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-mono">{site.adminUrl}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(site.adminUrl)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Login Credentials */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900">Login Credentials</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Username</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-mono">{site.credentials.username}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(site.credentials.username)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Password</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-mono">••••••••••••</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(site.credentials.password)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900 flex items-center space-x-2">
                <Terminal className="w-5 h-5" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900 rounded-lg p-4 h-96 overflow-y-auto">
                <div className="font-mono text-sm space-y-1">
                  {logs.map((log, index) => (
                    <div key={index} className="text-green-400">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environment" className="space-y-6">
          <Card className="border-slate-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-slate-900">Environment Variables</CardTitle>
                <Button asChild variant="outline" className="bg-white">
                  <Link href={`/site/${params.id}/env`}>
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Variables
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-sm font-mono text-slate-600">WP_DEBUG</span>
                  <span className="text-sm font-mono">false</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-sm font-mono text-slate-600">WP_MEMORY_LIMIT</span>
                  <span className="text-sm font-mono">256M</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-sm font-mono text-slate-600">PHP_VERSION</span>
                  <span className="text-sm font-mono">8.2</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">Site Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">Advanced site configuration options will be available here.</p>
              <Button variant="outline" className="bg-white" disabled>
                Configure Backups
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
