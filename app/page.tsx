"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { AnimatedButton } from "@/components/ui/animated-button"
import { PageTransition } from "@/components/ui/page-transition"
import { FloatingElements } from "@/components/ui/floating-elements"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BookOpen, Users, Star, TrendingUp } from "lucide-react"

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
              <AnimatedButton
                asChild
                variant="outline"
                size="lg"
                className="border-gradient-blue text-gradient-blue hover:bg-pastel-blue bg-transparent"
              >
                <Link href="/books">Browse Books</Link>
              </AnimatedButton>
            </motion.div>
          </div>

          <motion.div
            className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card className="border-accent-blue/20 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <BookOpen className="h-12 w-12 mx-auto text-gradient-purple mb-2" />
                <CardTitle className="text-lg">Track Reading</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Keep track of books you&apos;re reading, want to read, or have
                  finished.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-accent-purple/20 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Star className="h-12 w-12 mx-auto text-gradient-pink mb-2" />
                <CardTitle className="text-lg">Write Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Share your thoughts and rate books to help other readers
                  discover great content.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-accent-green/20 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 mx-auto text-gradient-purple mb-2" />
                <CardTitle className="text-lg">Follow Friends</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Connect with fellow book lovers and see what they&apos;re
                  reading and reviewing.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-accent-yellow/20 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <TrendingUp className="h-12 w-12 mx-auto text-gradient-pink mb-2" />
                <CardTitle className="text-lg">Discover Books</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Explore millions of books from the Open Library and find your
                  next favorite read.
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
