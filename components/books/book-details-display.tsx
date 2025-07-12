"use client"

import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { type BookDetails, getCoverImageUrl } from "@/types/books"
import { useAuth } from "@/lib/auth"
import { Star } from "lucide-react"
import { motion } from "motion/react"
import { AnimatedButton } from "@/components/ui/animated-button"

interface BookDetailsDisplayProps {
  book: BookDetails
}

export function BookDetailsDisplay({ book }: BookDetailsDisplayProps) {
  const { user } = useAuth()

  const coverSrc = book.coverUrl || getCoverImageUrl(book.covers?.[0], "L")

  const descriptionText =
    typeof book.description === "string"
      ? book.description
      : book.description?.value || "No description available."

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="grid md:grid-cols-3 gap-8"
    >
      <Card className="md:col-span-1 border-accent-purple/20">
        <CardContent className="p-6 flex flex-col items-center">
          <div className="relative w-full max-w-[200px] h-[300px] mb-6 flex-shrink-0">
            <Image
              src={coverSrc || "/placeholder.svg"}
              alt={`Cover of ${book.title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "contain" }}
              className="rounded-md shadow-lg"
              priority
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center mb-2">
            {book.title}
          </CardTitle>
          {book.subtitle && (
            <CardDescription className="text-foreground/70 text-center mb-4">
              {book.subtitle}
            </CardDescription>
          )}
          {book.authors &&
            book.authors.length > 0 && ( // authors is now string[]
              <p className="text-md text-foreground/80 font-medium text-center">
                by {book.authors.join(", ")}
              </p>
            )}
          {user && (
            <AnimatedButton className="mt-6 w-full bg-gradient-to-r from-gradient-purple to-gradient-pink hover:opacity-90">
              <Star className="mr-2 h-4 w-4" />
              Write a review
            </AnimatedButton>
          )}
        </CardContent>
      </Card>

      <Card className="md:col-span-2 border-accent-pink/20">
        <CardHeader>
          <CardTitle className="text-xl">Book Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-foreground/80">Description:</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              {descriptionText}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-foreground/80">Publisher:</h3>
              <p className="text-foreground/70">
                {book.publishers?.join(", ") || "N/A"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground/80">
                Publish Date:
              </h3>
              <p className="text-foreground/70">{book.publishDate || "N/A"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground/80">Pages:</h3>
              <p className="text-foreground/70">
                {book.numberOfPages || "N/A"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground/80">ISBN-13:</h3>
              <p className="text-foreground/70">{book.isbn13?.[0] || "N/A"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground/80">ISBN-10:</h3>
              <p className="text-foreground/70">{book.isbn10?.[0] || "N/A"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
