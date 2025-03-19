"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Loader2, Copy, Check } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Sparkles } from "lucide-react";

interface ProductDescriptionResponse {
  description: string
}

export default function ProductDescriptionPage() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    details: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ProductDescriptionResponse | null>(null)
  const [copied, setCopied] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const generateDescription = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.category) {
      toast({
        title: "Missing information",
        description: "Please provide at least a product name and category.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("http://127.0.0.1:8000/generate_description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to generate product description")
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate product description. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (!result || !result.description) return

    navigator.clipboard.writeText(result.description)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "Product description has been copied to your clipboard.",
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
            <FileText className="h-3.5 w-3.5 mr-2" />
            Product Content
          </div>
        </div>
        <h1 className="text-4xl font-bold">Product Description Generator</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Create compelling product descriptions that convert browsers into buyers and highlight your product's unique
          features.
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
            <form onSubmit={generateDescription}>
              <div className="p-6 bg-card/30">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="bg-primary/10 p-2 rounded-lg mr-3">
                  <FileText className="h-5 w-5 text-primary" />
                </span>
                  Product Information
                </h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Product Name
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="e.g., Wireless Noise Cancelling Headphones"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="rounded-lg border-border/40 bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium">
                      Product Category
                    </Label>
                    <Input
                        id="category"
                        name="category"
                        placeholder="e.g., Audio Equipment"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="rounded-lg border-border/40 bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="details" className="text-sm font-medium">
                      Product Details (Optional)
                    </Label>
                    <Textarea
                        id="details"
                        name="details"
                        placeholder="e.g., Features Bluetooth 5.0, 40-hour battery life, and active noise cancellation"
                        value={formData.details}
                        onChange={handleChange}
                        rows={4}
                        className="rounded-lg border-border/40 bg-background/50 resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-muted/30 border-t border-border/40">
                <Button
                    type="submit"
                    disabled={isLoading || !formData.name || !formData.category}
                    className="w-full rounded-lg"
                >
                  {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                  ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Description
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
          {result && result.description ? (
              <div className="rounded-2xl border border-border/40 backdrop-blur-sm overflow-hidden h-full">
                <div className="p-6 bg-card/30 h-full">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold flex items-center">
                  <span className="bg-primary/10 p-2 rounded-lg mr-3">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </span>
                      Generated Description
                    </h2>
                    <Button variant="ghost" size="icon" onClick={copyToClipboard} className="rounded-full">
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg bg-background/50 border border-border/40 overflow-auto max-h-[500px]">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{result.description}</div>
                  </div>
                </div>
              </div>
          ) : (
              <div className="rounded-2xl border border-border/40 backdrop-blur-sm overflow-hidden h-full flex items-center justify-center p-8">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-lg font-medium text-muted-foreground">No description generated yet</h3>
                  <p className="text-sm text-muted-foreground/70">
                    Fill out the product information and click "Generate Description" to see results here
                  </p>
                </div>
              </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

