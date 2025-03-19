"use client"

import { motion } from "framer-motion"
import { ArrowRight, Tag, FileText, MessageSquare, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  const features = [
    {
      icon: <Tag className="h-8 w-8" />,
      title: "SEO Tags Generator",
      description: "Generate optimized SEO tags based on your keywords",
      link: "/seo-tags",
      color: "from-blue-500/20 to-blue-500/5 dark:from-blue-500/10 dark:to-blue-500/5",
      textColor: "text-blue-500",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Product Description Generator",
      description: "Create compelling product descriptions for your e-commerce store",
      link: "/product-description",
      color: "from-green-500/20 to-green-500/5 dark:from-green-500/10 dark:to-green-500/5",
      textColor: "text-green-500",
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Marketing Content Generator",
      description: "Generate engaging marketing content for your target audience",
      link: "/marketing-content",
      color: "from-purple-500/20 to-purple-500/5 dark:from-purple-500/10 dark:to-purple-500/5",
      textColor: "text-purple-500",
    },
  ]

  return (
      <div className="flex flex-col items-center justify-center space-y-16 py-12">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6 max-w-3xl"
        >
          <div className="inline-block mb-4">
            <motion.div
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Sparkles className="h-3.5 w-3.5 mr-2" />
              Powered by AI
            </motion.div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="animated-gradient-text">AI-Powered</span> Content Generation
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create professional SEO tags, product descriptions, and marketing content in seconds with the power of
            artificial intelligence.
          </p>

          <div className="pt-4">
            <Link href="/seo-tags">
              <Button size="lg" className="rounded-full px-8">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {features.map((feature, index) => (
              <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                <Link href={feature.link} className="block h-full">
                  <motion.div
                      className={`h-full rounded-2xl p-1 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                  >
                    <div
                        className={`h-full rounded-xl bg-gradient-to-br ${feature.color} p-6 border border-border/40 backdrop-blur-sm`}
                    >
                      <div className={`p-3 rounded-lg w-fit ${feature.textColor} bg-white/10 backdrop-blur-sm mb-4`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground mb-4">{feature.description}</p>
                      <div className="flex justify-end">
                        <ArrowRight className={`h-5 w-5 ${feature.textColor}`} />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
          ))}
        </div>
      </div>
  )
}

