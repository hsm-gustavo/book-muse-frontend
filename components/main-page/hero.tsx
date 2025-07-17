"use client"

import { motion } from "motion/react"
import { Badge } from "../ui/badge"
import { BookOpen, Sparkles } from "lucide-react"
import { AnimatedButton } from "../ui/animated-button"

export default function Hero() {
  return (
    <section className="relative pt-16 gradient-pastel overflow-hidden min-h-screen">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-pastel-pink rounded-full opacity-60"
          animate={{
            y: [0, -20, 0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>
        <motion.div
          className="absolute top-40 right-20 w-48 h-48 bg-pastel-blue rounded-full opacity-60"
          animate={{
            y: [0, -20, 0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>
        <motion.div
          className="absolute bottom-20 left-1/4 w-32 h-32 bg-pastel-yellow rounded-full opacity-60"
          animate={{
            y: [0, -20, 0, 20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>
      </div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-white/80 text-purple-600 border-purple-200">
            <Sparkles className="h-4 w-4 mr-2" />
            Discover Your Next Great Read
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-8 animate-fade-in-up">
            Your Personal
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Book Universe
            </span>
          </h1>

          <p
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Discover, review, and share your favorite books with a community of
            passionate readers. Track your reading journey like never before.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <AnimatedButton
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Start Reading
            </AnimatedButton>
            <AnimatedButton
              size="lg"
              variant="outline"
              className="bg-white/80 backdrop-blur-sm border-purple-200 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg"
            >
              Browse Reviews
            </AnimatedButton>
          </div>
        </div>
      </div>
    </section>
  )
}
