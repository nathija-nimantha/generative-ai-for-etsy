"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tag, Loader2, Copy, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

interface SeoTagsResponse {
  tags: string
}

export default function SeoTagsPage() {
  const [keywords, setKeywords] = useState<string[]>([])
  const [currentKeyword, setCurrentKeyword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<SeoTagsResponse | null>(null)
  const [copied, setCopied] = useState(false)

  const addKeyword = () => {
    if (currentKeyword.trim() && !keywords.includes(currentKeyword.trim())) {
      setKeywords([...keywords, currentKeyword.trim()])
      setCurrentKeyword("")
    }
  }

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addKeyword()
    }
  }

  const generateTags = async () => {
    if (keywords.length === 0) {
      toast({
        title: "No keywords added",
        description: "Please add at least one keyword to generate SEO tags.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("http://127.0.0.1:8000/generate_tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keywords }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate SEO tags")
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate SEO tags. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (!result) return

    navigator.clipboard.writeText(result.tags)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "SEO tags have been copied to your clipboard.",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  // Parse the tags string into an array of individual tags
  const parseTags = (tagsString: string) => {
    if (!tagsString) return []
    // Split by numbered list format (e.g., "1. ", "2. ")
    return tagsString
      .split(/\d+\.\s+/)
      .filter((tag) => tag.trim().length > 0)
      .map((tag) => tag.trim().replace(/^"|"$/g, "")) // Remove quotes if present
  }

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2 text-center mb-8"
      >
        <h1 className="text-3xl font-bold">SEO Tags Generator</h1>
        <p className="text-muted-foreground">Generate optimized SEO tags based on your keywords</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Enter Keywords</CardTitle>
            <CardDescription>Add keywords related to your content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <div className="flex-1">
                <Label htmlFor="keyword" className="sr-only">
                  Keyword
                </Label>
                <Input
                  id="keyword"
                  placeholder="Enter a keyword (e.g., wireless headphones)"
                  value={currentKeyword}
                  onChange={(e) => setCurrentKeyword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <Button onClick={addKeyword} type="button">
                Add
              </Button>
            </div>

            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {keyword}
                    <button
                      className="ml-2 text-muted-foreground hover:text-foreground"
                      onClick={() => removeKeyword(keyword)}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={generateTags} disabled={isLoading || keywords.length === 0} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Tag className="mr-2 h-4 w-4" />
                  Generate SEO Tags
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {result && result.tags && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Generated SEO Tags</span>
                <Button variant="outline" size="icon" onClick={copyToClipboard}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label className="text-sm font-medium">Suggested Tags</Label>
                <div className="p-4 rounded-md bg-muted whitespace-pre-wrap">
                  {parseTags(result.tags).map((tag, index) => (
                    <div key={index} className="mb-2">
                      <Badge variant="outline" className="mr-2">
                        {index + 1}
                      </Badge>
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

