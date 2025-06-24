"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Globe, Terminal, Database, Copy, CheckCircle, ExternalLink } from "lucide-react"

export default function Settings() {
  const [cloudflareToken, setCloudflareToken] = useState("")
  const [isConnected, setIsConnected] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const cliCommands = [
    {
      title: "Install diso-wp CLI",
      command: "npm install -g @diso/wp-cli",
    },
    {
      title: "Login to your account",
      command: "diso login",
    },
    {
      title: "Deploy a new site",
      command: "diso deploy my-site",
    },
    {
      title: "List your sites",
      command: "diso list",
    },
    {
      title: "View site logs",
      command: "diso logs my-site",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
        <p className="text-slate-600">Configure your diso-wp account and integrations</p>
      </div>

      <Tabs defaultValue="domains" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="domains">Domains</TabsTrigger>
          <TabsTrigger value="cli">CLI</TabsTrigger>
          <TabsTrigger value="backups">Backups</TabsTrigger>
        </TabsList>

        <TabsContent value="domains" className="space-y-6">
          <Card className="border-slate-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-slate-900 flex items-center space-x-2">
                    <Globe className="w-5 h-5" />
                    <span>Domain Configuration</span>
                  </CardTitle>
                  <p className="text-sm text-slate-600 mt-1">
                    Connect your Cloudflare account to manage custom domains
                  </p>
                </div>
                {isConnected && (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Connected
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isConnected ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cloudflareToken" className="text-sm font-medium text-slate-700">
                      Cloudflare API Token
                    </Label>
                    <Input
                      id="cloudflareToken"
                      type="password"
                      placeholder="Enter your Cloudflare API token"
                      value={cloudflareToken}
                      onChange={(e) => setCloudflareToken(e.target.value)}
                      className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className="text-xs text-slate-500">
                      You can create an API token in your{" "}
                      <a
                        href="https://dash.cloudflare.com/profile/api-tokens"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Cloudflare dashboard
                        <ExternalLink className="w-3 h-3 inline ml-1" />
                      </a>
                    </p>
                  </div>
                  <Button
                    onClick={() => setIsConnected(true)}
                    disabled={!cloudflareToken}
                    className="bg-blue-700 hover:bg-blue-800 text-white"
                  >
                    Connect Cloudflare
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-900">Cloudflare Connected</span>
                    </div>
                    <p className="text-sm text-green-800">
                      You can now use custom domains for your WordPress sites. Add a custom domain when creating a new
                      site.
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => setIsConnected(false)} className="bg-white">
                    Disconnect
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cli" className="space-y-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900 flex items-center space-x-2">
                <Terminal className="w-5 h-5" />
                <span>CLI Usage</span>
              </CardTitle>
              <p className="text-sm text-slate-600 mt-1">
                Use the diso-wp CLI to manage your sites from the command line
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {cliCommands.map((cmd, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="text-sm font-medium text-slate-900">{cmd.title}</h4>
                  <div className="flex items-center space-x-2 p-3 bg-slate-900 rounded-lg">
                    <code className="flex-1 text-sm text-green-400 font-mono">$ {cmd.command}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(cmd.command)}
                      className="text-slate-400 hover:text-white h-6 w-6 p-0"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backups" className="space-y-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900 flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>Backup Settings</span>
              </CardTitle>
              <p className="text-sm text-slate-600 mt-1">Configure automated backups for your WordPress sites</p>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Database className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">Backups Coming Soon</h3>
                <p className="text-slate-600 mb-4">
                  Automated backup functionality will be available in a future update.
                </p>
                <Button disabled variant="outline" className="bg-white">
                  Configure Backups
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
