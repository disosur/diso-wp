"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Circle, ExternalLink } from "lucide-react"

const deploySteps = [
  { id: 1, name: "Initializing deployment", duration: 2000 },
  { id: 2, name: "Setting up WordPress environment", duration: 3000 },
  { id: 3, name: "Configuring database", duration: 2500 },
  { id: 4, name: "Installing WordPress core", duration: 4000 },
  { id: 5, name: "Configuring SSL certificate", duration: 2000 },
  { id: 6, name: "Final optimizations", duration: 1500 },
]

export default function DeployProgress() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const siteName = searchParams.get("site") || "your-site"

  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    if (currentStep < deploySteps.length) {
      const step = deploySteps[currentStep]
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, `✓ ${step.name}`])
        setCurrentStep((prev) => prev + 1)
      }, step.duration)

      return () => clearTimeout(timer)
    } else if (currentStep === deploySteps.length && !isComplete) {
      setTimeout(() => {
        setIsComplete(true)
        setLogs((prev) => [...prev, "🎉 Deployment completed successfully!"])
      }, 1000)
    }
  }, [currentStep, isComplete])

  const siteUrl = `https://${siteName}.diso-wp.com`
  const adminUrl = `${siteUrl}/wp-admin`

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Deploying {siteName}</h1>
        <p className="text-slate-600">
          {isComplete ? "Your WordPress site is ready!" : "Setting up your WordPress environment..."}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Progress Steps */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">Deployment Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deploySteps.map((step, index) => (
                <div key={step.id} className="flex items-center space-x-3">
                  {index < currentStep ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : index === currentStep ? (
                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300" />
                  )}
                  <span
                    className={`text-sm ${
                      index < currentStep
                        ? "text-green-700"
                        : index === currentStep
                          ? "text-blue-700 font-medium"
                          : "text-slate-500"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
              ))}
            </div>

            {isComplete && (
              <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-green-900 mb-2">Site Successfully Deployed!</h3>
                    <div className="space-y-2 text-sm text-green-800">
                      <div className="flex items-center space-x-2">
                        <span>Site URL:</span>
                        <a
                          href={siteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono underline hover:no-underline flex items-center space-x-1"
                        >
                          <span>{siteUrl}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>Admin URL:</span>
                        <a
                          href={adminUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono underline hover:no-underline flex items-center space-x-1"
                        >
                          <span>{adminUrl}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="mt-3 p-2 bg-white rounded border">
                        <p className="text-xs font-medium mb-1">Default Login:</p>
                        <p className="text-xs font-mono">Username: admin</p>
                        <p className="text-xs font-mono">Password: wp_admin_2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Live Logs */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">Deployment Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900 rounded-lg p-4 h-80 overflow-y-auto">
              <div className="font-mono text-sm space-y-1">
                {logs.map((log, index) => (
                  <div key={index} className="text-green-400">
                    {log}
                  </div>
                ))}
                {!isComplete && (
                  <div className="text-blue-400 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    <span>Processing...</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {isComplete && (
        <div className="mt-8 text-center">
          <Button onClick={() => router.push(`/site/1`)} size="lg" className="bg-blue-700 hover:bg-blue-800 text-white">
            Go to Site Dashboard
          </Button>
        </div>
      )}
    </div>
  )
}
