"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, Trash2, Save, ArrowLeft } from "lucide-react"

interface EnvVar {
  id: string
  key: string
  value: string
}

const initialEnvVars: EnvVar[] = [
  { id: "1", key: "WP_DEBUG", value: "false" },
  { id: "2", key: "WP_MEMORY_LIMIT", value: "256M" },
  { id: "3", key: "PHP_VERSION", value: "8.2" },
]

export default function EnvironmentEditor({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [envVars, setEnvVars] = useState<EnvVar[]>(initialEnvVars)
  const [showRestartDialog, setShowRestartDialog] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const addEnvVar = () => {
    const newVar: EnvVar = {
      id: Date.now().toString(),
      key: "",
      value: "",
    }
    setEnvVars([...envVars, newVar])
  }

  const updateEnvVar = (id: string, field: "key" | "value", newValue: string) => {
    setEnvVars(envVars.map((envVar) => (envVar.id === id ? { ...envVar, [field]: newValue } : envVar)))
  }

  const removeEnvVar = (id: string) => {
    setEnvVars(envVars.filter((envVar) => envVar.id !== id))
  }

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setShowRestartDialog(true)
    }, 1000)
  }

  const handleRestart = () => {
    setShowRestartDialog(false)
    router.push(`/site/${params.id}`)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4 -ml-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Site
        </Button>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Environment Variables</h1>
        <p className="text-slate-600">Configure environment variables for your WordPress site</p>
      </div>

      <Card className="border-slate-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-slate-900">Environment Configuration</CardTitle>
            <Button onClick={addEnvVar} variant="outline" size="sm" className="bg-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Variable
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {envVars.map((envVar) => (
              <div key={envVar.id} className="flex items-center space-x-4 p-4 border border-slate-200 rounded-lg">
                <div className="flex-1">
                  <Input
                    placeholder="Variable name (e.g., WP_DEBUG)"
                    value={envVar.key}
                    onChange={(e) => updateEnvVar(envVar.id, "key", e.target.value)}
                    className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Variable value"
                    value={envVar.value}
                    onChange={(e) => updateEnvVar(envVar.id, "value", e.target.value)}
                    className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEnvVar(envVar.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}

            {envVars.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                <p>No environment variables configured</p>
                <Button onClick={addEnvVar} variant="outline" className="mt-4 bg-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Variable
                </Button>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-slate-200">
            <Button variant="outline" onClick={() => router.back()} className="bg-white">
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving} className="bg-blue-700 hover:bg-blue-800 text-white">
              {isSaving ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showRestartDialog} onOpenChange={setShowRestartDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restart Required</DialogTitle>
            <DialogDescription>
              Environment variables have been updated. Your site needs to be restarted for changes to take effect.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRestartDialog(false)}>
              Later
            </Button>
            <Button onClick={handleRestart} className="bg-blue-700 hover:bg-blue-800 text-white">
              Restart Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
