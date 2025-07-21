import { AnimatedButton } from "@/components/ui/animated-button"
import { ArrowLeft, BookOpen } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen gradient-pastel">
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Page not found</h3>
            <p className="text-muted-foreground mb-4">
              The page you&apos;re looking for doesn&apos;t exist or was moved.
            </p>
            <Link href="/">
              <AnimatedButton>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
