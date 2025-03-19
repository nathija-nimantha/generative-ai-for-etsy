"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Loader2, Copy, Check, Sparkles } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface MarketingContentResponse {
  marketing_content: string
}

export default function MarketingContentPage() {
  const [audience, setAudience] = useState("")
  const [platform, setPlatform] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<MarketingContentResponse | null>(null)
  const [copied, setCopied] = useState(false)

  const generateContent = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!audience || !platform) {
      toast({
        title: "Missing information",
        description: "Please provide both target audience and platform.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("http://127.0.0.1:8000/generate_marketing_content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ audience, platform }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate marketing content")
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate marketing content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (!result || !result.marketing_content) return

    navigator.clipboard.writeText(result.marketing_content)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "Marketing content has been copied to your clipboard.",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  return (
      <div className="max-w-4xl mx-auto">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 text-center mb-10"
        >
          <div className="inline-block mb-2">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
              <MessageSquare className="h-3.5 w-3.5 mr-2" />
              Marketing Copy
            </div>
          </div>
          <h1 className="text-4xl font-bold">Marketing Content Generator</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create engaging marketing content tailored to your target audience and optimized for different platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
          >
            <div className="rounded-2xl border border-border/40 backdrop-blur-sm overflow-hidden">
              <form onSubmit={generateContent}>
                <div className="p-6 bg-card/30">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="bg-primary/10 p-2 rounded-lg mr-3">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </span>
                    Campaign Information
                  </h2>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="audience" className="text-sm font-medium">
                        Target Audience
                      </Label>
                      <Input
                          id="audience"
                          placeholder="e.g., Tech Enthusiasts"
                          value={audience}
                          onChange={(e) => setAudience(e.target.value)}
                          required
                          className="rounded-lg border-border/40 bg-background/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="platform" className="text-sm font-medium">
                        Platform
                      </Label>
                      <Select value={platform} onValueChange={setPlatform} required>
                        <SelectTrigger id="platform" className="rounded-lg border-border/40 bg-background/50">
                          <SelectValue placeholder="Select a platform" />
                        </SelectTrigger>
                        <SelectContent className="rounded-lg border-border/40 bg-background/90 backdrop-blur-lg">
                          <SelectItem value="Instagram">Instagram</SelectItem>
                          <SelectItem value="Facebook">Facebook</SelectItem>
                          <SelectItem value="Twitter">Twitter</SelectItem>
                          <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                          <SelectItem value="TikTok">TikTok</SelectItem>
                          <SelectItem value="Email">Email</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-muted/30 border-t border-border/40">
                  <Button type="submit" disabled={isLoading || !audience || !platform} className="w-full rounded-lg">
                    {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                    ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate Content
                        </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>

          <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
          >
            {result && result.marketing_content ? (
                <div className="rounded-2xl border border-border/40 backdrop-blur-sm overflow-hidden h-full">
                  <div className="p-6 bg-card/30 h-full">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold flex items-center">
                    <span className="bg-primary/10 p-2 rounded-lg mr-3">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </span>
                        Generated Content
                      </h2>
                      <Button variant="ghost" size="icon" onClick={copyToClipboard} className="rounded-full">
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>

                    <div className="p-4 rounded-lg bg-background/50 border border-border/40 overflow-auto max-h-[500px]">
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">{result.marketing_content}</div>
                    </div>
                  </div>
                </div>
            ) : (
                <div className="rounded-2xl border border-border/40 backdrop-blur-sm overflow-hidden h-full flex items-center justify-center p-8">
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
                      <MessageSquare className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                    <h3 className="text-lg font-medium text-muted-foreground">No content generated yet</h3>
                    <p className="text-sm text-muted-foreground/70">
                      Select your target audience and platform, then click "Generate Content" to see results here
                    </p>
                  </div>
                </div>
            )}
          </motion.div>
        </div>
      </div>
  )
}

