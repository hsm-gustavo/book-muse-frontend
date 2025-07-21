import { AnimatedButton } from "@/components/ui/animated-button"
import { ArrowLeft, BookOpen } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Book not found</h3>
            <p className="text-muted-foreground mb-4">
              The book you&apos;re looking for doesn&apos;t exist or
              couldn&apos;t be loaded.
            </p>
            <Link href="/search">
              <AnimatedButton>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Search
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
