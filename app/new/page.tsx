"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Rocket, Globe, Database } from "lucide-react"

export default function NewSite() {
  const router = useRouter()
  const [siteName, setSiteName] = useState("")
  const [customDomain, setCustomDomain] = useState("")
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [dbName, setDbName] = useState("")
  const [dbUser, setDbUser] = useState("")
  const [isDeploying, setIsDeploying] = useState(false)

  const handleDeploy = async () => {
    if (!siteName.trim()) return

    setIsDeploying(true)

    // Simulate deployment process
    setTimeout(() => {
      router.push(`/deploying?site=${encodeURIComponent(siteName)}`)
    }, 1000)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <div className="wave-animation inline-block mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
            <Rocket className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Deploy New WordPress Site</h1>
        <p className="text-slate-600">Launch your WordPress site in seconds with zero configuration</p>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-slate-900">Site Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="siteName" className="text-sm font-medium text-slate-700">
              Site Name *
            </Label>
            <Input
              id="siteName"
              placeholder="my-awesome-site"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            />
            <p className="text-xs text-slate-500">
              Your site will be available at: <span className="font-mono">{siteName || "your-site"}.diso-wp.com</span>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customDomain" className="text-sm font-medium text-slate-700">
              Custom Domain (Optional)
            </Label>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-slate-400" />
              <Input
                id="customDomain"
                placeholder="example.com"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <p className="text-xs text-slate-500">Connect your own domain after deployment</p>
          </div>

          <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto text-slate-600 hover:text-slate-900">
                <span className="flex items-center space-x-2">
                  <Database className="w-4 h-4" />
                  <span>Advanced Options</span>
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mt-4 pt-4 border-t border-slate-200">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dbName" className="text-sm font-medium text-slate-700">
                    Database Name
                  </Label>
                  <Input
                    id="dbName"
                    placeholder="wp_database"
                    value={dbName}
                    onChange={(e) => setDbName(e.target.value)}
                    className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dbUser" className="text-sm font-medium text-slate-700">
                    Database User
                  </Label>
                  <Input
                    id="dbUser"
                    placeholder="wp_user"
                    value={dbUser}
                    onChange={(e) => setDbUser(e.target.value)}
                    className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <p className="text-xs text-slate-500">Leave empty to use auto-generated values</p>
            </CollapsibleContent>
          </Collapsible>

          <div className="pt-4 border-t border-slate-200">
            <Button
              onClick={handleDeploy}
              disabled={!siteName.trim() || isDeploying}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3"
              size="lg"
            >
              {isDeploying ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Preparing Deployment...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Rocket className="w-5 h-5" />
                  <span>Deploy WordPress Site</span>
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
