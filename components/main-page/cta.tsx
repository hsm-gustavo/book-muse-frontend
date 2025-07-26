"use client"

import { ArrowRight, BookOpen, Sparkles } from "lucide-react"
import { motion } from "motion/react"
import { AnimatedButton } from "../ui/animated-button"

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full"
          animate={{
            y: [0, -20, 0, 20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full"
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
          className="absolute bottom-20 left-1/3 w-16 h-16 bg-white/10 rounded-full"
          animate={{
            y: [0, -20, 0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>
      </div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-white/20 rounded-full">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your
            <span className="block">Reading Journey?</span>
          </h2>

          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Join thousands of readers who have discovered their next favorite
            book through our community. Start your literary adventure today,
            completely free.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton
              size="lg"
              className="px-8 py-3 text-lg font-semibold w-full cursor-pointer"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Start Reading Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </AnimatedButton>
            <AnimatedButton
              size="lg"
              variant="outline"
              className="px-8 py-3 text-lg font-semibold w-full bg-transparent hover:text-white text-white hover:bg-transparent cursor-pointer"
            >
              Browse Books
            </AnimatedButton>
          </div>

          <p className="text-white/80 text-sm mt-6">
            No credit card required • Join 25,000+ readers • Free forever
          </p>
        </div>
      </div>
    </section>
  )
}
