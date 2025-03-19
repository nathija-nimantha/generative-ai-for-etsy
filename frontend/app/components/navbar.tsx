"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./mode-toggle"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

const navItems = [
  { name: "Home", path: "/" },
  { name: "SEO Tags", path: "/seo-tags" },
  { name: "Product Description", path: "/product-description" },
  { name: "Marketing Content", path: "/marketing-content" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
      <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/70 border-b border-border/40">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center"
            >
              <Sparkles className="h-5 w-5 text-primary mr-2" />
              <span className="text-xl font-bold">Generative AI for E-Commerce website</span>
            </motion.div>
          </Link>
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
                <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                        "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 hover:text-primary",
                        pathname === item.path ? "text-primary bg-primary/10" : "text-muted-foreground",
                    )}
                >
                  {item.name}
                  {pathname === item.path && (
                      <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-primary/10"
                          transition={{ type: "spring", duration: 0.5 }}
                      />
                  )}
                </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <ModeToggle />
          </div>
        </div>
      </header>
  )
}

