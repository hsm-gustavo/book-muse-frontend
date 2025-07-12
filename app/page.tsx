"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { AnimatedButton } from "@/components/ui/animated-button"
import { PageTransition } from "@/components/ui/page-transition"
import { FloatingElements } from "@/components/ui/floating-elements"

export default function HomePage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-pastel-blue via-pastel-purple to-pastel-pink">
        <FloatingElements />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-8">
            <motion.h1
              className="text-6xl font-bold bg-gradient-to-r from-gradient-purple to-gradient-pink bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Welcome to BookMuse
            </motion.h1>

            <motion.p
              className="text-xl text-foreground/80 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover, track, and share your reading journey. Join thousands of
              book lovers who use BookMuse to organize their literary
              adventures.
            </motion.p>

            <motion.div
              className="flex gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <AnimatedButton
                asChild
                size="lg"
                className="bg-gradient-to-r from-gradient-purple to-gradient-pink hover:opacity-90"
              >
                <Link href="/signup">Get Started</Link>
              </AnimatedButton>
              <AnimatedButton
                asChild
                variant="outline"
                size="lg"
                className="border-gradient-purple text-gradient-purple hover:bg-pastel-purple bg-transparent"
              >
                <Link href="/login">Sign In</Link>
              </AnimatedButton>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
