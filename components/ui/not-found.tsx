"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Home, ArrowLeft } from "lucide-react"

interface NotFoundProps {
  title?: string
  description?: string
  showBackButton?: boolean
  backHref?: string
  backLabel?: string
}

export function NotFound({
  title = "Page Not Found",
  description = "The page you're looking for doesn't exist or has been moved.",
  showBackButton = true,
  backHref = "/",
  backLabel = "Go Home",
}: NotFoundProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6 max-w-md mx-auto px-4"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-8xl font-bold bg-gradient-to-r from-gradient-purple to-gradient-pink bg-clip-text text-transparent"
        >
          404
        </motion.div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-foreground/60">{description}</p>
        </div>

        {showBackButton && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <AnimatedButton
              asChild
              className="bg-gradient-to-r from-gradient-purple to-gradient-pink hover:opacity-90"
            >
              <Link href={backHref}>
                <Home className="mr-2 h-4 w-4" />
                {backLabel}
              </Link>
            </AnimatedButton>

            <AnimatedButton
              variant="outline"
              onClick={() => window.history.back()}
              className="border-gradient-purple text-gradient-purple hover:bg-pastel-purple bg-transparent"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </AnimatedButton>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
