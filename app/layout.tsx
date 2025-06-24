import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "diso-wp - WordPress Hosting Made Simple",
  description: "Launch and manage WordPress websites with minimal effort",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-slate-50">
          <Navigation />
          <main className="pt-16">{children}</main>
        </div>
      </body>
    </html>
  )
}
