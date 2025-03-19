import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "./components/navbar"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Content Generator",
  description: "Generate SEO tags, product descriptions, and marketing content with AI",
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen relative")}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <div className="min-h-screen relative overflow-hidden">
          {/* Background blobs */}
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>

          <Navbar />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </div>
      </ThemeProvider>
      </body>
      </html>
  )
}

